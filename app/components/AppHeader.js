import AppSearch from "./AppSearch.js";
import AppMenu from "./AppMenu.js";

export default class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    const view = localStorage.getItem("view");
    const $link = this.shadowRoot.querySelector(`app-menu a#${view}`);
    $link && $link.classList.add("active");
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
          display: block;
          width: 100%;
          background-color: #fff;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
        }
        
        .header {
          margin-inline: auto;
          min-height: 6.375rem;
          width: min(100%, 90rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-inline: 2rem;
          padding-block: 0.625rem;

          .title, .title a {
            font-family: var(--ff-header);
            font-size: var(--fs-header);
            color: var(--clr-accent);
            text-decoration: none;
          }
        }

        app-menu a {
          font-size: var(--fs-link);
          font-family: var(--ff-main);
          text-decoration: none;
          color: var(--clr-primary-text);
          font-weight: 600;

          &:hover, &.active {
            text-decoration: underline .15em var(--clr-accent);
          }

          @media (width <= 800px) {
            font-size: 1.5rem;
          }
        }
        
        
        @keyframes fade-in {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }
      </style>
      <header class="header">
        <h1 class="title"><a href="#">TVShows</a></h1>
        <app-menu>
          <ul>
            <li><a id="shows" href="#/shows">Shows</a></li>
            <li><a id="people" href="#/people">People</a></li>
            <li><a id="contact" href="#/contact">Contact</a></li>
          </ul>
        </app-menu> 
      </header>
      `;
  }
}

customElements.define("app-header", AppHeader);
