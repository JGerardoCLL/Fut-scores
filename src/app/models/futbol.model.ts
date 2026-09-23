export interface Team {
    id: number;
    name: string;
    country_id: number;
    founded: number | null;
    gender: string;
}

export interface SportmonksResponse<Contenido>{
    data: Contenido[];
}