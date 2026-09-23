import { HttpClient } from "@angular/common/http";
import { Injectable,inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FutbolService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = '/api/v3/football/teams';

    getTeams(): Observable<any>{
        return this.http.get(this.apiUrl, {
            params: {
                api_token: 'pdUyAj1tVHoiYHfsrlCxra6lWAHx8HlDqA1uiFqaqGtBiTbGIhu2MT2FWZUc'
            }
        });
    }
}
