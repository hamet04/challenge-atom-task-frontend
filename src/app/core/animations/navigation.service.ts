import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];
  private isBackNavigation = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (this.history.includes(event.url)) {
          this.isBackNavigation = true;
          this.history = this.history.slice(0, this.history.indexOf(event.url));
        } else {
          this.isBackNavigation = false;
          this.history.push(event.url)
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
      });
  }

  isBack(): boolean {
    return this.isBackNavigation;
  }
}