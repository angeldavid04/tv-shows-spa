import API from "../helpers/api.js";
import ajax from "../helpers/ajax.js";
import ShowSearchCard from "./ShowSearchCard.js";
import GenreChip from "./GenreChip.js";
import cleanHTML from "../helpers/cleanHTML.js";

const altImage =
  "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

export default class ShowsSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.$container = this.shadowRoot.querySelector(".card-container");
    this.populateCards();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          p {
            color: var(--clr-primary-text);
          }

          img {
            max-width: 100%;
            width: 24rem;
            height: auto
          }
          
          .card-container {
            padding-block: 2rem;
            display: grid;
            width: min(100%, 90rem);
            gap: 2rem;
            padding-inline: 2rem;
            margin-inline: auto;
          }

          .no-results {
            padding-block: 2rem;
            padding-inline: 2rem;
            margin-inline: auto;

            h2 {
              font-family: var(--ff-header);
              color: var(--clr-secondary);
            }

            p {
              font-family: var(--ff-main);
              margin-block-end: 2rem;
              max-width: 40ch;
              text-wrap: pretty;
            }
          }
        </style>
        <main>
          <section class="card-container">
          </section>
        </main>
      `;
  }

  async populateCards() {
    const query = this.params.get("q");
    const shows = await ajax(`${API.SEARCH_SHOW}${query}`);
    console.log(shows);
    const cards = shows.map((props) => this.createCard(props)).join("");

    if (!cards) {
      this.$container.innerHTML = /* html */ `
        <div class="no-results">
          <h2>Results not found</h2>
          <p class="message">${`Sorry, there are no results for the search "${cleanHTML(query)}"`}</p>
          <img src="./app/assets/img/no-results.png" alt="no results">
        </div>
      `;
      return;
    }

    this.$container.innerHTML = cards;
  }

  populateGenres(genres) {
    if (!genres) return "";

    return genres.map((genre) => this.createChip(genre)).join("");
  }

  createChip(genre) {
    return /*html*/ `
      <genre-chip genre="${genre}"></genre-chip>  
    `;
  }

  createCard(props) {
    const { show } = props;

    return /* html */ `
      <show-search-card url="#/shows/${show.id}" rating="${show.rating?.average ?? "?"}" premiered="${show.premiered}" status="${show.status}" synopsis="${show.summary}">
        <img slot="img" src="${show.image?.original || altImage}" alt="${show.name}" loading="lazy">
        <h2 slot="title">${show.name ?? "Sin nombre"}</h2>
        <div slot="genres">${this.populateGenres(show?.genres)}</div>
      </show-search-card>
    `;
  }
}

customElements.define("shows-search", ShowsSearch);
