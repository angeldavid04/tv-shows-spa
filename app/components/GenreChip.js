export default class GenreChip extends HTMLElement {
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

        .chip {
          width: fit-content;
          display: inline-block;
          padding-inline: 0.5rem;
          padding-block: 0.25rem;
          background-color: #f1f5f9;
          color: #334155;
          font-size: 0.875rem;
          font-family: var(--ff-main);
          border-radius: 8px;
        }
      </style>
      <span class="chip">${this.getAttribute("genre")}</span>
    `;
  }
}

customElements.define("genre-chip", GenreChip);
