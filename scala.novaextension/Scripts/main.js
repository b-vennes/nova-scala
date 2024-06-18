var metalsLanguageClient = null;

function metalsExecuteCommand(command, args) {
  if (!metalsLanguageClient) return;

  metalsLanguageClient.sendRequest(
    "workspace/executeCommand",
    {
      command: command,
      arguments: args
    }
  );
}

const importBuild = () => metalsExecuteCommand("build-import", null);
const runDoctor = () => metalsExecuteCommand("doctor-run", null);

function startMetals() {
  if (metalsLanguageClient) {
    deactivateMetals();
    nova.subscriptions.remove(metalsLanguageClient);
  }

  const localPath = `${nova.extension.path}/metals`;

  // Create the client
  const serverOptions = {
    path: localPath,
  };
  const clientOptions = {
    // The set of document syntaxes for which the server is valid
    syntaxes: ["scala"],
    debug: true,
    initializationOptions: {
      isHttpEnabled: true,
      doctorVisibilityProvider: true,
      doctorProvider: "json"
    }
  };
  metalsLanguageClient = new LanguageClient(
    "scala",
    "Scala Language Server",
    serverOptions,
    clientOptions,
  );

  try {
    metalsLanguageClient.start();
    nova.subscriptions.add(metalsLanguageClient);
  } catch (err) {
    if (nova.inDevMode()) {
      console.error(err);
    }
  }
}

function setupDoctor() {
  if (!metalsLanguageClient) return;

  console.log("Adding on request hook.");
  metalsLanguageClient.onNotification(
    "metals/executeClientCommand",
    request => {
      console.log(`Received execute client command: ${JSON.stringify(request)}`);

      const command = request.command;
      console.log(`Command is '${command}'.`)
      if (command && command === "metals-doctor-run") {
        console.log("Received run doctor request.");
        runDoctor();
      }
    }
  );
}

function deactivateMetals() {
  if (!metalsLanguageClient) {
    console.log("No Metals language client started.")
    return;
  }

  metalsLanguageClient.stop();
  nova.subscriptions.remove(metalsLanguageClient);

  metalsLanguageClient = null;
}

function setupImportBuildCommand() {
  nova.commands.register(
    "importBuild",
    _ => importBuild()
  );
}

function installMetals(version, onSuccess, onFailure) {
  const args = [
    "coursier",
    "bootstrap",
    "--java-opt",
    "-XX:+UseG1GC",
    "--java-opt",
    "-XX:+UseStringDeduplication",
    "--java-opt",
    "-Xss4m",
    "--java-opt",
    "-Xms100m",
    `org.scalameta:metals_2.13:${version}`,
    "-o",
    "metals",
    "-f"
  ];

  const process = new Process("/usr/bin/env", {
    args,
    cwd: nova.extension.path
  });

  process.onStdout(line => {
    console.log("Coursier: " + line);
  });

  process.onStderr(line => {
    console.log("Coursier ERR: " + line);
  });

  process.onDidExit(result => {
    if (result === 0) onSuccess();
    else onFailure();
  });

  console.log(`Installing metals at ${nova.extension.path}/metals`);

  process.start();
}

function runSetupSteps() {
    startMetals();
    setupDoctor();
}

function registerCommands() {
  setupImportBuildCommand(); 
  setupUpdateMetalsCommand();
  setupDoctorCommand();
}

function installMetalsIfNotExists(afterInstalled) {
  const metalsExists = nova.fs.access(`${nova.extension.path}/metals`, nova.fs.F_OK);  

  if (!metalsExists) {
    console.log("Installing metals.");
    installMetals(
      "latest.release",
      afterInstalled,
      () => {
        nova.notifications.add(new NotificationRequest(
          "Failed to install metals. Maybe restart the plugin?"
        ));
      }
    );
  } else {
    console.log("Metals is already installed.");
    afterInstalled();
  }
}

function updateMetals() {
  deactivateMetals();

  installMetals(
    "latest.release",
    () => {
      let notification = new NotificationRequest("metals-updated");
      notification.body = nova.localize("Metals updated.");
      nova.notifications.add(notification);
      runSetupSteps();
    },
    () => {
      let notification = new NotificationRequest("metals-update-failed");
      notification.body = nova.localize("Failed to update metals. Maybe try again or restart the plugin?");
      nova.notifications.add(notification);
    }
  );
}

function setupUpdateMetalsCommand() {
  nova.commands.register(
    "updateMetals",
    _ => updateMetals()
  );
}

function setupDoctorCommand() {
  nova.commands.register(
    "openDoctor",
    _ => runDoctor()
  );
}

exports.activate = function () {
  registerCommands();

  installMetalsIfNotExists(runSetupSteps);
};

exports.deactivate = function () {
  deactivateMetals();
};
