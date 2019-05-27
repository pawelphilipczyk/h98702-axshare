window.addEventListener('DOMContentLoaded', event => {
  cart().bind();
});

function cart() {
  const cart = [];
  const total = 0;

  function add(item) {
    cart.push(item);
    calculate();
  }

  function calculate() {
    console.log(cart);
  }

  function bind() {
    document
    .querySelectorAll('[trigger="cart"]')
    .forEach(elem => {
      elem.addEventListener('submit', e => {
        e.preventDefault();
        const code = e.target.querySelector('[name="variant"]').value;
        const quantity = e.target.querySelector('[name="quantity"]').value;
        add({code, quantity})
      });
    })
  } 

  return {bind}
}
