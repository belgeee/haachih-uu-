import { FavouriteList } from '../jsmodule/fav-plan-rend.js';

class FavouriteListComponent extends HTMLElement {
    constructor() {
        super();
        this.listsPlan = [];
        this.returnPlanValue = "";
        this.favPlanNum = 0;
        this.listPlanJSON = []; 
        this.render_count();
    }
    render_count() {
        if(!JSON.parse(localStorage.getItem('listsPlan'))){
                this.favPlanNum = 0;
        }
        this.innerHTML = `
                    <a class="navSearch" href="./like.html">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    </a>
                 <div class="count" id="count"><span>${this.favPlanNum}</span></div>
        `;
    }


    addToCart(myProductPlan) {
        
        // console.log(myProductPlan);
        // this.listsPlan.push(myProductPlan);
        // const product = new FavouriteList(myProductPlan);
        // this.listPlanJSON.push(myProductPlan);
        // localStorage.setItem("listsPlan", JSON.stringify(this.listPlanJSON));
        // this.favPlanNum++;
        
        const isDuplicate = this.listPlanJSON.some((existingProduct) => existingProduct.title === myProductPlan.title);
        if (!isDuplicate) {
            this.listsPlan.push(myProductPlan);
            this.listPlanJSON.push(myProductPlan);
            localStorage.setItem("listsPlan", JSON.stringify(this.listPlanJSON));
            this.favPlanNum++;
            // this.returnPlanValue += product.render_later_list(); 
            console.log(this.listsPlan)
            window.alert("successfully, You added "+this.favPlanNum+" plans");
        } else {
            window.alert(`You alread added "${myProductPlan.title}" in your favourite.`);
        }
        this.render_count();
    }

    
    jsonToCard() {
        console.log(localStorage);
        const plansContainer = document.querySelector(".plans");
        plansContainer.innerHTML = '';
        if (JSON.parse(localStorage.getItem("listsPlan"))) {
            const listsPlan = JSON.parse(localStorage.getItem("listsPlan"));
            for (const data of listsPlan) {
                const product = new FavouriteList(data);
                this.returnPlanValue += product.render_plan_list();
            }
            document.querySelector(".plans").insertAdjacentHTML("beforeend", this.returnPlanValue);
            
        }else{
            if (plansContainer) {
                plansContainer.innerHTML = `<h2 class="baihgui">Here is no plans.</h2>`;
            }
        }
    }
    connectedCallback() {
        if (localStorage.getItem("listsPlan")) {
            this.listPlanJSON = JSON.parse(localStorage.getItem("listsPlan"));
            this.favPlanNum = this.listPlanJSON.length;
        } else {
            this.listPlanJSON = [];
        }
        this.render_count();
        this.jsonToCard();
    }

    get productPlanCount() {
        return this.favPlanNum;
    }
}

window.customElements.define("favourite-plan", FavouriteListComponent);
