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
            events: {
            },
            styles: {},
            template: "",
            classes: []
        }, props)
        

        if (this.hasAttribute("events")) {
            buttonProps.events = eval(`(${this.getAttribute("events")})`)
        }
        if (this.hasAttribute("styles")) {
            buttonProps.styles = eval(`(${this.getAttribute("styles")})`)
        }
        if (this.hasAttribute("classes")) {
            buttonProps.classes = eval(`(${this.getAttribute("classes")})`)
        }
        console.log(this.innerHTML)
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
        for (let name in styles) {
            const styleSheet = this.shadowRoot.querySelector("style");

            styleSheet.innerHTML += `
                :host {
                    ${name}: ${styles[name]};
                }

            `
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
}

customElements.define('custom-button', ButtonComponent)


const b = new ButtonComponent({
    styles: {
        "background-color": "red",
        
    },
    events: {
        click: () => {
            alert('click')
        }
    },
    text: "Hola muchachos",
    styles: ["btn"]
})