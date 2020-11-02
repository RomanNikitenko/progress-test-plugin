
/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';

export function start(context: theia.PluginContext) {
    const DELAY = 5000;

    const explorerStartProgressCommand = {
        id: 'start-progress-explorer',
        label: "Start progress for Explorer view"
    };

    const searchStartProgressCommand = {
        id: 'start-progress-search',
        label: "Start progress for Search view"
    };

    const debugStartProgressCommand = {
        id: 'start-progress-debug',
        label: "Start progress for Debug view"
    };

    const scmStartProgressCommand = {
        id: 'start-progress-scm',
        label: "Start progress for SCM view"
    };

    context.subscriptions.push(theia.commands.registerCommand(explorerStartProgressCommand, () => {
        theia.commands.executeCommand('fileNavigator:toggle');
        theia.window.withProgress({ location: { viewId: 'explorer' } }, async () => {
            return timeout(DELAY);
        });
    }));

    context.subscriptions.push(theia.commands.registerCommand(debugStartProgressCommand, () => {
        theia.commands.executeCommand('debug:toggle');
        theia.window.withProgress({ location: { viewId: 'debug' } }, async () => {
            return timeout(DELAY);
        });
    }));

    context.subscriptions.push(theia.commands.registerCommand(searchStartProgressCommand, () => {
        theia.commands.executeCommand('search-in-workspace.toggle');
        theia.window.withProgress({ location: { viewId: 'search', } }, async () => {
            return timeout(DELAY);
        });
    }));

    context.subscriptions.push(theia.commands.registerCommand(scmStartProgressCommand, () => {
        theia.commands.executeCommand('scmView:toggle');
        theia.window.withProgress({ location: theia.ProgressLocation.SourceControl }, async () => {
            return timeout(DELAY);
        });
    }));
}

export function timeout(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

export function stop() { }
