import ContactForm from "./ContactForm.js";

export default class ViewContact extends HTMLElement {
  name = "contact";

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

        main {
          width: min(100%, 90rem);
          margin-inline: auto;
          margin-block: 2rem;
          padding-inline: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: calc(100vh - 20rem);
        }

        .title {
          font-family: var(--fs-subtitle);
          font-family: var(--ff-header);
          margin-block-end: .5rem;
          color: var(--clr-primary);
        }

        .form-container {
          display: flex;
          gap: 1rem;

          & > * {
            flex: 1;
          }
        }


        .form-img {
          img {
            display: block;
            margin-inline: auto;
            max-width: 22rem;
          }
        }
      </style>
      <main>
        <h2 class="title">Contact</h2>
        <section class="form-container">
          <contact-form></contact-form>
          <div class="form-img">
            <img src="./app/assets/img/form.png" alt="">
          </div>
        </section>
      </main>
    `;
  }
}

customElements.define("view-contact", ViewContact);
