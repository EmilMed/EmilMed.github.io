window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

document.querySelectorAll('.timeline-item .timeline-content').forEach(item => {
    item.addEventListener('click', function() {
        // Toggle the 'active' class on the clicked item
        this.parentElement.classList.toggle('active');
        
        // Optional: Close other open dropdowns
        document.querySelectorAll('.timeline-item').forEach(el => {
            if (el !== this.parentElement) {
                el.classList.remove('active');
            }
        });
    });
});

const sliderWrapper = document.querySelector('.slider-wrapper');
const projects = document.querySelectorAll('.project-card');
const prevButton = document.querySelector('.slider-button.prev');
const nextButton = document.querySelector('.slider-button.next');

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

nextButton.addEventListener('click', moveToNext);
prevButton.addEventListener('click', moveToPrev);

updateSlider();