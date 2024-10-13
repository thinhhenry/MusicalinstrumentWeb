import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LayoutComponent } from './User/Components/layout/layout.component';
import { AdminLayoutComponent } from './Admin/Components/admin-layout/admin-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LayoutComponent, AdminLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
