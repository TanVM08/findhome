import { Component, HostListener } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tim-tro';

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    let pos = window.pageYOffset;
    if (pos > 50) {
      $('#goTop').css('display', 'block');
    } else {
      $('#goTop').css('display', 'none');
    }
  }
}
