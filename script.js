const profile = "./assets/profile.jpg";
const data = [
  {
    id: 1,
    title: "MT-15",
    image: "./assets/image1.jpg",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto sint repellendus ipsa dolores ea, aspernatur minus, expedita iure quia quisquam id quam nemo alias numquam tempora. Eos esse culpa dicta.",
  },
  {
    id: 2,
    title: "MT-15",
    image: "./assets/image2.jpg",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto sint repellendus ipsa dolores ea, aspernatur minus, expedita iure quia quisquam id quam nemo alias numquam tempora. Eos esse culpa dicta.",
  },
  {
    id: 3,
    title: "MT-15",
    image: "./assets/image3.jpg",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto sint repellendus ipsa dolores ea, aspernatur minus, expedita iure quia quisquam id quam nemo alias numquam tempora. Eos esse culpa dicta.",
  },
  {
    id: 4,
    title: "MT-15",
    image: "./assets/image4.jpg",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto sint repellendus ipsa dolores ea, aspernatur minus, expedita iure quia quisquam id quam nemo alias numquam tempora. Eos esse culpa dicta.",
  },
  {
    id: 5,
    title: "MT-15",
    image: "./assets/image5.jpg",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto sint repellendus ipsa dolores ea, aspernatur minus, expedita iure quia quisquam id quam nemo alias numquam tempora. Eos esse culpa dicta.",
  },
];
//i am getting these two elements form HTML file
const swiperWrapper = document.getElementById("swiperWrapper");
const pagination = document.getElementById("pagination");
let currentIndex = 0;

// Create and insert cards into swiper component
function createCards() {
  data.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.dataset.index = index;
    slide.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="content">
                <div class="author">
                    <img src="${profile}" alt="author">
                    <h6>Sudip Khadka</h6>
                </div>
                <h3>${item.title}</h3>
                <p>${
                  item.description.length > 60
                    ? item.description.slice(0, 60) + "..."
                    : item.description
                }</p>
            </div>
        `;
    swiperWrapper.appendChild(slide);

    // Created pagination dots to appear below the cart
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = index;
    dot.addEventListener("click", () => moveSwiper(index));
    pagination.appendChild(dot);
  });

  // Position initial slides
  updateSlidePositions(currentIndex); //setting to 0 on initial and update previous and next card to be displayed
}

function updateSlidePositions(activeIndex) {
  const slides = document.querySelectorAll(".swiper-slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((slide, index) => {
    // Removes all position classes on each update and reassigns each slide new classname
    slide.classList.remove("prev-slide", "current-slide", "next-slide");

    if (index === activeIndex) {
      slide.classList.add("current-slide");
    } else if (index === activeIndex - 1) {
      slide.classList.add("prev-slide");
    } else if (index === activeIndex + 1) {
      slide.classList.add("next-slide");
    }
  });

  // Update pagination dots so that we can know the active slide/cardf
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIndex);
  });
}
//for swiping based on mouse dragging
function moveSwiper(newIndex) {
  const slides = document.querySelectorAll(".swiper-slide");
  const totalSlides = slides.length;

  // Ensure index is within bounds
  if (newIndex < 0) newIndex = 0;
  if (newIndex >= totalSlides) newIndex = totalSlides - 1;

  // Update current index
  currentIndex = newIndex;

  // Update slide positions
  updateSlidePositions(currentIndex);
}

let startX = 0;
let isDragging = false;
let dragThreshold = 50; // Minimum distance to trigger a swipe

swiperWrapper.addEventListener("mousedown", startDrag);
swiperWrapper.addEventListener("mousemove", drag);
swiperWrapper.addEventListener("mouseup", endDrag);
swiperWrapper.addEventListener("mouseleave", endDrag);

swiperWrapper.addEventListener("touchstart", startDrag, { passive: true });
swiperWrapper.addEventListener("touchmove", drag, { passive: false });
swiperWrapper.addEventListener("touchend", endDrag);

function startDrag(e) {
  e.preventDefault(); //this is added so that ther text content is not being selected on mouse  click which happens by default

  // Get start X position
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;

  isDragging = true;
}

function drag(e) {
  if (!isDragging) return;

  // Prevent default to stop scrolling
  e.preventDefault();

  // Get current X position (handle both mouse and touch events)
  const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}

function endDrag(e) {
  if (!isDragging) return;

  // Get end X position (handle both mouse and touch events)
  const endX = e.type.includes("mouse")
    ? e.clientX
    : e.changedTouches[0].clientX;

  // Calculate drag distance
  const diffX = startX - endX;

  // Check if drag exceeds threshold
  if (Math.abs(diffX) > dragThreshold) {
    if (diffX > 0) {
      // Swipe left (next slide)
      moveSwiper(currentIndex + 1);
    } else {
      // Swipe right (previous slide)
      moveSwiper(currentIndex - 1);
    }
  }

  // Reset dragging state
  isDragging = false;
  // Optional: Reset transform
  // swiperWrapper.style.transform = 'translateX(0)';
}

// Initialize
createCards();
