window.addEventListener('DOMContentLoaded', event => {
  gallery().init();
});

function gallery() {
  const refs = {};
  const classes = {
    ACTIVE: 'is-active',
    LOADING: 'is-loading'
  }

  function onClick(e) {
    e.preventDefault();
    const trigger = e.currentTarget;
    if (trigger.href && !trigger.classList.contains('is-active')) {
      // Set loading and active classes
      document.querySelector(refs.GALLERY_MAIN).classList.add(classes.LOADING);
      document.querySelectorAll(refs.GALLERY_THUMBNAILS).forEach(elem => {
        elem.classList.remove(classes.ACTIVE);
      });
      trigger.classList.add(classes.ACTIVE);
      // Update main image
      document.querySelector(refs.GALLERY_MAIN).src = trigger.href;
    }
  }

  function init(
    config = {
      GALLERY_MAIN: '[data-target="gallery-main"]',
      GALLERY_THUMBNAILS: '[data-trigger="gallery-thumbnails"] a'
    },
  ) {
    Object.assign(refs, config);
    document.querySelectorAll(refs.GALLERY_MAIN).forEach(elem => {
      // TODO: Calculate timeout based on css property for transition duration
      const timeout = getComputedStyle(elem).getPropertyValue(
        '--transition-speed',
      );
      elem.addEventListener('load', e => {
        const img = e.target;
        setTimeout(() => {
          img.classList.remove('is-loading');
        }, 100);
      });
    });
    document.querySelectorAll(refs.GALLERY_THUMBNAILS).forEach(elem => {
      elem.addEventListener('click', onClick);
    });
  }

  return { init };
}
