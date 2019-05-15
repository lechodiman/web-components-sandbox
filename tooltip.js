// Autonomous Element
class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);
    this._tooltipText = "Some dummy tooltip text";

    // Set up shadow DOM
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<slot>Some Default</slot><span> (?)</span>";

    // template
    // const template = document.querySelector("#tooltip-template");
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Method that gets executed after the element is attached to the DOM
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const tooltipIcon = this.shadowRoot.querySelector("span");

    tooltipIcon.addEventListener("mouseenter", this._showTooltip);
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip);

    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);
