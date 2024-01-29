export default class ButtonComponent extends HTMLElement {
    #events;
    #styles;
    #text;

    /**
     * 
     * @param {Object} events
     * @param {Object} styles
     * @param {} 
     */
    constructor(props) {
        super();
        const p = Object.assign({
            events: {
                click: () => {alert("default click event")}
            },
            styles: {},
            text: ""
        }, props)
        this.attachShadow({mode: "open"})

        this.#events = p.events;
        this.#styles = p.styles;
        this.#text = p.text;
        
    }
    
    connectedCallback() {
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
        if (this.innerText == "") {
            this.shadowRoot.innerHTML = `${this.#text}`
        }   
    }

    static observedAttributes = [];

    attributeChangeCallback(name, newVal, oldVal) {

    }

    addStyles(styles) {
        for (let name in styles) {
            this.style[name] = styles[name];
        }
    }

    addEvents(events) {
        for (let name in events) {
            this.addEventListener(name, events[name]);
        }
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
    text: "Hola muchachos"
})
document.body.appendChild(b)    