// Autonomous Element
class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);
    this._tooltipText = "Some dummy tooltip text";

    // Set up shadow DOM
    this.attachShadow({ mode: "open" });

    // Set up template inside shadow root
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: orange;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
          color: white;
          font-weight: normal;
          left: 0.75rem;
          padding: 0.15rem;
          position: absolute;
          top: 2rem;
          z-index: 10;
        }

        :host {
          position: relative;
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
          border-radius: 50%;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
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

    this._tooltipIcon = this.shadowRoot.querySelector("span");

    this._tooltipIcon.addEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.addEventListener("mouseleave", this._hideTooltip);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue) {
      return;
    }

    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  // Clean up work
  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("uc-tooltip", Tooltip);
