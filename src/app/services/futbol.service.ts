import { HttpClient } from "@angular/common/http";
import { Injectable,inject } from "@angular/core";
import { Observable } from "rxjs";
import { Team, SportmonksResponse } from "../models/futbol.model";


@Injectable({
    providedIn: 'root'
})

export class FutbolService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = '/api/v3/football/teams';

    getTeams(): Observable<SportmonksResponse<Team>>{

        return this.http.get<SportmonksResponse<Team>>(this.apiUrl, {
            params: {
                api_token: 'pdUyAj1tVHoiYHfsrlCxra6lWAHx8HlDqA1uiFqaqGtBiTbGIhu2MT2FWZUc',
                include: 'upcoming.participants;upcoming.league'
            }
        });
    }
}
