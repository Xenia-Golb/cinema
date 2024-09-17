import './style.css'
import { TOKEN } from './cinema.js'


const body = document.querySelector('body');
body.innerHTML = `
   <header>
    <form id="form">
      <!-- <label for="search">Search:</label> -->
      <input type="text" id="search" class="search" placeholder="Search..." />
    </form>
  </header>
  <main>
    <div class="movie">
      <img src="" alt="movie_img">
      <div class="movie_info">
        <h2 class="movie__title">lll</h2>
        <span class="movie__rating red">5.5</span>
      </div>
    </div>
  </main>
`


