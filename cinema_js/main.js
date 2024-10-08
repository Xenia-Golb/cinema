
import './style.css'

const apiKey = '';
const apiUrlTop = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES "
const apiUrlFindById = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"
const apiUrlKeyword = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const apiReviews = "https://kinopoiskapiunofficial.techapi/v2.2/films/"

const getTopMovies = async () => {
  try {
    // Получаем api
    const response1 = await fetch(apiUrlTop, { headers: { 'accept': 'application/json', 'X-API-KEY': apiKey } })
    const topMovie = await response1.json();

    const createEl = (arr) => {
      document.querySelector('.main').innerHTML = arr.items.map(film => {
        return `<div class="movie">
        <img class="movie__img" src=${film.posterUrlPreview} alt="movie_img">
        <div class="movie_info">
        <h2 class="movie__title">${film.nameRu}</h2>
          <span class="movie__rating">${film.rating || film.ratingKinopoisk || ''}</span></div>
          <button class="movie__button">${film.kinopoiskId}</button>
        </div>`}).join('')
      const rating = document.querySelectorAll('.movie__rating')
      rating.forEach(rating => {
        (rating.innerText < 6) ? rating.classList.add('red') : rating.classList.add('green')
      })
      const btns = document.querySelectorAll('.movie__button');
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filmId = e.target.textContent;
          getFilmById(filmId);
          getReviews(filmId);
        })
      })
    }
    const searchInput = document.querySelector('.search');
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value;
      console.log(keyword);
      getFilmsByKeyword(keyword);

    })

    const options = document.querySelectorAll('.option');
    options.forEach((option,) => {
      if (option.value === 'all') {
        createEl(topMovie)
      } else if (option.value === 'rating') {
        createEl(topMovie.items.sort((a, b) => b.rating - a.rating))
      } else if (option.value === 'release') {
        createEl(topMovie.items.sort((a, b) => new Date(b.premiereAt) - new Date(a.premiereAt)))

      }
    });

    async function getFilmById(filmId) {
      const response2 = await fetch(apiUrlFindById + filmId, { headers: { 'accept': 'application/json', 'X-API-KEY': apiKey } })
      const findById = await response2.json()
      document.querySelector('.main').innerHTML = `
                    <div class="main__window-wrapper">
                        <img class="main__window-close" src="/Close.svg" alt="Закрыть описание">
                        <section class="main__window-poster">
                            <img src="${findById.posterUrl}" alt="${findById.nameRu}">
                        </section>
                        <section class="main__window-parameters">
                            <p class="main__card-name">${findById.nameRu}</p>
                            <p class="main__year-of-production">Год выпуска: ${findById.year}</p>
                            <p class="main__country">Страна:  ${findById.countries.map(countries => countries.country)}</p>
                            <p class="main__description"> Описание: <br/> ${findById.description}</p>
                           <p>Отзывы:</p>
                        </section>
                    </div>`
      const btn = document.querySelector('.main__window-close');
      btn.addEventListener('click', () => {
        getTopMovies();
        getReviews();
      })
    }
    async function getReviews() {
      const response4 = await fetch(apiReviews + filmId + '/reviews', { headers: { 'accept': 'application/json', 'X-API-KEY': apiKey } })
      const reviews = await response4.json()
      console.log(reviews);
    }

    async function getFilmsByKeyword(keyword) {
      const response3 = await fetch(apiUrlKeyword + keyword, { headers: { 'accept': 'application/json', 'X-API-KEY': apiKey } })
      const byKeyword = await response3.json()
      document.querySelector('.main').innerHTML = byKeyword.films.map(film => {
        return `<div class="movie">
        <img class="movie__img" src=${film.posterUrlPreview} alt="movie_img">
        <div class="movie_info">
        <h2 class="movie__title">${film.nameRu}</h2>
          <span class="movie__rating">${film.rating || film.ratingKinopoisk || ''}</span></div>
          <button class="movie__button">${film.filmId}</button>
        </div>`}).join('')
      const rating = document.querySelectorAll('.movie__rating')
      rating.forEach(rating => {
        (rating.innerText < 6) ? rating.classList.add('red') : rating.classList.add('green')
      })
      const btns = document.querySelectorAll('.movie__button');
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filmId = e.target.textContent;
          getFilmById(filmId);
        })
      })
    }

  } catch {
    console.error('Error:', error);
    document.querySelector('.main').innerHTML = 'Ошибка при загрузке информации о фильмах!';
  }






}
getTopMovies(); 