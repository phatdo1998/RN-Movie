import axios from "axios";

const apiKey = "c61cac86e498606f7dbdfe7063b127c6";
const baseUrl = "https://api.themoviedb.org/3";

export const imageW500 = (path) => `https://image.tmdb.org/t/p/w500/${path}`;

const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const popularMoviesEndpoint = `${baseUrl}/movie/popular?api_key=${apiKey}`;
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;

// movie
const movieDetailsEndpoint = (id) => `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = (id) =>
  `${baseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// search

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchPopularMovies = () => {
  return apiCall(popularMoviesEndpoint);
};

export const fetchMoviesDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchCreditsMovies = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
