import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  desktopNavigationActive = false;

  constructor(private breakpointService: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointService
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.desktopNavigationActive = false;
        if (result.matches) {
          this.desktopNavigationActive = true;
        }
      });
  }
}
