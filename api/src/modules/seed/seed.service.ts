import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MoviesService } from '../movie/movie.service';
import { ActorsService } from '../actor/actor.service';
import { RateService } from '../rate/rate.service';
import { UserService } from '../user/user.service';
import { MovieDto } from '../movie/movie.dto';
import { ActorDto } from '../actor/actor.dto';
import { UserEntity } from '../user/user.entity';
import { MovieActorService } from '../movieactor/movieactor.service';

@Injectable()
export class SeedService implements OnModuleInit {
  movies = [
    {
      name: 'Dune',
      summary:
        "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset and its most vital element—spice.",
    },
    {
      name: 'The Matrix',
      summary:
        'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    },
    {
      name: 'Inception',
      summary:
        'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    },
    {
      name: 'Interstellar',
      summary:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      name: 'Spirited Away',
      summary:
        "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    },
    {
      name: 'Parasite',
      summary:
        'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    },
    {
      name: 'Arrival',
      summary:
        'A linguist is recruited by the military to assist in translating alien communications.',
    },
    {
      name: 'Blade Runner 2049',
      summary:
        'A young blade runner discovers a long-buried secret that has the potential to plunge what’s left of society into chaos.',
    },
    {
      name: 'Eternal Sunshine of the Spotless Mind',
      summary:
        'A man heartbroken after a breakup undergoes a procedure to erase memories of his former girlfriend, only to realize he still loves her.',
    },
    {
      name: 'Pulp Fiction',
      summary:
        "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
  ];

  actors = [
    'Timothée Chalamet',
    'Zendaya',
    'Rebecca Ferguson',
    'Keanu Reeves',
    'Carrie-Anne Moss',
    'Laurence Fishburne',
    'Leonardo DiCaprio',
    'Joseph Gordon-Levitt',
    'Tom Hardy',
    'Cillian Murphy',
    'Matthew McConaughey',
    'Anne Hathaway',
    'Amy Adams',
    'Jeremy Renner',
    'Ryan Gosling',
    'Harrison Ford',
    'Ana de Armas',
    'Jim Carrey',
    'Kate Winslet',
    'John Travolta',
    'Samuel L. Jackson',
    'Uma Thurman',
    'Song Kang-ho',
    'Choi Woo-shik',
  ];
  usernames = [
    'alphauser',
    'betatester',
    'codergurl',
    'devmaster',
    'elasticbean',
    'fuzzy_logic',
    'gigapixel',
    'happy_dev',
    'ironman24',
    'javascript_fan',
    'kilo_byte',
    'lambda_kid',
    'matrix_agent',
    'nerd_bird',
    'ocean_code',
    'pixel_pusher',
    'quantum_leap',
    'ruby_rocks',
    'syntax_savant',
    'terminal_titan',
  ];

  constructor(
    private readonly _moviesService: MoviesService,
    private readonly _actorsService: ActorsService,
    private readonly _ratesService: RateService,
    private readonly _usersService: UserService,
    private readonly _movieActorService: MovieActorService,
  ) {}

  async onModuleInit() {
    const total = (await this._moviesService.GetMovies()).length;
    if (total > 0) return;
    const actorIds: string[] = [];
    const userIds: string[] = [];
    Logger.log('Seeding DB....');
    for (const actorName of this.actors) {
      const actorDto: ActorDto = new ActorDto();
      actorDto.name = actorName;
      actorIds.push(await this._actorsService.AddNewActor(actorDto));
    }

    for (const name of this.usernames) {
      const user: UserEntity = new UserEntity();
      user.name = name;
      userIds.push(await this._usersService.AddUser(user));
    }

    for (const entry of this.movies) {
      const movie: MovieDto = new MovieDto();
      movie.name = entry.name;
      movie.summary = entry.summary;

      const movieId = await this._moviesService.AddNewMovie(movie);
      movie.id = movieId;
      const startIndex = Math.floor(Math.random() * actorIds.length);
      // +1 to ensure at least one element
      const endIndex =
        Math.floor(Math.random() * (actorIds.length - startIndex)) +
        startIndex +
        1;

      const setOfActors = actorIds.slice(startIndex, endIndex);
      for (const actorId of setOfActors) {
        await this._movieActorService.AddNewActorToMovie({
          movieId: movieId,
          actorId: actorId,
        });
      }
      // seed 5 rates
      console.log(userIds);
      for (let index = 0; index < 5; index++) {
        const x = userIds[Math.floor(Math.random() * userIds.length)];
        console.log(x);
        await this._ratesService.AddRate({
          movieId: movieId,
          value: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
          userId: x,
          userName: '',
        });
      }
    }
    Logger.log('Seeded DB');
  }
}
