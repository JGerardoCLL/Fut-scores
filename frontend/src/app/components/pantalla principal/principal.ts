import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutbolService } from '../../services/futbol.service';
import { Team } from '../../models/futbol.model';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './principal.html',
    styleUrl: './principal.css'
})

export class PrincipalComponent implements OnInit{

    private readonly futbolService = inject(FutbolService);

    teams = signal<Team[]>([]);
    isLoading = signal<boolean>(false);
    errorMessage = signal<string | null>(null);

    ngOnInit(): void {
        this.isLoading.set(true);
        
        this.futbolService.getTeam(85)
        .pipe(
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
            next: (response) => {
            this.teams.set([response.data]);
            },
            error: (error) => {
            console.error('Error al obtener los equipos:', error);
            this.errorMessage.set('No se pudieron cargar los equipos.');
            }
        });
    }
    
}
    

