import ajax from "../helpers/ajax.js";
import SingleShowSkeleton from "./SingleShowSkeleton.js";

export default class ViewShow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.getShow();
    this.renderSkeleton();
    /* if (this.showData) {
      this.render();
    } else {
      this.renderSkeleton();
    } */
  }

  renderSkeleton() {
    this.shadowRoot.innerHTML = /* html */ `
      <single-show-skeleton></single-show-skeleton>
    `;
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

        .chips {
          margin-block-end: .5rem;
        }
      </style>
      <div class="container">
        <div class="col">
          <h2>Stranger Things</h2>
          <img src="https://placehold.co/300x460" alt="">
        </div>
        <div class="card-container">
          <div class="card">
            <h3>Synopsis</h3>
            <p>When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.</p>
          </div>
          <div class="card">
            <h3>About</h3>
            <div class="chips">
              <genre-chip genre="Drama"></genre-chip>
              <genre-chip genre="Drama"></genre-chip>
              <genre-chip genre="Drama"></genre-chip>
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
            <div class="img"></div>
            <div class="content">
              <div>
                <p>1x1</p>
                <p>15 jul 2016</p>
              </div>
              <p>Chapter One: The vanishing of Will Byers</p>
            </div>
          </article>
          <article class="episode">
            <div class="img"></div>
            <div class="content">
              <div>
                <p>1x1</p>
                <p>15 jul 2016</p>
              </div>
              <p>Chapter One: The vanishing of Will Byers</p>
            </div>
          </article>
          <article class="episode">
            <div class="img"></div>
            <div class="content">
              <div>
                <p>1x1</p>
                <p>15 jul 2016</p>
              </div>
              <p>Chapter One: The vanishing of Will Byers</p>
            </div>
          </article>
        </div>
      </div>  
    `;
  }

  get showId() {
    return location.hash.split("/").at(-1);
  }

  async getShow() {
    this.showData = await ajax(
      `https://api.tvmaze.com/shows/${this.showId}?embed=episodes`
    );
    /* this.render(); */
  }
}

customElements.define("view-show", ViewShow);
