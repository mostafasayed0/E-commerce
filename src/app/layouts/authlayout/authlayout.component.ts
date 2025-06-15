import { Component } from '@angular/core';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-authlayout',
  standalone: true,
  imports: [NavAuthComponent, RouterOutlet, FooterComponent],
  templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.scss'
})
export class AuthlayoutComponent {

}
