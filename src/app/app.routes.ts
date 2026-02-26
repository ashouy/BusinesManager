import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home/home.page';
import { AgendaPageComponent } from './pages/agenda/agenda.page';
import { InsumosPageComponent } from './pages/insumos/insumos.page';
import { PacientesPageComponent } from './pages/pacientes/pacientes.page';
import { DocumentosPageComponent } from './pages/documentos/documentos.page';
import { RelatoriosPageComponent } from './pages/relatorios/relatorios.page';
import { ConfiguracoesPageComponent } from './pages/configuracoes/configuracoes.page';
import { LoginComponent } from './auth/login/login.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecoverPasswordComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'agenda', component: AgendaPageComponent },
      { path: 'insumos', component: InsumosPageComponent },
      { path: 'pacientes', component: PacientesPageComponent },
      { path: 'documentos', component: DocumentosPageComponent },
      { path: 'relatorios', component: RelatoriosPageComponent },
      { path: 'configuracoes', component: ConfiguracoesPageComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
