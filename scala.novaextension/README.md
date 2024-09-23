**Scala** provides syntax highlighting and autocompletion for the Scala language
using the [Metals language server](https://scalameta.org/metals/).

This extension requires Coursier to be installed and on the system path:
https://get-coursier.io/

## Language Support

Supported Features:

- Syntax highlighting
- Go-to definition
- Hover documentation
- JDK selection
- Metals commands: "import build", "connect to build server", "switch build
  server", "restart build server", "disconnect from build server", "cascade
  compile", "clean compile", "cancel compilation", "reset workspace", and "list
  build targets"

## Configuration

### Java Home

By default, the `JAVA_HOME` configured on the system path is used to install and
run Metals for all projects.

When the `Java Home` setting is set to a local JDK
folder, that path will be used in place of `JAVA_HOME` and Metals will be
re-installed and restarted with it instead.

## Command Palette Reference

### Metals: Import build

Imports the latest changes from the build. For example, this command pulls in
the latest library dependencies. Run this command if the project feels
unresponsive or if the build has been re-configured.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor#import-build)

### Metals: Update

Updates the Metals tool installed with this extension to the latest version.

### Metals: Restart

Stops and restarts the Metals application.

### Metals: Doctor

Opens the Metals doctor diagnostics page in the default web browser.

### Metals: Switch build server

Provides a prompt to switch the underlying build server.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#switch-build-server)

### Metals: Connect to build server

Creates a new connection to the build server. Useful when documentation of go-to
feels unresponsive.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#connect-to-build-server)

### Metals: Cancel compilation

Cancels any ongoing compilations.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#cancel-compilation)

### Metals: Cascade compile

Compiles the open files and any files dependent on open files.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#cascade-compile)

### Metals: Clean compile

Recompiles all build targets in the workspace.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#clean-compile)

### Metals: Reset notifications

Resets any dismissed notifications so that choices can be made again.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#reset-notifications)

### Metals: Restart build server

Stops and restart the current running build server.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#restart-build-server)

### Metals: Disconnect from old build server

Cancels the existing build server connection.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#disconnect-from-old-build-server)

### Metals: Reset workspace

Cleans the Metals cache and restarts the build server. If a project is not
responding to hover or go-to and the "Metals: Import Build" command didn't help,
this command can fully reset Metals for this project.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#clean-and-restart-build-server)

### Metals: List build targets

Lists Metals build targets in the workspace using a notification.

[Reference](https://scalameta.org/metals/docs/integrations/new-editor/#list-build-targets)
