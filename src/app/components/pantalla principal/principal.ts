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

    ngOnInit(): void {
        this.futbolService.getTeams().subscribe({
            next: (response) => {
                this.teams.set(response.data);
            },
            error: (error) => {
                console.error('Error al obtener los equipos:', error);
            }
        });
    }
    
}
