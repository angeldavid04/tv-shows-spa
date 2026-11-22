import ajax from "../helpers/ajax.js";

export default class SingleShowSkeleton extends HTMLElement {
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
          --clr-gray: rgba(0, 0, 0, 0.08);

          font-family: var(--ff-main);
          color: var(--clr-primary-text);
        }

        h2 {
          font-family: var(--ff-header);
          margin-bottom: 1rem;
          color: var(--clr-secondary);
        }

        h3 {
          color: var(--clr-primary);
          margin-bottom: .5rem;
        }
        
        .container {
          display: flex;
          gap: 2rem;
          margin-block: 2rem;
          margin-inline: auto;
          padding-block: 2rem;
          padding-inline: 2rem;
          width: min(100%, 90rem);
          height: calc(100dvh - 200px);
          background-color: #fff;
          
          & > * {
            flex: 1;
          }
        }

        .card {
          background-color: #fff;
          border: 1px solid #f1f1f1;
          padding-block: 0.75rem;
          padding-inline: 1.5rem;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.02);
          border-radius: 8px;
        }

        .img {
          width: 300px;
          height: 460px;
          background-color: var(--clr-gray);
        }
        
        .img-episode {
          background-color: var(--clr-gray);
        }

        .card.episodes {
          display: flex;
          flex-direction: column;
          gap: .5rem;

          .episode {
            display: flex;
            width: 368px;
            height: 98px;
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.08);

            .content {
              display: grid;
              gap: .25rem;
              padding-inline: .5rem;
              padding-block: .5rem;

              .line:first-child {
                
              }

              div {
                font-size: 0.875rem;
                display: flex;
                justify-content: space-between;
                color: #445876;
              }
            }

            & > * {
              flex: 1;
            }
          }
        }

        .title {
          height: 1.25rem;
          width: 100%;
          background-color: var(--clr-gray);
          border-radius: 4px;
          margin-block-end: 0.5rem;
        }
        
        .line {
          height: 1rem;
          width: 100%;
          background-color: var(--clr-gray);
          border-radius: 4px;
          margin-block-end: 0.25rem;
        }

        .card-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: .5rem;
          color: var(--clr-secondary-text);
          font-family: var(--ff-main);
        }

        .small-skel {
          height: 1rem;
          width: 100%;
          background-color: var(--clr-gray);
          border-radius: 4px;
          margin-block-end: 0.25rem;
          display: inline-block;
        }

        .chips {
          display: flex;
          gap: 0.25rem;
          margin-block-end: .5rem;
        }
      </style>
      <div class="container">
        <div class="col">
          <h2>Stranger Things</h2>
          <div class="img"></div>
        </div>
        <div class="card-container">
          <div class="card">
            <div class="title"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div class="card">
            <div class="title"></div>
            <div class="chips">
              <div class="small-skel"></div>
              <div class="small-skel"></div>
              <div class="small-skel"></div>
            </div>
            <div class="rating">
              <img src="./app/assets/img/star-filled.png" alt="rating">
              <p>4</p>
            </div>
          </div>
        </div>
        <div class="card episodes">
          <h3>Episodes</h3>
          <article class="episode">
            <div class="img-episode"></div>
            <div class="content">
              <div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </article>
          <article class="episode">
            <div class="img-episode"></div>
            <div class="content">
              <div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </article>
          <article class="episode">
            <div class="img-episode"></div>
            <div class="content">
              <div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </article>
        </div>
      </div>  
    `;
  }
}

customElements.define("single-show-skeleton", SingleShowSkeleton);
