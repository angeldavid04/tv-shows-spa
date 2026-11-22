export default class NotFound extends HTMLElement {
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
          display: flex;
        }
        
        main {
          margin: auto;
          padding-block: 2rem;
          padding-inline: 2rem;
          display: grid;
          gap: .5rem;
          max-width: 90rem;
        }

        h2 {
          font-family: var(--ff-header);
          font-size: var(--fs-header);
          color: var(--clr-secondary);
        }
        
        p {
          font-family: var(--ff-main);
          max-width: 30ch;
          line-height: 1.5;
          text-wrap: pretty;
        }

        img {
          margin-block-start: 1.5rem;
          width: 20rem;
          max-width: 100%;
        }
      </style>
      <main>
        <h2>404: Not Found</h2>
        <p>The resource you are trying to access does not exist.</p>
        <img src="app/assets/img/error.png" alt="">
      </main>
    `;
  }
}

customElements.define("not-found", NotFound);
