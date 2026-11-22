export default class ShowSynopsis extends HTMLElement {
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

        .synopsis {
          color: var(--clr-primary);
          padding-block: .75rem 1.25rem;
          padding-inline: .75rem;

          h3 {
            font-family: var(--ff-header);
            font-size: var(--fs-card-title);
            margin-block-end: .25rem
          }

          p {
            font-family: var(--ff-main);
            color: var(--clr-primary-text);
            line-height: 1.5;
          }
        }
      </style>
      <div class="synopsis">
        <h3 part="title">Synopsis</h3>
        <div part="content">
          <p>${this.content}</p>  
        </div>
      </div>
    `;
  }

  get content() {
    const $p = document.createElement("p");
    $p.innerHTML = this.getAttribute("content");

    return this.summary($p);
  }

  summary(pNode, maxLength = 150) {
    if (!pNode || !pNode.textContent) return "";

    const text = pNode.textContent.trim();

    if (text.length <= maxLength) return text;

    let summaryText = text.substring(0, maxLength);

    const lastDot = summaryText.lastIndexOf(".");
    if (lastDot > maxLength * 0.4) {
      return text.substring(0, lastDot + 1);
    }

    const lastSpace = summaryText.lastIndexOf(" ");
    if (lastSpace !== -1) {
      summaryText = summaryText.substring(0, lastSpace);
    }

    // 3. Limpiamos caracteres de puntuación sueltos al final (como comas, puntos y comas o espacios)
    // para evitar que el resumen termine con una coma volando.
    summaryText = summaryText.replace(/[,;:\s]+$/, "");

    // Añadimos los puntos suspensivos y envolvemos en un p
    return /* html */ `<p>${summaryText}...</p>`;
  }
}

customElements.define("show-synopsis", ShowSynopsis);
