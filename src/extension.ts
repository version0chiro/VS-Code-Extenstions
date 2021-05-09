import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "to-do-list" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("to-do-list.helloWorld", () => {
		HelloWorldPanel.createOrShow(context.extensionUri);
	})
  );
  

  context.subscriptions.push(
    vscode.commands.registerCommand("to-do-list.askAQuestion", async () => {
      const answer = await vscode.window.showInformationMessage(
        "how was your day?",
        "good",
        "bad"
      );

	  if(answer ==='bad'){
		  vscode.window.showInformationMessage("sorry to hear that");
	  }else{
		  console.log(answer);
		  
	  }
    })
  );
}

export function deactivate() {}
