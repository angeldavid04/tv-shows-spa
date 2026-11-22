import PeopleCard from "./PeopleCard.js";

export default class ViewPeople extends HTMLElement {
  name = "people";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.populateCards();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      </style>
      <main>
        <h2>People</h2>
        <section class="people-cards">
          <people-card></people-card>
        </section>
      </main>
    `;
  }

  async populateCards() {}
}

customElements.define("view-people", ViewPeople);
