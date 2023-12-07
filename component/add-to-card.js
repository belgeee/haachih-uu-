class AddToCard extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <button>Add to Favourite</button>
        `;
    }

    connectedCallback() {
        this.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const planInfoDiv = this.closest('.PlanInfo');
                console.log(this.parentNode.childNodes[1].textContent.trim())
                const list = document.querySelector("later-comp");
                const json = {
                    "title": this.parentNode.childNodes[1].textContent.trim(),
                    "image": "../zurag/chili.jpg",
                    "tag": planInfoDiv.querySelector('h3').textContent.trim(),
                    "location": planInfoDiv.querySelector('address').textContent.trim(),
                    "buttonText": planInfoDiv.querySelector('a button').textContent.trim(),
                    "unit": 1
                };
                list.addToCart(json);
            }
        });
    }
    
}

window.customElements.define('add-to-card', AddToCard);
