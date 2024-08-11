const global = {
  currentPage: window.location.pathname,
};
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',

  }
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${movie.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt=${movie.title}>` : `<img
        src="../images/no-image.jpg"
        alt=${movie.title}>`}  
    </a>
    <div class="card-body">
      <h5>${movie.title}</h5>
      <p>
        <small>Release: ${movie.release_date}</small>
      </p>
      </div>`;
    document.querySelector('#popular-movies').appendChild(div);
  })

}

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach(show => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${show.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        alt=${show.name}>` : `<img
        src="../images/no-image.jpg"
        alt=${show.name}>`}  
    </a>
    <div class="card-body">
      <h5>${show.name}</h5>
      <p>
        <small>Air Date: ${show.first_air_date}</small>
      </p>
      </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  })

}
//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?language=en-US`, options);
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
//Highlight  active link{
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active')
    }
  })
}
//Init
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html': {
      displayPopularMovies();
      break;
    }
    case '/shows.html': {
      displayPopularShows();
      break;
    }
    case '/movie-details.html': {
      break;
    }
    case '/tv-details.html': {
      break;
    }
    case '/search.html': {
      break;
    }
  }

  highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);