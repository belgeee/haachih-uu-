class FavouriteCount extends HTMLElement {
    constructor() {
        super();
        this.sum = 0;
        this.update();

    }

    connectedCallback() {
       this.update();
    }

    update() {
        this.calculate(); 
        this.render();
    }
    calculate(){
        const FavouritePlace = document.querySelector('favourite-place');
        const FavouritePlan = document.querySelector('favourite-plan');

        let numberValue = 0;
        let numberValue2 = 0;

        if (FavouritePlace) {
            const countElement = FavouritePlace.querySelector('.countPlace span');
            if (countElement) {
                numberValue = parseInt(countElement.textContent, 10);
            }
        }

        if (FavouritePlan) {
            const countElement2 = FavouritePlan.querySelector('.count span');
            if (countElement2) {
                numberValue2 = parseInt(countElement2.textContent, 10);
            }
        }

        this.sum = numberValue + numberValue2;
    }

    render() {

        this.innerHTML = `
            <div class="count" id="count"><span>${this.sum}</span></div>
        `;
    }
}

window.customElements.define('favourite-count', FavouriteCount);
