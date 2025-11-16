import spidermanCover from "@/assets/comics/spiderman-no-way-home.jpg";
import batmanCover from "@/assets/comics/batman-dark-knight.jpg";
import wonderWomanCover from "@/assets/comics/wonder-woman-earth-one.jpg";
import avengersCover from "@/assets/comics/avengers-infinity-war.jpg";
import walkingDeadCover from "@/assets/comics/walking-dead-vol1.jpg";
import supermanCover from "@/assets/comics/superman-red-son.jpg";
import xmenCover from "@/assets/comics/xmen-days-future-past.jpg";
import sagaCover from "@/assets/comics/saga-vol1.jpg";
import watchmenCover from "@/assets/comics/watchmen.jpg";
import invincibleCover from "@/assets/comics/invincible-vol1.jpg";
import flashCover from "@/assets/comics/flash-rebirth.jpg";
import captainAmericaCover from "@/assets/comics/captain-america-winter-soldier.jpg";

export interface Comic {
  id: string;
  title: string;
  publisher: string;
  genre: string;
  character: string;
  price: number;
  releaseDate: string;
  coverImage: string;
  description: string;
  creators: {
    writer: string;
    artist: string;
  };
  featured?: boolean;
  newRelease?: boolean;
}

export const comics: Comic[] = [
  {
    id: "001",
    title: "Spider-Man: No Way Home",
    publisher: "Marvel",
    genre: "Superhero",
    character: "Spider-Man",
    price: 4.99,
    releaseDate: "2024-01-15",
    coverImage: spidermanCover,
    description: "Peter Parker's identity is revealed, leading to catastrophic consequences. The web-slinger must navigate a multiverse of dangers as he seeks a way to restore his secret identity.",
    creators: {
      writer: "Zeb Wells",
      artist: "John Romita Jr."
    },
    featured: true,
    newRelease: true
  },
  {
    id: "002",
    title: "Batman: The Dark Knight Returns",
    publisher: "DC",
    genre: "Superhero",
    character: "Batman",
    price: 5.99,
    releaseDate: "2024-01-10",
    coverImage: batmanCover,
    description: "In a dystopian future, an aged Bruce Wayne comes out of retirement to don the cape and cowl once more, facing enemies old and new in Gotham City.",
    creators: {
      writer: "Frank Miller",
      artist: "Frank Miller"
    },
    featured: true
  },
  {
    id: "003",
    title: "Wonder Woman: Earth One",
    publisher: "DC",
    genre: "Superhero",
    character: "Wonder Woman",
    price: 6.99,
    releaseDate: "2024-01-08",
    coverImage: wonderWomanCover,
    description: "Diana's origin story is reimagined as she leaves Paradise Island to enter the world of man, bringing her Amazonian values to a world in conflict.",
    creators: {
      writer: "Grant Morrison",
      artist: "Yanick Paquette"
    },
    newRelease: true
  },
  {
    id: "004",
    title: "The Avengers: Infinity War",
    publisher: "Marvel",
    genre: "Superhero",
    character: "Avengers",
    price: 4.99,
    releaseDate: "2024-01-05",
    coverImage: avengersCover,
    description: "Earth's Mightiest Heroes unite against the cosmic threat of Thanos, who seeks the Infinity Stones to reshape reality itself.",
    creators: {
      writer: "Jonathan Hickman",
      artist: "Jim Cheung"
    },
    featured: true
  },
  {
    id: "005",
    title: "The Walking Dead: Vol 1",
    publisher: "Image",
    genre: "Horror",
    character: "Rick Grimes",
    price: 3.99,
    releaseDate: "2024-01-03",
    coverImage: walkingDeadCover,
    description: "In a world overrun by zombies, Rick Grimes awakens from a coma to find civilization has collapsed. He must find his family and survive in this new world.",
    creators: {
      writer: "Robert Kirkman",
      artist: "Tony Moore"
    }
  },
  {
    id: "006",
    title: "Superman: Red Son",
    publisher: "DC",
    genre: "Superhero",
    character: "Superman",
    price: 5.99,
    releaseDate: "2024-01-01",
    coverImage: supermanCover,
    description: "What if Superman had landed in Soviet Russia instead of Kansas? This alternate history explores a world where the Man of Steel serves the Soviet Union.",
    creators: {
      writer: "Mark Millar",
      artist: "Dave Johnson"
    }
  },
  {
    id: "007",
    title: "X-Men: Days of Future Past",
    publisher: "Marvel",
    genre: "Superhero",
    character: "X-Men",
    price: 4.99,
    releaseDate: "2023-12-28",
    coverImage: xmenCover,
    description: "In a dystopian future where mutants are hunted, Kitty Pryde sends her consciousness back in time to prevent the assassination that triggered the mutant genocide.",
    creators: {
      writer: "Chris Claremont",
      artist: "John Byrne"
    },
    featured: true
  },
  {
    id: "008",
    title: "Saga: Volume 1",
    publisher: "Image",
    genre: "Sci-Fi",
    character: "Alana & Marko",
    price: 9.99,
    releaseDate: "2023-12-25",
    coverImage: sagaCover,
    description: "Two soldiers from opposite sides of a never-ending galactic war fall in love and risk everything to bring a fragile new life into a dangerous universe.",
    creators: {
      writer: "Brian K. Vaughan",
      artist: "Fiona Staples"
    },
    newRelease: true
  },
  {
    id: "009",
    title: "Watchmen",
    publisher: "DC",
    genre: "Superhero",
    character: "Various",
    price: 7.99,
    releaseDate: "2023-12-20",
    coverImage: watchmenCover,
    description: "A complex mystery unfolds as retired superheroes are targeted by a killer. This groundbreaking series questions the nature of heroism and power.",
    creators: {
      writer: "Alan Moore",
      artist: "Dave Gibbons"
    },
    featured: true
  },
  {
    id: "010",
    title: "Invincible: Vol 1",
    publisher: "Image",
    genre: "Superhero",
    character: "Invincible",
    price: 4.99,
    releaseDate: "2023-12-15",
    coverImage: invincibleCover,
    description: "Mark Grayson is a normal teenager until his superpowers kick in. He must learn to use his newfound abilities while uncovering dark secrets about his father.",
    creators: {
      writer: "Robert Kirkman",
      artist: "Cory Walker"
    }
  },
  {
    id: "011",
    title: "The Flash: Rebirth",
    publisher: "DC",
    genre: "Superhero",
    character: "The Flash",
    price: 5.99,
    releaseDate: "2023-12-10",
    coverImage: flashCover,
    description: "Barry Allen's return from the dead sends shockwaves through the DC Universe, but something is wrong with the Speed Force itself.",
    creators: {
      writer: "Geoff Johns",
      artist: "Ethan Van Sciver"
    }
  },
  {
    id: "012",
    title: "Captain America: Winter Soldier",
    publisher: "Marvel",
    genre: "Superhero",
    character: "Captain America",
    price: 4.99,
    releaseDate: "2023-12-05",
    coverImage: captainAmericaCover,
    description: "Steve Rogers faces his deadliest enemy yet: his former partner Bucky Barnes, now transformed into the deadly Winter Soldier assassin.",
    creators: {
      writer: "Ed Brubaker",
      artist: "Steve Epting"
    },
    newRelease: true
  }
];

export const getComicById = (id: string): Comic | undefined => {
  return comics.find(comic => comic.id === id);
};

export const getComicsByPublisher = (publisher: string): Comic[] => {
  return comics.filter(comic => comic.publisher === publisher);
};

export const getComicsByGenre = (genre: string): Comic[] => {
  return comics.filter(comic => comic.genre === genre);
};

export const getFeaturedComics = (): Comic[] => {
  return comics.filter(comic => comic.featured);
};

export const getNewReleases = (): Comic[] => {
  return comics.filter(comic => comic.newRelease);
};
