import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { NavigationService } from './core/animations/navigation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('forward => backward, backward => forward', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }),
        ], { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX({{ enterFrom }})' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
          ], { optional: true, params: { enterFrom: '100%' } }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX({{ leaveTo }})' })),
          ], { optional: true, params: { leaveTo: '-100%' } }),
        ]),
      ]),
    ])
  ]
})
export class AppComponent {
  constructor(private navigationService: NavigationService) {}

  prepareRoute(outlet: RouterOutlet) {
    const direction = this.navigationService.isBack() ? 'backward' : 'forward';
    return {
      value: direction,
      params: {
        enterFrom: direction === 'forward' ? '100%' : '-100%',
        leaveTo: direction === 'forward' ? '-100%' : '100%',
      },
    };
  }
}
