import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterStrategyComponent } from './modules/strategies/register-strategy.component';
import { RegisterOperationComponent } from './modules/operations/register-operation.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FeedbackComponent } from './modules/feedback/feedback.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MaintenanceComponent } from './shared/components/maintenance/maintenance.component';


const routes: Routes = [
  
  {
    path:"registrarse",
    component:MaintenanceComponent
  },
  { 
    path: 'login', 
    loadChildren: () => 
      import('./modules/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio', // Redirige la ruta vacía al componente Home
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        component: HomeComponent,
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard]
      },
      {
        path: 'estrategias',
        component: RegisterStrategyComponent,
        loadChildren: () =>
          import('./modules/strategies/strategies.module').then((m) => m.StrategiesModule),canActivate: [AuthGuard]
      },
      {
        path: 'operaciones',
        component: RegisterOperationComponent,
        loadChildren: () =>
          import('./modules/operations/operations.module').then((m) => m.OperationsModule),canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),canActivate: [AuthGuard]
      },
      {
        path: 'retroalimentacion',
        component: FeedbackComponent,
        loadChildren: () =>
          import('./modules/feedback/feedback.module').then((m) => m.FeedbackModule),canActivate: [AuthGuard]
      },
      // {
      //   path: '**',
      //   redirectTo: 'home',
      // },
      // {
      //     path: '**',
      //     redirectTo: 'inicio',
      //     pathMatch: 'full',
      // }
    ]
  }
// ,
// {
//   path: '**',
//   component: NotFoundComponent,
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
