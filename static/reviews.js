const container = document.querySelector('.movieReviewsContainer');
console.log('ASJIDAIS')


const paginationButton = document.querySelector('.paginationButton');
paginationButton.addEventListener('click', () => {
  const url = window.location.href;
  const urlArr = url.split('/');
  const movieId = urlArr[urlArr.length - 1];

  const res = await fetch(`/api/movies/${movieId}/reviews`);
  console.log(res);
});
