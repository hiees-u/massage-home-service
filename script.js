const menuLinks = document.querySelectorAll('.menu .menu-item');
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        // Bỏ class active ở tất cả
        menuLinks.forEach(l => l.classList.remove('active'));
        // Thêm class active vào link vừa click
        link.classList.add('active');
    });
});

const iconSearch = document.querySelector('#icon-search')
const containerSearch = document.querySelector('#search')
const closeSearch = document.querySelector('#close-search')

iconSearch.addEventListener('click', () => {
    containerSearch.classList.remove('hidden');
});

closeSearch.addEventListener('click', () => {
    containerSearch.classList.add('hidden');
});


const carousel = document.getElementById('carousel');
const items = carousel.children;
const visibleItems = 3;
const step = visibleItems;
const totalOriginal = 6;

let index = totalOriginal; // bắt đầu từ nhóm đầu tiên của original items
carousel.style.transform = `translateX(${-index * (100 / visibleItems)}%)`;

let startX = 0;
let isDragging = false;

carousel.addEventListener('mousedown', (e) => {
  startX = e.clientX;
  isDragging = true;
});

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carousel.addEventListener('mouseup', (e) => handleSwipe(e.clientX));
carousel.addEventListener('mouseleave', (e) => { if(isDragging) handleSwipe(e.clientX) });
carousel.addEventListener('touchend', (e) => handleSwipe(e.changedTouches[0].clientX));

function handleSwipe(endX) {
  if (!isDragging) return;
  const diff = endX - startX;

  if (diff < -50) { // swipe trái
    index += step;
    smoothUpdate();
  } else if (diff > 50) { // swipe phải
    index -= step;
    smoothUpdate();
  }

  isDragging = false;
}

// Cập nhật transform và reset vô cực
function smoothUpdate() {
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(${-index * (100 / visibleItems)}%)`;

  carousel.addEventListener('transitionend', checkLoop, { once: true });
}

function checkLoop() {
  // Nếu index vượt ra ngoài original, reset không animation
  if (index >= totalOriginal * 2) {
    index = totalOriginal;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(${-index * (100 / visibleItems)}%)`;
  } else if (index < totalOriginal) {
    index = totalOriginal + (index % totalOriginal);
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(${-index * (100 / visibleItems)}%)`;
  }
}