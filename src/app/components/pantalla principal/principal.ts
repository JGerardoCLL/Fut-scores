import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FutbolService  } from '../../services/futbol.service';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './principal.html',
    styleUrl: './principal.css'
})

export class PrincipalComponent implements OnInit{

    private readonly futbolService = inject(FutbolService);

    teams = signal<any[]>([]);

    ngOnInit(): void {
        this.futbolService.getTeams().subscribe({
            next: (response) => {
                console.log('Primer equipo:',response.data[0]);
                this.teams.set(response.data);
            },
            error: (error) => {
                console.error('Error al obtener los equipos:', error);
            }
        });
    }
    
}
