const renderReviews = async () => {

  const loadReviws = async () => {
    const url = window.location.href;
    const urlArr = url.split('/');
    const movieId = urlArr[urlArr.length - 1];
  
    try {
      const URL = `/api/movies/${movieId}/reviews`
      const response = await fetch(URL);
      const payload = await response.json();
      console.log(payload);
      return payload;
    } catch (error) {
      console.log(error)
    }
  }

  const container = document.querySelector('.movieReviewsContainer');
  const reviewsList = document.querySelector('.movieReviewsList');

  const reviewsData = await loadReviws();
  const page_size = 5;
  let page_number = 1;
  
  function pagination(array, page_size, page_number) {
    return array.slice((page_number -1) * page_size, page_number * page_size)
  };

  const renderReviews = () => {
    const data = pagination(reviewsData, page_size, page_number);
    page_number++
    data.forEach((review) => {
      const li = document.createElement('li');
      
      const rating = document.createElement('div');
      rating.innerHTML = review.attributes.rating;

      const comment = document.createElement('div');
      comment.innerHTML = review.attributes.comment;

      const author = document.createElement('div');
      author.innerHTML = review.attributes.author;

      li.appendChild(rating);
      li.appendChild(comment);
      li.appendChild(author);
      li.style.paddingTop = '1rem'
      reviewsList.appendChild(li)
    })
  }

  renderReviews()

  
  const paginationButton = document.querySelector('.paginationButton');
  paginationButton.addEventListener('click', async () => {
    renderReviews();
    if(reviewsData.length < (page_number * page_size)) {
      paginationButton.style.display = 'none';
    }
  });  
}

renderReviews();