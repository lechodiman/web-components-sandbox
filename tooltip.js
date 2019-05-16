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

    // Set up template inside shadow root
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 2rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
        }

        :host(.important) {
          background: var(--color-primary, #ccc);
          padding: 0.15rem;
        }

        :host-context(p) {
          font-weight: bold;
        }

        ::slotted(.highlight) {
          border-bottom: 1px solid red;
        }

        .icon {
          background: black;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>  
    
      <!-- Slots project content from the DOM into the shadow DOM, it does not move the element but just projects it -->

      <slot>Some Default</slot>
      <span class="icon">?</span>
    `;
  }

  // Method that gets executed after the element is attached to the DOM, so if you do DOM manipulations on the element itself, you do it here
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
