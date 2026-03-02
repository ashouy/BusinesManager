import { Injectable, signal } from '@angular/core';

export type ToastType = 'info' | 'error';

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  private nextId = 1;

  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: ToastType = 'info', durationMs = 3000): void {
    const toast: Toast = {
      id: this.nextId++,
      message,
      type,
    };

    this._toasts.update((current) => [...current, toast]);

    window.setTimeout(() => {
      this._toasts.update((current) =>
        current.filter((item) => item.id !== toast.id)
      );
    }, durationMs);
  }
}

