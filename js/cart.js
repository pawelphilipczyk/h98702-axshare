window.addEventListener('DOMContentLoaded', event => {
  cart().init();
});

function cart() {
  const refs = {}
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
      .querySelectorAll(refs.CART_TOTAL)
      .forEach(elem => (elem.innerHTML = total));
    document
      .querySelectorAll(refs.CART_QUANTITY)
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
      code: e.target.querySelector(refs.PRODUCT_CODE).value,
      quantity: parseFloat(e.target.querySelector(refs.PRODUCT_QUANTITY).value) || 1,
      price: parseFloat(e.target.querySelector(refs.PRODUCT_PRICE).value) || 0
    })
  }

  function init(config = {
    CART_TOTAL: '[data-target="cart-total"]',
    CART_QUANTITY: '[data-target="cart-quantity"]',
    CART_FORM: '[data-trigger="cart-form"]',
    PRODUCT_CODE: '[name="variant"]', 
    PRODUCT_QUANTITY: '[name="quantity"]', 
    PRODUCT_PRICE: '[name="price"]'
  }) {
    Object.assign(refs, config);
    document.querySelectorAll(refs.CART_FORM).forEach(elem => {
      elem.addEventListener('submit', onSubmit);
    });
  }

  return { init };
}
