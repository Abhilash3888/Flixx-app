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

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);
  //overlay for bg image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
    ${movie.poster_path
      ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt="${movie.title}"
       />`
      : `<img
        src="../images/no-image.jpg"
        alt="${movie.title}"
        />`}
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
    <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)}/10
    </p>
    <p>Release Date: ${movie.release_date}</p>
    <p>${movie.overview}</p>
    <h5>Genres</h5>
    <ul>
      ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}</ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
       <li><span class="text-secondary">Production Company: </span>
       ${movie.production_companies
      .map(company => `<span>${company.name}</span>`)
      .join(', ')}
      </li>
    </ul>
  </div>`;

  document.querySelector('#movie-details').appendChild(div);
}

async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showId}`);
  //overlay for bg image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
    ${show.poster_path
      ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        alt="${show.name}"
       />`
      : `<img
        src="../images/no-image.jpg"
        alt="${show.name}"
        />`}
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
    <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)}/10
    </p>
    <p>Last Air Date: ${show.last_air_date}</p>
    <p>${show.overview}</p>
    <h5>Genres</h5>
    <ul>
      ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}</ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
  </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    
      <li><span class="text-secondary">Production Company :</span>
       ${show.production_companies
      .map(company => `<span >${company.name}</span>`)
      .join(', ')} </li>
    </ul>
  </div>`;

  document.querySelector('#show-details').appendChild(div);
}
//display backdrop
function displayBackgroundImage(type, path) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
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
    if (link.getAttribute('href') === '/shows.html' && global.currentPage === '/tv-details.html') {
      link.classList.add('active');
    }
    if (link.getAttribute('href') === '/index.html' && global.currentPage === '/movie-details.html') {
      link.classList.add('active');
    }
  })
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      displayMovieDetails();
      break;
    }
    case '/tv-details.html': {
      displayShowDetails();
      break;
    }
    case '/search.html': {
      break;
    }
  }

  highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);