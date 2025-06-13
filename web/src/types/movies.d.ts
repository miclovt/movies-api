export interface Movie {
  id: string;
  name: string;
  summary: string;
  actors: Actor[];
  rates: Rate[];
}

export interface User {
  id: string;
  name: string;
}

export interface Actor {
  id: string;
  name: string;
}

export interface Rate {
  id: string;
  userId: string;
  userName: string;
  value: number;
}

export interface RateAverage {
  movieId: string;
  average: number | null;
}
