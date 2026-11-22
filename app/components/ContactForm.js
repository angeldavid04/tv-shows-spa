import AppToast from "./AppToast.js";

export default class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.$form = this.shadowRoot.getElementById("form");
    this.$toast = this.shadowRoot.getElementById("toast");
    this.$form.addEventListener("submit", this.submit.bind(this));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :focus {
          outline-color: var(--clr-accent);
        }

        form {
          display: flex;
          flex-direction: column;
          padding-block: 1rem;
          padding-inline: 1.25rem;
          background-color: #fff;
          border: 1px solid #d9d9d9;
          border-radius: 8px;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: .5rem;

          label, input, textarea {
            font-family: var(--ff-main);
          }

          input, textarea {
            border: 1px solid #d9d9d9;
            padding: .5rem;
            border-radius: 8px;
          }
          
          textarea {
            resize: vertical;
          }
        }

        button[type="submit"] {
          padding-block: .75rem;
          font-family: var(--ff-main);
          color: #fff;
          background-color: var(--clr-accent);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity .2s ease-in-out, translate .2s ease-in-out;

          &:hover {
            opacity: .75;
            translate: 0 -4px;
          }
        }
      </style>
      <form id="form">
        <div class="input-group">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="e.g. John Doe">
        </div>
        <div class="input-group">
          <label for="">Email</label>
          <input type="email" placeholder="e.g. john_doe@email.com">
        </div>
        <div class="input-group">
          <label for="">Message</label>
          <textarea name="" id="" rows="4" placeholder="e.g. Thanks for the shows info!"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <app-toast id="toast"></app-toast>
    `;
  }

  submit(e) {
    e.preventDefault();
    this.$toast.setAttribute("active", "");
  }
}

customElements.define("contact-form", ContactForm);
