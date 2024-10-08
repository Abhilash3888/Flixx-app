const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0
  }
};
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjI3NjIxMTgxYjhlOWI4Mzk2NmQyMDRhNGIxYjFlMSIsIm5iZiI6MTcyMzIyNjQzMS45ODg2NzYsInN1YiI6IjY2YjY1N2E1ZTA1ODY1NzVlZDEyNTI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4rKv7RFDf8Rv7Wr5j1LSgOVEYDXN97Et4-xOemeC2LM'
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
      ${movie.vote_average.toFixed(1)} / 10
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
      ${show.vote_average.toFixed(1)} / 10
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

//Search
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);
    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
}

function displaySearchResults(results) {

  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
      ${result.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
        alt=${global.search.type === 'movie' ? result.title : result.name}>` : `<img
        src="../images/no-image.jpg"
        alt=${global.search.type === 'movie' ? result.title : result.name}>`}  
    </a>
    <div class="card-body">
      <h5>${global.search.type === 'movie' ? result.title : result.name}</h5>
      <p>
        <small>Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
      </p>
      </div>`;
    document.querySelector('#search-results-heading').innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`
    document.querySelector('#search-results').appendChild(div);
  });

  displayPagination();
}

function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn" id="prev">Prev</button>
  <button class="btn" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
  document.querySelector('#pagination').appendChild(div);

  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_results } = await searchAPIData();
    displaySearchResults(results);
  });
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_results } = await searchAPIData();
    displaySearchResults(results);
  });
}

//Display Slider
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href ="movie-details.html?id=${movie.id}">
      <img src=https://image.tmdb.org/t/p/w500${movie.poster_path} alt=${movie.title}>
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10</h4>`;

    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });

}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }

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


async function searchAPIData() {
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(`${API_URL}search/${global.search.type}?query=${global.search.term}&language=en-US&page=${global.search.page}`, options);
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

//Show Alert
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(() => { alertEl.remove() }, 3000)
}

//Highlight  active link{
function highlightActiveLink() {

  const links = document.querySelectorAll('.nav-link');


  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active')
    }
    else if (link.getAttribute('href').includes('shows') && global.currentPage.includes('tv-details')) {
      link.classList.add('active');
    }    
    else if (link.getAttribute('href').includes('index') && global.currentPage.includes('movie-details')) {
      link.classList.add('active');
    }
  })
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
//Init
function init() {
  const page = global.currentPage;

  if (["/", "/index.html"].includes(page)) {
    displayPopularMovies();
    displaySlider();
  } else if (page.includes("shows")) {
    displayPopularShows();
  } else if (page.includes("movie-details")) {
    displayMovieDetails();
  } else if (page.includes("tv-details")) {
    displayShowDetails();
  } else if (page.includes("search")) {
    search();
  }

  highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);