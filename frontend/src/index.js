import "bulma/css/bulma.min.css";
import 'htmx.org';

// Component with no shadow root
class NavMenu extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("nav-menu-templ");
        let templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(document.importNode(templateContent, true));
    }

    setActiveMenu(elementId) {
        console.log("Clicked elementId")
    }
}

customElements.define(
    "my-nav-menu", NavMenu
)