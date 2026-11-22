import cleanHTML from "../helpers/cleanHTML.js";

export default class AppSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector(".search")
      .addEventListener("search", (e) => this.search(e));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .search {
          border: 1px solid #f1f1f9;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, .04), 0 2px 8px 0 rgba(0, 0, 0, .06);
          padding-inline: 1rem;
          padding-block: 0.75rem;
          border-radius: 9999px;
          font-family: var(--ff-main);

          &::placeholder {
            font-family: var(--ff-main);
            color: #B3B3B3;
          }

          &:focus {
            outline-color: var(--clr-accent);
          }
        }
      </style>
      <input class="search" type="search" placeholder="e.g. Batman">
    `;
  }

  search(e) {
    if (e.target.value.trim().length > 0) {
      const query = encodeURIComponent(cleanHTML(e.target.value.trim()));
      location.hash = `#/shows/search?q=${query}`;
    }
  }
}

customElements.define("app-search", AppSearch);
