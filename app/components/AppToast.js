export default class AppToast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#fadeIn(newValue);
    this.#fadeOut(newValue);
  }

  connectedCallback() {
    this.render();
    this.$toast = this.shadowRoot.querySelector(".toast");
  }

  disconnectedCallback() {
    clearInterval(this.timeout);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .toast {
          background: linear-gradient(
            to left bottom,
            var(--clr-accent),
            color-mix(in srgb, var(--clr-accent) 85%, transparent)
          );
          font-family: var(--ff-main);
          font-size: .925rem;
          color: #fff;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          border-radius: 7px;
          padding-inline: 2rem;
          padding-block: 1.25rem;
          margin-inline: 1rem;
          margin-block: 1rem;
          opacity: 0;
          visibility: hidden;
          transition:
            translate .3s ease-in-out,
            opacity .3s ease-in-out,
            visibility .3s ease-in-out;
          translate: 0 2px;
          position: sticky;
          bottom: 1vh;
          left: 100vw;

          &.active {
            translate: 0 -2px;
            opacity: 1;
            visibility: visible;
          }
        }
      </style>
      <div class="toast">Form submited succesfully!</div>
    `;
  }

  #fadeIn(isActive) {
    this.$toast.classList.toggle("active", isActive !== null);
  }

  #fadeOut(isActive) {
    if (isActive === null) return;

    this.timeout = setTimeout(() => {
      this.$toast.classList.toggle("active");
      this.removeAttribute("active");
    }, 2000);
  }
}

customElements.define("app-toast", AppToast);
