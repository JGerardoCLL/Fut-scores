export interface Team {
    id: number;
    sport_id: number;
    country_id: number;
    venue_id: number;
    gender: string;
    name: string;
    short_code: string;
    image_path: string;
    founded: number | null;
    type: string;
    placeholder: boolean;
    last_played_at: string;
    upcoming: Match[];
}

export interface Match {
  id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  round_id: number;
  state_id: number;
  venue_id: number;
  name: string;
  starting_at: string;
  starting_at_timestamp: number;
  leg: string;
  length: number;
  meta: MatchMeta;
  participants: Participant[];
  league: League;
}

export interface MatchMeta {
  location: 'home' | 'away';
}

export interface Participant {
  id: number;
  name: string;
  short_code: string;
  image_path: string;
  meta: ParticipantMeta;
}

export interface ParticipantMeta {
  location: 'home' | 'away';
  winner: boolean | null;
  position: number | null;
}

export interface League {
  id: number;
  name: string;
  short_code: string;
  image_path: string;
}

export interface SportmonksResponse<Contenido>{
    data: Contenido[];
}