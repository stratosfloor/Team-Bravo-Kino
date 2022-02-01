const renderReviews = async () => {
  const loadReviws = async () => {
    const url = window.location.href;
    const urlArr = url.split('/');
    const movieId = urlArr[urlArr.length - 1];

    try {
      const URL = `/api/movies/${movieId}/reviews`;
      const response = await fetch(URL);
      const payload = await response.json();
      return payload;
    } catch (error) {
      console.log(error);
    }
  };

  const container = document.querySelector('.movieReviewsContainer');
  const reviewsList = document.querySelector('.movieReviewsList');

  const reviewsData = await loadReviws();
  const page_size = 5;
  let page_number = 0;

  function pagination(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const renderReviews = (direction) => {
    if (direction === 'forward') {
      page_number++;
    } else if (direction === 'back') {
      page_number--;
    }

    const data = pagination(reviewsData, page_size, page_number);

    reviewsList.innerHTML = '';

    data.forEach((review) => {
      const li = document.createElement('li');

      const rating = document.createElement('div');
      rating.innerHTML = `Betyg: ${review.attributes.rating}`;
      li.appendChild(rating);

      if (review.attributes.comment) {
        const comment = document.createElement('div');
        comment.innerHTML = `Kommenter: ${review.attributes.comment}`;
        li.appendChild(comment);
      }

      if (review.attributes.author) {
        const author = document.createElement('div');
        author.innerHTML = `Lämnad av: ${review.attributes.author}`;
        li.appendChild(author);
      }

      li.style.paddingTop = '1rem';
      reviewsList.appendChild(li);
    });
  };

  renderReviews('forward');

  const paginationButtonBack = document.querySelector('.paginationButtonBack');
  paginationButtonBack.addEventListener('click', async () => {
    renderReviews('back');
    if (page_number < 2) {
      paginationButtonBack.disabled = true;
    }
    paginationButtonForward.disabled = false;
  });
  paginationButtonBack.disabled = true;

  const paginationButtonForward = document.querySelector(
    '.paginationButtonForward'
  );
  paginationButtonForward.addEventListener('click', async () => {
    renderReviews('forward');
    paginationButtonBack.disabled = false;

    if (reviewsData.length <= page_number * page_size) {
      paginationButtonForward.disabled = true;
    }
  });
};

renderReviews();
