import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";
import axios from "axios";

const initialState = {
  movie: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netfilx/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`
  );
  //   console.log(genres);
  return genres;
});

const arrayOfMovieData = (array, movieArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      movieArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getMovieData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    arrayOfMovieData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovie = createAsyncThunk(
  "netfilx/trending",
  async ({ type }, myThunk) => {
    const {
      netflix: { genres },
    } = myThunk.getState();
    const data = getMovieData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`,
      genres,
      true
    );
    return data;
    // console.log(data);
  }
);
const netflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genresLoaded = true;
      state.genres = action.payload;
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
});
