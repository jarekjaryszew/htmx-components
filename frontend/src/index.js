import "bulma/css/bulma.min.css";
import htmx from 'htmx.org';


class GlobCSSTemplElement extends HTMLElement {
    constructor(tpl) {
        super();
        let template = document.getElementById(tpl);
        let templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(document.importNode(templateContent, true));
        const globalStyles = document.querySelectorAll('style'); // or any identifier
        globalStyles.forEach(style => {
            shadowRoot.appendChild(style.cloneNode(true));
        })
    }

        connectedCallback() {
        // htmx does not auto-scan shadow roots; process this component root explicitly.
        if (htmx && typeof htmx.process === 'function') {
            htmx.process(this.shadowRoot);
        }
    }
}

// Component with no shadow root
class NavMenu extends GlobCSSTemplElement {
    constructor() {
        super("nav-menu-templ");
        const menuElems = this.shadowRoot.querySelectorAll('a');
        menuElems.forEach(item => item.addEventListener('click', event => this.setActiveMenu(event)));
    }

    setActiveMenu(event) {
        const menuItems = this.shadowRoot.querySelectorAll('a');
        menuItems.forEach(item => item.classList.remove('is-active'));
        const clickedElement = event.currentTarget;
        clickedElement.classList.add('is-active');
    }
}

customElements.define(
    "my-nav-menu", NavMenu
)

