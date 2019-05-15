// Autonomous Element
class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);
  }

  // Method that gets executed after the element is attached to the DOM
  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip);
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip);
    this.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = "This is the tooltip text";
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);
