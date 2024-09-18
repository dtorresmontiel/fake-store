import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';

import { NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { routes } from './app.routes';

import { PageHeaderComponent } from './components/page/page-header/page-header.component';
import { PageFooterComponent } from './components/page/page-footer/page-footer.component';

import { NewProductModalComponent } from '@features/products/components/new-product-modal/new-product-modal.component';

import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartComponent } from '@features/cart/components/cart/cart.component';

import { MessagesService } from '@services/MessagesService';
import { SessionService } from '@services/SessionService';
import { Session } from './models/Session.model';
import { ResponsiveDisplayService } from '@services/ResponsiveDisplayService';

const ROUTER_IMPORTS = [RouterOutlet, RouterLink, RouterLinkActive];
const MATERIAL_LAYOUT_IMPORTS = [MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ROUTER_IMPORTS, MATERIAL_LAYOUT_IMPORTS, PageHeaderComponent, CartComponent, PageFooterComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  firstLevelRoutes: Routes = routes.filter(route => !route.redirectTo);
  private responsibleDisplayService = inject(ResponsiveDisplayService);
  isMobile: Observable<boolean> = this.responsibleDisplayService.isMobile();

  ngOnInit(): void {
    this.initializeSession();
    this.displaySnackBarWhenMessageReceived();
    this.closeSideNavOnNavigateWhenMobile();
  }

  private sessionService: SessionService = inject(SessionService);
  private initializeSession(): void {
    this.sessionService.initializeSession(2)
      .subscribe((session: Session | undefined) => session ? console.log('Session initialized', session) : undefined);
  }

  private snackBar = inject(MatSnackBar);
  private messagesService: MessagesService = inject(MessagesService);
  private displaySnackBarWhenMessageReceived(): void {
    this.messagesService.messages.subscribe(message => {
      this.snackBar.open(message, 'Dismiss', { duration: 2000 });
    });
  }

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  private router: Router = inject(Router);
  private closeSideNavOnNavigateWhenMobile(): void {
    combineLatest([this.isMobile, this.router.events.pipe(map(event => event instanceof NavigationStart))])
      .subscribe(([isMobile]) => {
        if (isMobile) this.sideNav.close();
      });
  }

  private readonly newProductModal: MatDialog = inject(MatDialog);
  openNewProductModal(event: any): void {
    console.log('openNewProductModal', event);
    const newProductModalRef = this.newProductModal.open(NewProductModalComponent, { data: {} });
    newProductModalRef.afterClosed().subscribe(result => {
      console.log('NewProductModal was closed', result);
    });
  }

  isCartOpened: boolean = false;
  onCartOpenedChange(isCartOpened: boolean): void {
    this.isCartOpened = isCartOpened;
  }

}
