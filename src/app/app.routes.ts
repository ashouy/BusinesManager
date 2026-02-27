import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePageComponent } from './features/home/home.page';
import { AgendaPageComponent } from './features/agenda/agenda.component';
import { InsumosPageComponent } from './features/insumos/insumos.component';
import { PacientesPageComponent } from './features/pacientes/pacientes.component';
import { DocumentosPageComponent } from './features/documentos/documentos.component';
import { RelatoriosPageComponent } from './features/relatorios/relatorios.component';
import { ConfiguracoesPageComponent } from './features/configuracoes/configuracoes.component';
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
