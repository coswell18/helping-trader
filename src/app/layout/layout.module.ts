import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PrincipalBannerComponent } from './components/principal-banner/principal-banner.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    PrincipalBannerComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule { }
