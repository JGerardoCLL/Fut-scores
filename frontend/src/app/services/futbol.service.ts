import { HttpClient } from "@angular/common/http";
import { Injectable,inject } from "@angular/core";
import { Observable } from "rxjs";
import { Team } from "../models/futbol.model";


@Injectable({
    providedIn: 'root'
})

export class FutbolService{
    private readonly http = inject(HttpClient);
    //llamada al back
    private readonly apiUrl = 'http://localhost:3000/api/teams';

    getTeam(teamId: number): Observable<{ data: Team }>{

        return this.http.get<{ data: Team }>(`${this.apiUrl}/${teamId}`, {
            
        });
    }
}
