# Theia - progress-test-plugin
Progress-test-plugin example for Theia.

The plugin allows to test plugin API changes related to [withProgress](https://github.com/eclipse-theia/theia/blob/bdc9aa276cb55e5cf3dc8d7cb6e795ed8ffba998/packages/plugin/src/theia.d.ts#L3954) function.

At the moment it's possible to use [ProgressLocation](https://github.com/eclipse-theia/theia/blob/bdc9aa276cb55e5cf3dc8d7cb6e795ed8ffba998/packages/plugin/src/theia.d.ts#L4172-L4185) enum only as a location at which progress should show.

[The PR](https://github.com/eclipse-theia/theia/pull/8700) is aligning [location field](https://github.com/eclipse-theia/theia/blob/bdc9aa276cb55e5cf3dc8d7cb6e795ed8ffba998/packages/plugin/src/theia.d.ts#L4154) and the corresponding behavior with VS Code.

Current plugin contains a few commands to have an ability to test [the PR](https://github.com/eclipse-theia/theia/pull/8700).

You can use:
- Start progress for Explorer view
- Start progress for Search view
- Start progress for Debug view
- Start progress for SCM view

commands from Command Palette (F1) to check progress in the correcponding view. 

First 3 commands use `viewId` (new behavior) to show progress while running the given callback, the last command uses [ProgressLocation](https://github.com/eclipse-theia/theia/blob/bdc9aa276cb55e5cf3dc8d7cb6e795ed8ffba998/packages/plugin/src/theia.d.ts#L4172-L4185) enum to show progress for SCM view (existed behavior). 

