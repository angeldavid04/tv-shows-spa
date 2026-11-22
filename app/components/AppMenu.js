export default class AppMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.toggleMenu();
  }

  connectedCallback() {
    this.render();
    this.$btn = this.shadowRoot.querySelector(".hamburger-btn");
    this.$menu = this.shadowRoot.querySelector(".menu");
    this.$btn.addEventListener("click", (e) => this.toggleAttribute("open"));
    this.closest("ul");
    console.log;
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        this.removeAttribute("open");
        const $links = e.target.closest("ul").querySelectorAll("a");
        $links.forEach(($a) => $a.classList.remove("active"));
        e.target.classList.add("active");
      }
    });

    this.shadowRoot.addEventListener("search", (e) => {
      this.removeAttribute("open");
    });

    // Clean aria in resize
    matchMedia("(width > 800px)").addEventListener(
      "change",
      this.cleanAria.bind(this)
    );
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <link href="https://cdn.jsdelivr.net/npm/hamburgers@1.2.1/dist/hamburgers.min.css" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :host {
          display: flex;
          align-items: center;
        }

        .menu {
          display: flex;
          align-items: center;
          gap: 2.275rem;

          ::slotted(ul) {
            display: flex;
            min-width: 345px;
            list-style: none;
            justify-content: space-evenly;
          }
        }

        .hamburger-btn {
          display: none;
          z-index: 3;
        }
        
        @keyframes fade-in {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @media (width <= 800px) {
          .hamburger-btn {
            display: block;
          }
          
          .menu {
            padding-block-start: 2rem;
            flex-direction: column;
            translate: -100% 0;
            position: absolute;
            z-index: 2;
            font-size: 5rem;
            background-color: #fff;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            transition: translate 0.3s ease-in-out;
          }
          
          .menu.active {
            translate: 0 0;
          }
          
          ::slotted(ul) {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        }
      </style>
      <button slot="btn" class="hamburger hamburger--spring hamburger-btn" type="button" aria-expanded="false" aria-label="Open menu">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <nav class="menu">
        <app-search></app-search>
        <slot></slot>
      </nav>
      `;
  }

  toggleMenu() {
    if (this.hasAttribute("open")) {
      document.body.classList.add("on-menu");
      this.$menu.classList.add("active");
      this.$btn.classList.add("is-active");
    } else {
      document.body.classList.remove("on-menu");
      this.$menu.classList.remove("active");
      this.$btn.classList.remove("is-active");
    }

    this.$btn.setAttribute("aria-expanded", this.hasAttribute("open"));
    this.$btn.setAttribute(
      "aria-label",
      this.hasAttribute("open") ? "Close menu" : "Open menu"
    );
  }

  cleanAria() {
    if (matchMedia("(width > 800px)")) {
      document.body.classList.remove("on-menu");
      this.$menu.classList.remove("active");
      this.$btn.classList.remove("is-active");
      this.$btn.removeAttribute("aria-label");
      this.$btn.removeAttribute("aria-expanded");
    } else {
      document.body.classList.remove("on-menu");
      this.$menu.classList.remove("active");
      this.$btn.classList.remove("is-active");
      this.$btn.setAttribute("aria-label");
      this.$btn.setAttribute("aria-expanded");
    }
  }
}

customElements.define("app-menu", AppMenu);
