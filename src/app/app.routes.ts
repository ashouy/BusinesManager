import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.page';
import { AgendaPageComponent } from './pages/agenda/agenda.page';
import { InsumosPageComponent } from './pages/insumos/insumos.page';
import { PacientesPageComponent } from './pages/pacientes/pacientes.page';
import { DocumentosPageComponent } from './pages/documentos/documentos.page';
import { RelatoriosPageComponent } from './pages/relatorios/relatorios.page';
import { ConfiguracoesPageComponent } from './pages/configuracoes/configuracoes.page';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'agenda', component: AgendaPageComponent },
  { path: 'insumos', component: InsumosPageComponent },
  { path: 'pacientes', component: PacientesPageComponent },
  { path: 'documentos', component: DocumentosPageComponent },
  { path: 'relatorios', component: RelatoriosPageComponent },
  { path: 'configuracoes', component: ConfiguracoesPageComponent },
  { path: '**', redirectTo: '' },
];
