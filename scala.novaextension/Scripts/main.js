var metalsLanguageClient = null;

function metalsExecuteCommand(command, args, onSuccess) {
  if (!metalsLanguageClient) return;

  metalsLanguageClient
    .sendRequest(
      "workspace/executeCommand",
      {
        command: command,
        arguments: args
      }
    )
    .then(
      response => {
        if (onSuccess) {
          onSuccess(response);
        }
      },
      error => {
        console.log(`Failed to execute Metals command: ${error}`);
      }
    );
}

const importBuild = () => metalsExecuteCommand("build-import");
const runDoctor = () => metalsExecuteCommand("doctor-run");

function notify(key, title, message) {
  let notification = new NotificationRequest(key);
  notification.title = nova.localize(title);
  notification.body = nova.localize(message);
  nova.notifications.add(notification);
}

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
    debug: false,
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

  metalsLanguageClient.onNotification(
    "metals/executeClientCommand",
    request => {
      if (request.command === "metals-doctor-run") {
        runDoctor();
      }
    }
  );
}

function deactivateMetals() {
  if (!metalsLanguageClient) {
    return;
  }

  metalsLanguageClient.stop();
  nova.subscriptions.remove(metalsLanguageClient);

  metalsLanguageClient = null;
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

  process.start();
}

function runSetupSteps() {
    startMetals();
    setupDoctor();
}

function installMetalsIfNotExists(afterInstalled) {
  const metalsExists = nova.fs.access(`${nova.extension.path}/metals`, nova.fs.F_OK);  

  if (!metalsExists) {
    installMetals(
      "latest.release",
      afterInstalled,
      () => notify("metals-install-failed", "Metals: Install failed", "Coursier must be installed and on the system path.")
    );
  } else {
    afterInstalled();
  }
}

function updateMetals() {
  deactivateMetals();

  installMetals(
    "latest.release",
    () => {
      notify(
        "metals-updated",
        "Metals updated successfully",
      );
      runSetupSteps();
    },
    () => {
      notify(
        "metals-update-failed",
        "Metals update failed",
        "Failed to update metals. Ensure that Coursier is installed and on the system path."
      );
    }
  );
}

function registerCommands() {
  nova.commands.register(
    "metals.importBuild",
    _ => importBuild()
  );

  nova.commands.register(
    "metals.update",
    _ => updateMetals()
  );

  nova.commands.register(
    "metals.doctor",
    _ => runDoctor()
  );

  function registerMetalsCommand(
    novaCommand,
    metalsCommand,
    args,
    onSuccess
  ) {
    nova.commands.register(
      novaCommand,
      _ => metalsExecuteCommand(metalsCommand, args, onSuccess)
    );
  }

  registerMetalsCommand("metals.switchBuildServer", "bsp-switch");
  registerMetalsCommand("metals.connectToBuildServer", "build-connect");
  registerMetalsCommand("metals.cancelCompilation", "compile-cancel");
  registerMetalsCommand("metals.cascadeCompile", "compile-cascade");
  registerMetalsCommand("metals.cleanCompile", "compile-clean");
  registerMetalsCommand("metals.resetNotifications", "reset-notifications");
  registerMetalsCommand("metals.restartBuildServer", "build-restart");
  registerMetalsCommand("metals.disconnectFromOldBuildServer", "build-disconnect");
  registerMetalsCommand("metals.resetWorkspace", "reset-workspace");
  registerMetalsCommand(
    "metals.listBuildTargets",
    "list-build-targets",
    null,
    response =>
      notify(
        "build-targets",
        "Metals build targets",
        response.join("\n")
      )
  );
}

exports.activate = function () {
  registerCommands();

  installMetalsIfNotExists(runSetupSteps);
};

exports.deactivate = function () {
  deactivateMetals();
};
