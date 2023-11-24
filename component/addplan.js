import '../jsmodule/indexPlan.js';

var cart = [];

function addtocart(index) {
  cart.push({ ...itemsInCategory[index] });
  displaycart();
}

function delElement(index) {
  cart.splice(index, 1);
  displaycart();
}

function displaycart() {
  let j = 0,
    total = 0;
  document.getElementById('count').innerHTML = cart.length;

  if (cart.length === 0) {
    document.getElementById('plans').innerHTML = 'Your cart is empty';
  } else {
    document.getElementById('plans').innerHTML = cart.map((items) => {
      const { image, title, buttonText } = items;
      return (
        `<article class="planResult">
        <figure class="PlanImage">
            <img src="${this.image}" alt="bla" />
            <meter value="0.85" min="0.0" max="5.0"><i class="fa-solid fa-star"></i> <span>4</span></meter>
        </figure>
        <figure class="PlanInfo">
            <button class="like"><i class="fa-regular fa-heart fa-2xl"></i></button>
            <h3>${this.title}</h3>
            <p><i class="fa-solid fa-tag"></i> Орой яахын?</p>
            <address><i class="fa-solid fa-location-dot"></i> СБД, 1-р хороо - УБ, Сөүл гудамж </address>
            <p><i class="fa-regular fa-clock"></i> <time datetime="2023-02-08">7:30</time>-<time>21:00</time></p>
            <ol>
                <li>Паб, лоунж</li>
                <li>Клаб</li>
                <li>Караоке</li>
            </ol>
            <button class="value"><span>${this.buttonText}</span>K-c эхэлье</button>
        </figure>
      </article>`
      );
    }).join('');
  }
}