window.addEventListener('DOMContentLoaded', event => {
  gallery().init();
});

function gallery() {
  const GALLERY_MAIN = '[data-target="gallery-main"]';
  const GALLERY_THUMBNAILS = '[data-trigger="gallery-thumbnails"] a';
  const ACTIVE_CLASS = 'is-active';

  function onClick(e) {
    e.preventDefault();
    const trigger = e.currentTarget;
    if (trigger.href && !trigger.classList.contains('is-active')) {
      // Set loading and active classes
      document.querySelector(GALLERY_MAIN).classList.add('is-loading');
      document.querySelectorAll(GALLERY_THUMBNAILS).forEach(elem => {
        elem.classList.remove(ACTIVE_CLASS);
      });
      trigger.classList.add(ACTIVE_CLASS);
      // Update main image
      document.querySelector(GALLERY_MAIN).src = trigger.href;
    }
  }

  function init() {
    document.querySelectorAll(GALLERY_MAIN).forEach(elem => {
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
    document.querySelectorAll(GALLERY_THUMBNAILS).forEach(elem => {
      elem.addEventListener('click', onClick);
    });
  }

  return { init };
}
