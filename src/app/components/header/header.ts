import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faX, faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  faBars = faBars;
  faX = faX;
  faCart = faCartShopping;

  desktopNavigationActive = false;
  mobileNavigationActive = false;
  cartOpen = false;

  constructor(private breakpointService: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointService
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.desktopNavigationActive = false;
        if (result.matches) {
          this.desktopNavigationActive = true;
          this.mobileNavigationActive = false;
        }
      });
  }
}
