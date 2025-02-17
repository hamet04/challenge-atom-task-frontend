import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CloseSessionDialogComponent } from '../../shared/dialogs/close-session-dialog/close-session-dialog.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent implements OnDestroy {
  fillerNav = [
    { name: 'Home', icon: 'home', path: '/home'}
  ]

  protected readonly isMobile = signal(true)

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(
    private dialog: MatDialog) {
      const media = inject(MediaMatcher);
  
      this._mobileQuery = media.matchMedia('(max-width: 600px)');
      this.isMobile.set(this._mobileQuery.matches);
      this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
      this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  
  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
  
  toggleSidenav() {
    console.log('Abrir/cerrar sidenav');
  }

  closeSession(){
    this.dialog.open(CloseSessionDialogComponent, {
      width: '350px'
    })
  }
}
