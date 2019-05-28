window.addEventListener('DOMContentLoaded', event => {
  collapse().init();
});

function collapse() {
  const refs = {}
  const classes = {
    COLLAPSED: 'is-collapsed'
  };

  function toggle(e) {
    const target = document.querySelector(e.target.hash);
    e.preventDefault();
    if(target) {
      target.classList.toggle(classes.COLLAPSED);
    } 
  }

  function init(config = {
    COLLAPSE_TRIGGER: '[data-trigger="collapse"]',
  }) {
    Object.assign(refs, config);
    document.querySelectorAll(refs.COLLAPSE_TRIGGER).forEach(elem => {
      elem.addEventListener('click', toggle);
    });
  }

  return { init };
}
