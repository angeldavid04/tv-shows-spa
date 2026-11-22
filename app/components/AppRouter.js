const routes = {
  "": "view-shows",
  "/": "view-shows",
  "/shows": "view-shows",
  "/people": "view-people",
  "/contact": "view-contact",
  "/shows/search": "shows-search"
};

const showRegex = /^\/shows\/(\d+)$/;

export default class AppRouter extends HTMLElement {
  connectedCallback() {
    window.addEventListener("hashchange", () => this.render());
    this.render();
  }

  render() {
    const [path, qs] = this.getPath();
    const view = routes[path];

    let page;

    if (path.match(showRegex)) {
      page = document.createElement("view-show");
    } else {
      page = document.createElement(view ?? "not-found");
    }

    page.params = new URLSearchParams(qs);
    this.replaceChildren(page);
    localStorage.setItem("view", page.name);
  }

  getPath() {
    return (location.hash.slice(1) || "/").split("?");
  }
}

customElements.define("app-router", AppRouter);
