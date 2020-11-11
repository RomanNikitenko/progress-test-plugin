
/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';
import * as os from 'os';
import { posix } from 'path';

const DELAY = 5000;
const CUSTOM_VIEW_ID = 'testCustomView';

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

const customViewStartProgressCommand = {
    id: 'start-progress-custom-view',
    label: "Start progress for Custom view"
};

export function start(context: theia.PluginContext) {
    new CustomView(context);

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

    context.subscriptions.push(theia.commands.registerCommand(customViewStartProgressCommand, async () => {
        const result = await theia.commands.executeCommand(`plugin.view-container.${CUSTOM_VIEW_ID}.toggle`);
        if (!result) {
            theia.commands.executeCommand(`plugin.view-container.${CUSTOM_VIEW_ID}.toggle`);
        }

        theia.window.withProgress({ location: { viewId: CUSTOM_VIEW_ID } }, async () => {
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

class CustomView {

    readonly treeView: theia.TreeView<theia.Uri>;

    constructor(context: theia.PluginContext) {
        const treeDataProvider = new CustomViewDataProvider();
        this.treeView = theia.window.createTreeView(CUSTOM_VIEW_ID, { treeDataProvider });
    }
}

class CustomViewDataProvider implements theia.TreeDataProvider<theia.Uri> {

    async getTreeItem(element: theia.Uri): Promise<theia.TreeItem> {
        const stat = await theia.workspace.fs.stat(element);
        const treeItem = new theia.TreeItem(posix.basename(element.path), stat.type === theia.FileType.Directory ? theia.TreeItemCollapsibleState.Collapsed : theia.TreeItemCollapsibleState.None);
        if (stat.type === theia.FileType.File) {
            treeItem.contextValue = 'file';
        }
        return treeItem;
    }

    async getChildren(element?: theia.Uri): Promise<theia.Uri[]> {
        if (!element) {
            const uri = theia.Uri.parse(posix.join(os.homedir())).with({ scheme: 'file' });
            const names: [string, theia.FileType][] = await theia.workspace.fs.readDirectory(uri);
            return names.map(([name]) => uri.with({ path: posix.join(uri.path, name) }));
        }
        const stat = await theia.workspace.fs.stat(element);
        if (stat.type === theia.FileType.Directory) {
            const names: [string, theia.FileType][] = await theia.workspace.fs.readDirectory(element);
            return names.map(([name]) => element.with({ path: posix.join(element.path, name) }));
        }
        return [];
    }

}
