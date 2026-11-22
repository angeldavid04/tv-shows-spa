export default class ShowCardSkeleton extends HTMLElement {
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
 
          .card-content {
            margin-block: .75rem 1.25rem;
            margin-inline: .75rem;
            min-height: 4rem;
          }
          
          .img {
            width: 280px;
            height: 420px;
            background-color: rgba(0, 0, 0, 0.08);
          }

          .title {
            height: 1rem;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.08);
            border-radius: 4px;
            margin-block-end: 0.25rem;
          }
          
          .previous {
            height: 1rem;
            width: 40%;
            background-color: rgba(0, 0, 0, 0.08);
            border-radius: 4px;
          }
        }

      </style>
      <article class="card">
        <div class="img"></div>
        <div class="card-content">
          <div class="title"></div>
          <div class="previous"></div>
        </div>
      </article>
    `;
  }
}

customElements.define("show-card-skeleton", ShowCardSkeleton);
