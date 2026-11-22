import AppHeader from "./components/AppHeader.js";
import AppRouter from "./components/AppRouter.js";
import ViewShows from "./components/ViewShows.js";
import ViewContact from "./components/ViewContact.js";
import ViewPeople from "./components/ViewPeople.js";
import NotFound from "./components/NotFound.js";
import ShowsSearch from "./components/ShowsSearch.js";
import ViewShow from "./components/ViewShow.js";

export default class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <app-header></app-header>
      <app-router></app-router>
    `;
  }
}

customElements.define("app-root", AppRoot);
