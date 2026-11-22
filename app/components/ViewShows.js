import ShowCard from "./ShowCard.js";
import ShowCardSkeleton from "./ShowCardSkeleton.js";
import ErrorMessage from "./ErrorMessage.js";
import ajax from "../helpers/ajax.js";
import API from "../helpers/api.js";

const altImage =
  "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

export default class ViewShows extends HTMLElement {
  name = "shows";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
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
        
        .card-container {
          padding-block: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          grid-gap: 42px 12px;
          justify-items: center;
          width: min(100%, 90rem);
          padding-inline: 2rem;
          margin-inline: auto;
        }
      </style>
      <main>
        <section class="card-container">
          ${"<show-card-skeleton></show-card-skeleton>".repeat(8)}
        </section>
      </main>
    `;
  }

  async populateCards() {
    try {
      const shows = await ajax(`${API.SHOWS}?page=0`);
      const cards = shows.map(this.createCard).join("");
      this.shadowRoot.querySelector(".card-container").innerHTML = cards;
    } catch (err) {
      this.renderError(err);
    }
  }

  createCard(show) {
    return /* html */ `
      <show-card url="#/shows/${show.id}">
        <img slot="img" src="${show.image?.original || altImage}" alt="${show.name}" loading="lazy">
        <h2 slot="title">${show.name}</h2>
        <p slot="previous">${show._links?.previousepisode?.name ?? ""}</p>
      </show-card>
    `;
  }

  renderError(err) {
    this.shadowRoot.querySelector(".card-container").innerHTML = "";
    this.shadowRoot.innerHTML = /* html */ `
      <error-message></error-message>
    `;
  }
}

customElements.define("view-shows", ViewShows);
