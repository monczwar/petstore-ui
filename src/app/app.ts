import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { SidePanel } from "./layout/side-panel/side-panel";
import { ErrorBanner } from './core/error-banner';
import { ErrorService } from './core/error.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SidePanel, ErrorBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  pageTitle: string = "Users";
  protected readonly errors = inject(ErrorService);

  onUserSelected() {
    console.log("App level - user selected.");
  }

  testErrorBanner(): void {
    this.errors.show('Test error — remove this button before shipping');
  }
}
