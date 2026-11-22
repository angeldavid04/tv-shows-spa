import ShowSynopsis from "./ShowSynopsis.js";

export default class ShowSearchCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
          width: 100%;
        }

        a {
         text-decoration: none;
         color: initial;
        }

        .card {
          background-color: var(--clr-card-surface);
          border-radius: 8px;
          border: 1px solid #f1f1f9;
          display: flex;
          gap: 1rem;
          overflow: hidden;
          padding-block: 1rem;
          padding-inline: 1rem;
          
          .card-content {
            padding-block: .75rem 1.25rem;
            padding-inline: .75rem;
            min-height: 4rem;
            min-width: 40ch;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex: 1;
          }

          .card-img {
            border-radius: 12px;
            overflow: hidden;
            width: 15rem;
            min-width: 12rem;
            height: 20rem;
          }

          .rating {
            display: flex;
            align-items: center;
            gap: .5rem;
            color: var(--clr-secondary-text);
            font-family: var(--ff-main);
          }

          .title-container {
            display: grid;
            gap: .25rem;
          }

          .secondary-data {
            font-family: var(--ff-main);
            font-size: 0.875rem;
            color: var(--clr-secondary-text);
          }
          
          ::slotted([slot="img"]) {
            max-width: 100%;
            object-fit: contain;
            display: block;
          }

          ::slotted([slot="title"]) {
            font-family: var(--ff-header);
            color: var(--clr-primary-text);
            font-size: var(--fs-card-title);
          }
          
          ::slotted([slot="previous"]) {
            font-family: var(--ff-main);
            font-size: 0.875rem;
            color: var(--clr-secondary-text);
          }

          ::slotted([slot="genres"]) {
            display: flex;
            gap: .25rem;
            flex-wrap: wrap;
            max-width: 30ch;
          }
        }

        .separator {
          width: 1px;
          background-color: #dfdfdf;
        }
        
        show-synopsis {
          max-width: 60ch;
          flex: 1;
        }

        @media (width <= 900px) {
          show-synopsis, .separator {
            display: none;
          }
        }

        @media (width <= 680px) {
          .card {
            flex-direction: column;
            width: fit-content;
            margin-inline: auto;
            max-width: 18rem;

            .card-content {
              min-width: 0;
            }
            
            .card-img {
              width: 100%;
              height: 100%;
            }
          }
        }
      </style>
      <a href="${this.getAttribute("url") ?? "404"}">
        <article class="card">
          <div class="card-img">
            <slot name="img"></slot>
          </div>
          <div class="card-content">
            <div class="title-container">
              <slot name="title"></slot>
              <span class="secondary-data">${this.premieredYear} · ${this.getAttribute("status")}</span>
            </div>
            <slot name="genres"></slot>
            <div class="rating">
              <img src="./app/assets/img/star-filled.png" alt="rating">
              <p>${this.getAttribute("rating")}</p>
            </div>
          </div>
          <div class="separator"></div>
          <show-synopsis content="${this.getAttribute("synopsis")}"></show-synopsis>
        </article>
      </a>
    `;
  }

  get premieredYear() {
    return this.getAttribute("premiered")?.slice(0, 4) || "N/A";
  }
}

customElements.define("show-search-card", ShowSearchCard);
