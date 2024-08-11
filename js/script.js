const global = {
  currentPage: window.location.pathname,
};

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
      break;
    }
    case '/shows.html': {
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


document.addEventListener('DOMContentLocaded', init);