import fetch from 'node-fetch';

const API_URL = `https://lernia-kino-cms.herokuapp.com/api/reviews`

const loadMovieReviews = async (movieId) => {
  const res = await fetch(`${API_URL}?filters[movie]=${movieId}`);
  const payload = await res.json();

  return payload.data
}

export default loadMovieReviews;