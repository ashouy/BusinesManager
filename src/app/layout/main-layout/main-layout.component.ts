import { Component, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroHome,
  heroCalendarDays,
  heroBeaker,
  heroUsers,
  heroDocumentText,
  heroChartBar,
  heroCog6Tooth,
} from '@ng-icons/heroicons/outline';
import { FooterComponent } from '../footer/footer.component';

type MenuItem = {
  label: string;
  path: string;
  icon: string;
};

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
    NgIcon,
    FooterComponent,
  ],
  providers: [
    provideIcons({
      heroHome,
      heroCalendarDays,
      heroBeaker,
      heroUsers,
      heroDocumentText,
      heroChartBar,
      heroCog6Tooth,
    }),
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  protected readonly title = signal('BusinesManager');
  protected readonly user = signal({ name: 'João Silva' });

  protected readonly menuItems: MenuItem[] = [
    { label: 'Home', path: '', icon: 'heroHome' },
    { label: 'Agenda', path: 'agenda', icon: 'heroCalendarDays' },
    { label: 'Insumos', path: 'insumos', icon: 'heroBeaker' },
    { label: 'Pacientes', path: 'pacientes', icon: 'heroUsers' },
    { label: 'Documentos', path: 'documentos', icon: 'heroDocumentText' },
    { label: 'Relatórios', path: 'relatorios', icon: 'heroChartBar' },
    { label: 'Configurações', path: 'configuracoes', icon: 'heroCog6Tooth' },
  ];

  protected readonly sidebarOpen = signal(false);
  protected readonly userMenuOpen = signal(false);
  protected readonly currentPageTitle = signal('Home');

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentPath = this.router.url.replace(/^\//, '');
        const active =
          this.menuItems.find((item) => item.path === currentPath) ??
          this.menuItems[0];

        this.currentPageTitle.set(active.label);
      });
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  protected toggleUserMenu(): void {
    this.userMenuOpen.update((open) => !open);
  }

  protected logout(): void {
    // Mocked logout handler for now.
    console.log('Logout clicked');
  }
}
