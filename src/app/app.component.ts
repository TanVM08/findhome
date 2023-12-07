import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tim-tro';
  isShowFooter: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleRouteChange();
      }
    });
  }
  ngOnInit(): void {}

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

  private handleRouteChange() {
    if (this.router.url.includes('/manager')) {
      this.isShowFooter = false;
    } else {
      this.isShowFooter = true;
    }
  }
}
