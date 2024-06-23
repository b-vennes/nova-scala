**Scala** provides syntax highlighting and autocompletion for the Scala language using the [Metals language server](https://scalameta.org/metals/).

## Language Support

Supported Features:

- Syntax highlighting
- Go-to definition
- Hover documentation
- Metals commands:
  - import build
  - connect to build server
  - switch build server
  - restart build server
  - disconnect from build server
  - cascade compile
  - clean compile
  - cancel compilation
  - reset workspace
  - list build targets

Command palette reference:

- Metals: Import build
  - Import the latest changes from the build.  For example, picks up latest library dependencies. 
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor#import-build)
- Metals: Update
  - Updates the Metals tool to the latest version.
- Metals: Doctor
  - Opens the Metals doctor diagnostics page in the default web browser.
- Metals: Switch build server
  - Provides a prompt to switch the underlying build server.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#switch-build-server)
- Metals: Connect to build server
  - Creates a new connection to the build server.  Useful when documentation of go-to feels unresponsive. 
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#connect-to-build-server)
- Metals: Cancel compilation
  - Cancel any ongoing compilations.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#cancel-compilation)
- Metals: Cascade compile
  - Compiles the open files and any files dependent on open files.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#cascade-compile)
- Metals: Clean compile
  - Recompiles all build targets in the workspace.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#clean-compile)
- Metals: Reset notifications
  - Resets any dismissed notifications so that choices can be made again.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#reset-notifications)
- Metals: Restart build server
  - Stops and restart the current running build server.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#restart-build-server)
- Metals: Disconnect from old build server
  - Cancels the existing build server connection.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#disconnect-from-old-build-server)
- Metals: Reset workspace
  - Cleans the Metals cache and restarts the build server.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#clean-and-restart-build-server)
- Metals: List build targets
  - Lists Metals build targets in the workspace.
  - [Reference](https://scalameta.org/metals/docs/integrations/new-editor/#list-build-targets)
