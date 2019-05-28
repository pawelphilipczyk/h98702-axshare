window.addEventListener('DOMContentLoaded', event => {
  gallery().init();
});

function gallery() {
  const GALLERY_MAIN = '[data-target="gallery-main"]';
  const GALLERY_THUMBNAILS = '[data-trigger="gallery-thumbnails"] a';
  const ACTIVE_CLASS = 'is-active';

  function onClick(e) {
    e.preventDefault();
    const target = e.currentTarget;
    if(target.href) {
      // Set active class
      document.querySelectorAll(GALLERY_THUMBNAILS).forEach(elem => {elem.classList.remove(ACTIVE_CLASS)});
      target.classList.add(ACTIVE_CLASS);
      // Update main image
      document.querySelector(GALLERY_MAIN).src = target.href
    }
  }

  function init() {
    document.querySelectorAll(GALLERY_THUMBNAILS).forEach(elem => {
      elem.addEventListener('click', onClick);
    });
  }

  return { init };
}
