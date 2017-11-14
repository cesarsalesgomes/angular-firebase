import { AuthService } from './../../core/auth.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  @Input() header: { title: string };
  isInProducts: boolean;

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.isInProducts = this.router.url === '/products' ? true : false;
  }
}
