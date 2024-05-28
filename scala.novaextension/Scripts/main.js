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

  console.log("adding on request hook");
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

function subscribeToConfig() {
  nova.config.observe("scala.metals-path", function (path) {
    this.start(path);
  });
}

function setupImportBuildCommand() {
  nova.commands.register(
    "importBuild",
    (input) =>
      importBuild()
  );
}

exports.activate = function () {
  startMetals();
  setupDoctor();
  setupImportBuildCommand();
};

exports.deactivate = function () {
  deactivateMetals();
};
