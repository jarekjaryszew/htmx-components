import "bulma/css/bulma.min.css";
import htmx from 'htmx.org';
import { TemplElement } from './elementBase.js';
import navMenuTemplate from './templates/nav-menu.html';
import tasksViewTemplate from './templates/tasks-view.html'



class NavMenu extends TemplElement {
    constructor() {
        super(navMenuTemplate);
        const menuElems = this.querySelectorAll('a');
        menuElems.forEach(item => item.addEventListener('click', event => this.setActiveMenu(event)));
    }

    setActiveMenu(event) {
        const menuItems = this.querySelectorAll('a');
        menuItems.forEach(item => item.classList.remove('is-active'));
        const clickedElement = event.currentTarget;
        clickedElement.classList.add('is-active');
    }
}

customElements.define(
    "my-nav-menu", NavMenu
)

class TaskView extends TemplElement {
    constructor() {
        super(tasksViewTemplate);
        const menuElems = this.querySelectorAll('a');
        menuElems.forEach(item => item.addEventListener('click', event => this.setActiveMenu(event)));
    }
}

customElements.define(
    "my-tasks-view", TaskView
)

