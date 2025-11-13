window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// START: Modified JS to listen to the new blue circle icon class
document.querySelectorAll('.timeline-item .timeline-icon.toggle-dropdown').forEach(icon => {
    icon.addEventListener('click', function() {
        // Find the parent timeline-item
        const timelineItem = this.closest('.timeline-item');
        
        // Toggle the 'active' class on the parent item
        timelineItem.classList.toggle('active');
        
        // Optional: Close other open dropdowns
        document.querySelectorAll('.timeline-item').forEach(el => {
            if (el !== timelineItem) {
                el.classList.remove('active');
            }
        });
    });
});
// END: Modified JS to listen to the new blue circle icon class

const sliderWrapper = document.querySelector('.slider-wrapper');
const projects = document.querySelectorAll('.project-card');
const prevButton = document.querySelector('.slider-button.prev');
const nextButton = document.querySelector('.slider-button.next');

// NOTE: The slider functionality is for an element not present in the HTML ('.slider-wrapper', '.project-card', '.slider-button'),
// but I'm keeping the original logic in case you add it back or it's needed for other code.

let currentIndex = 1;

function updateSlider() {
    projects.forEach((project, index) => {
        project.classList.remove('center');
        const offset = index - currentIndex;
        if (offset === 0) {
            project.classList.add('center');
        }
        project.style.transform = `translateX(${offset * 340}px) scale(${1 - Math.abs(offset) * 0.2})`;
        project.style.zIndex = 10 - Math.abs(offset);
    });
}

function moveToNext() {
    currentIndex = (currentIndex + 1) % projects.length;
    if (currentIndex === 0) {
        sliderWrapper.appendChild(projects[0]);
    }
    updateSlider();
}

function moveToPrev() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    if (currentIndex === projects.length - 1) {
        sliderWrapper.prepend(projects[projects.length - 1]);
    }
    updateSlider();
}

// Check if buttons exist before adding listeners (to prevent errors if slider is not used)
if (nextButton && prevButton) {
    nextButton.addEventListener('click', moveToNext);
    prevButton.addEventListener('click', moveToPrev);
    updateSlider();
}