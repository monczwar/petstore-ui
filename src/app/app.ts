import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { SidePanel } from "./layout/side-panel/side-panel";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SidePanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  pageTitle: string = "Users";

  onUserSelected() {
    console.log("App level - user selected.");
  }
}
