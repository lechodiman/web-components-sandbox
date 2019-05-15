// Extending specific element
class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", event => {
      if (!confirm("Do you really want to leave")) {
        event.preventDefault();
      }
    });
  }
}

// When extending an specific element, we add it as third argument
customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });
