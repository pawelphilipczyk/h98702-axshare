window.addEventListener('DOMContentLoaded', event => {
  cart().init();
});

function cart() {
  const CART_TOTAL = '[data-target="cart-total"]';
  const CART_QUANTITY = '[data-target="cart-quantity"]';
  const CART_FORM = '[data-trigger="cart-form"]';

  let items = [];

  function add(item) {
    const index = items.findIndex(i => i.code === item.code);
    if(index > -1) {
      items[index].quantity += parseFloat(item.quantity);
    } else {
      items.push(item);
    }
    render();
  }

  function render() {
    const {total, quantity} = calculate();
    document
      .querySelectorAll(CART_TOTAL)
      .forEach(elem => (elem.innerHTML = total));
    document
      .querySelectorAll(CART_QUANTITY)
      .forEach(elem => (elem.innerHTML = quantity));
  }

  function calculate() {
    return items.reduce(
      (cart, item) => ({
        total: cart.total + item.price * item.quantity,
        quantity: cart.quantity + item.quantity,
      }),
      {total: 0, quantity: 0},
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    add({
      code: e.target.querySelector('[name="variant"]').value,
      quantity: parseFloat(e.target.querySelector('[name="quantity"]').value) || 1,
      price: parseFloat(e.target.querySelector('[name="price"]').value) || 0
    })
  }

  function init() {
    document.querySelectorAll(CART_FORM).forEach(elem => {
      elem.addEventListener('submit', onSubmit);
    });
  }

  return { init };
}
