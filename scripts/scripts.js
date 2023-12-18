const pageBackgrounds = ['#FEAFC3', '#69A9FF', '#FCC850'];

function changeActiveClass(elements, activeIndex, className) {
  elements.forEach((element) => element.classList.remove(className));
  elements[activeIndex].classList.add(className);
}

document.querySelectorAll('.slider').forEach((sliderElement) => {
  const listElement = sliderElement.querySelector('.slider-list');
  const slideElements = sliderElement.querySelectorAll('.slider-list-item');
  const paginationElements = sliderElement.querySelectorAll('.slider-pagination-button');
  const maxIndex = slideElements.length - 1;
  let activeIndex = 0;

  function goTo(index) {
    if (index > maxIndex) {
      activeIndex = 0;
    } else if (index < 0) {
      activeIndex = maxIndex;
    } else {
      activeIndex = index;
    }
    listElement.style.transform = `translateX(-${100 * activeIndex}%)`;
    changeActiveClass(paginationElements, activeIndex, 'slider-pagination-button-current');
    changeActiveClass(slideElements, activeIndex, 'slider-list-item-current');
    document.body.style.setProperty('--page-bg', pageBackgrounds[activeIndex]);
  }

  sliderElement.addEventListener('click', (event) => {
    if (event.target.closest('[data-to]')) {
      goTo(Number(event.target.dataset.to) - 1);
    } else if (event.target.closest('.slider-prev')) {
      goTo(activeIndex - 1);
    } else if (event.target.closest('.slider-next')) {
      goTo(activeIndex + 1);
    }
  });
});
