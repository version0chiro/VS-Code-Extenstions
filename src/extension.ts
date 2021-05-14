import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "vs-to-do-sidebar",
      sidebarProvider
    )
  );

  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  item.text = "$(beaker) Add to do!";
  item.command = "to-do-list.addToDo";
  item.show();
  
  context.subscriptions.push(
    vscode.commands.registerCommand("to-do-list.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("to-do-list.addToDo", () => {
      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No activeTextEditor");
        return;
      }

      const text = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      vscode.window.showInformationMessage("Text: " + text);

      sidebarProvider._view?.webview.postMessage({
        type: "new-todo",
        value: text,
      });
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("to-do-list.refreshWeb", async () => {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.vs-to-do-sidebar-view"
      );
      // HelloWorldPanel.kill();
      //HelloWorldPanel.createOrShow(context.extensionUri);
      // setTimeout(() => {
      //   vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
      // }, 500);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("to-do-list.askAQuestion", async () => {
      const answer = await vscode.window.showInformationMessage(
        "how was your day?",
        "good",
        "bad"
      );

      if (answer === "bad") {
        vscode.window.showInformationMessage("sorry to hear that");
      } else {
        console.log(answer);
      }
    })
  );
}

export function deactivate() {}
