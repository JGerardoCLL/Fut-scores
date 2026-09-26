import { HttpClient } from "@angular/common/http";
import { Injectable,inject } from "@angular/core";
import { Observable } from "rxjs";
import { Team, SportmonksResponse } from "../models/futbol.model";


@Injectable({
    providedIn: 'root'
})

export class FutbolService{
    private readonly http = inject(HttpClient);
    //llamada al back
    private readonly apiUrl = 'http://localhost:3000/api/teams';

    getTeams(): Observable<SportmonksResponse<Team>>{

        return this.http.get<SportmonksResponse<Team>>(this.apiUrl, {
            
        });
    }
}
