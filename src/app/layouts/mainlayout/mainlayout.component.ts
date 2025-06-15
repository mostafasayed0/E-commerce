import { Component } from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-mainlayout',
  standalone: true,
  imports: [NavMainComponent, RouterOutlet, FooterComponent],
  templateUrl: './mainlayout.component.html',
  styleUrl: './mainlayout.component.scss'
})
export class MainlayoutComponent {

}
