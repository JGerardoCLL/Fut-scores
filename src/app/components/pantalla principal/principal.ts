import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutbolService } from '../../services/futbol.service';
import { Team } from '../../models/futbol.model';

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
        
        this.futbolService.getTeams().subscribe({
            next: (response) => {
                this.teams.set(response.data);
                this.isLoading.set(false);
            },
            error: (error) => {
                this.errorMessage.set('No se pudieron cargar los equipos.');
                this.isLoading.set(false);
            }
        });
    }
    
}
