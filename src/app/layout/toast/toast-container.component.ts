import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    @if (toasts().length) {
      <div class="fixed top-4 right-4 z-50 space-y-2">
        @for (toast of toasts(); track toast.id) {
          <div
            class="min-w-[220px] max-w-xs rounded-md px-4 py-2 text-sm shadow-lg border transition-transform animate-slide-in"
            [class.bg-red-100]="toast.type === 'error'"
            [class.text-red-800]="toast.type === 'error'"
            [class.border-red-200]="toast.type === 'error'"
            [class.bg-slate-900]="toast.type === 'info'"
            [class.text-slate-50]="toast.type === 'info'"
            [class.border-slate-700]="toast.type === 'info'"
          >
            {{ toast.message }}
          </div>
        }
      </div>
    }
  `,
  styles: [
    `
      .animate-slide-in {
        animation: slide-in 0.15s ease-out;
      }

      @keyframes slide-in {
        from {
          opacity: 0;
          transform: translateX(8px) translateY(4px);
        }
        to {
          opacity: 1;
          transform: translateX(0) translateY(0);
        }
      }
    `,
  ],
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);

  protected readonly toasts = computed(() => this.toastService.toasts());
}

