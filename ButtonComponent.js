/**
 * @typedef {Object} ButtonComponentProps
 * @property {Object} events
 * @property {Object} styles
 * @property {String} template
 * @property {Array} classes
 */
export default class ButtonComponent extends HTMLElement {
    /**
     * @type {Object} 
     */
    #events;
    /**
     * @type {Object}
     */
    #styles;
    /**
     * @type {String}
     */
    #template;
    /**
     * @type {Array}
     */
    #classes 

    /**
     * 
     * @param {ButtonComponentProps} props 
     */
    constructor(props) {
        super();
        /**
         * @type {ButtonComponentProps}
         */
        const buttonProps = Object.assign({
            events: {},
            styles: {},
            template: "",
            classes: []
        }, props)
        
        const attributes = this.getAttributeNames();

        const events = Object.fromEntries(
            Object.entries(this.#filterByPrefix(attributes, "@"))
            .map((pair) => [pair[0], window[pair[1]]])
        )

        const styles = this.#filterByPrefix(attributes, "#");

        if (events)
            Object.assign(buttonProps, {events: events})

        if (styles)
            Object.assign(buttonProps, {styles: styles})

        if (this.innerHTML != "") {
            buttonProps.template = this.innerHTML;
        }

        this.#events = buttonProps.events;
        this.#styles = buttonProps.styles;
        this.#template = buttonProps.template;
        this.#classes = buttonProps.classes; 
    }
    
    connectedCallback() {
        this.attachShadow({mode: "open"});
        const styleSheet = document.createElement("style");
        this.shadowRoot.appendChild(styleSheet);
        
        this.addStyles({ // * Default Styles
            display: "flex",
            margin: "0",
            border: "1px solid #000",
            padding: "10px",
            cursor: "pointer",            
            width: "fit-content",
        });

        this.addStyles(this.#styles);
        this.addEvents(this.#events);
        this.addTemplate(this.#template); 
        this.addClasses(this.#classes); 
    }

    static observedAttributes = [];

    attributeChangeCallback(name, newVal, oldVal) {

    }
    /**
     * 
     * @param {Object} styles 
     */
    addStyles(styles) {
        const styleSheet = this.shadowRoot.querySelector("style");
        for (let name in styles) {
            styleSheet.innerHTML += `
                :host {
                    ${name}: ${styles[name]};
                }`
        }
    }

    addInlineStyles(styles) {
        for (let name in styles) {
            this.style[name] = styles[name];
        }
    }

    addEvents(events) {
        for (let name in events) {
            this.addEventListener(name, events[name]);
        }
    }
    /**
     * 
     * @param {Array} classes 
     */
    addClasses(classes) {
        classes.forEach(className => {
            this.classList.add(className);
        })
    }

    addTemplate(template) {
        this.shadowRoot.innerHTML += `<span>${template}</span>`;
    }

    /**
     * @param {string} text
     */
    set text(text) {
        const spanList = this.shadowRoot.querySelectorAll('span');
        spanList.forEach((span, index) => {
            if (index == 0) {
                span.innerText = text;
                return;
            }
            this.shadowRoot.removeChild(span);
        })
        this.shadowRoot.innerText = text;
    }

    /**
     * 
     * @param {String[]} list 
     * @param {string} prefix 
     * @returns 
     */
    #filterByPrefix(list, prefix) {
        return Object.fromEntries(
            list.filter((element) => element.includes(prefix))
            .map((name) => [name.slice(prefix.length), this.getAttribute(name)])
        )
    }
}

customElements.define('custom-button', ButtonComponent)


const b = new ButtonComponent({
    styles: {
        "background-color": "red",
        
    },
    events: {
        click: (e) => {
            alert('click')
        }, 
        change: (e) => {
            console.log("   ")
        }
    },
    text: "Hola muchachos",
    styles: ["btn"]
})