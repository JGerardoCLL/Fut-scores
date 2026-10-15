import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { FutbolService } from '../../services/futbol.service';
import { LeagueSchedule } from '../../models/futbol.model';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './general.html',
  styleUrl: './general.css'
})
export class GeneralComponent implements OnInit {
  private readonly futbolService = inject(FutbolService);

  readonly selectedDate = signal('2026-10-18');
  readonly leagues = signal<LeagueSchedule[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.futbolService.getLeagueSchedule(this.selectedDate())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => this.leagues.set(response.data ?? []),
        error: (error) => {
          console.error('Error al obtener el calendario:', error);
          this.errorMessage.set('No se pudo cargar el calendario de partidos.');
          this.leagues.set([]);
        }
      });
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate.set(input.value);
  }
}