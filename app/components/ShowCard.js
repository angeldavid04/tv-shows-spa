export default class ShowCard extends HTMLElement {
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
          max-width: 280px;
          min-height: 420px;
        }
        
        a {
          text-decoration: none;
        }
        
        .card {
          background-color: var(--clr-card-surface);
          border-radius: 8px;
          border: 1px solid #f1f1f9;
          display: flex;
          flex-direction: column;
          gap: .5rem;
          overflow: hidden;
          box-shadow: 0 4px 10px 0 rgba(0, 0, 0 , 0.10);
          transition: translate 0.2s ease-in-out;

          &:hover {
            translate: 0 -1.5%;
          }
 
          .card-content {
            margin-block: .75rem 1.25rem;
            margin-inline: .75rem;
            min-height: 4rem;
          }
          
          ::slotted([slot="img"]) {
            width: 280px;
            height: 420px;
            object-fit: cover;
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
        }

      </style>
      <a href="${this.getAttribute("url") ?? "404"}">
        <article class="card">
          <slot name="img"></slot>
          <div class="card-content">
            <slot name="title"></slot>
            <slot name="previous"></slot>
          </div>
        </article>
      </a>
    `;
  }
}

customElements.define("show-card", ShowCard);
