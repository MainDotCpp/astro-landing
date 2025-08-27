(() => {

    const links = document.querySelectorAll('.ft-companies a[href^="#"]');
    const handler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        href = e.currentTarget.getAttribute('href');

        const targetElement = document.querySelector(href);
        targetElement.scrollIntoView({
            'behavior': 'smooth'
        });

    };

    for(let i=0; i<links.length; i++) {
        links[i].addEventListener('click', handler);
    }

})();


(() => {
    const element = document.querySelector('#header-video');
    if(!element) {
        return;
    }

    const size = window.innerWidth * window.devicePixelRatio;
    const urlTemplate = element.getAttribute('src');
    let url = urlTemplate;
    if(size > 1080) {
        url = urlTemplate.replace('720', '1080');
    }
    if(size > 3000) {
        url = urlTemplate.replace('720', '4k');
    }
    element.setAttribute('src', url);
})();


(() => {
    const imagefilmContainer = document.querySelector('.imagefilm-container');
    const imagefilmInner = document.querySelector('.imagefilm-inner');
    const imagefilm = document.querySelector('#imagefilm');
    imagefilm.currentTime = 1.68;

    let mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".imagefilm-container",
                scrub: true,
                start: "center 100%",
                end: "center 50%",
                onToggle: self => {
                    if(self.isActive && self.progress < 0.8) {
                        if(imagefilm.paused || imagefilm.muted) {
                            imagefilm.currentTime = 1.68;
                            imagefilm.currentTime = 34;
                            imagefilm.play();
                        }
                    }
                }
            }
        })
    });
    mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".imagefilm-container",
                scrub: true,
                start: "center 100%",
                end: "center 50%",
            }
        })

        tl.to('.imagefilm-container', {
            height: '600px',
        });

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".imagefilm-container",
                scrub: true,
                start: "center 100%",
                end: "center 50%",
                onToggle: self => {
                    if(self.progress === 1) {
                        imagefilmInner.classList.add('--shadow');
                    } else {
                        imagefilmInner.classList.remove('--shadow');
                    }
                    if(self.isActive && self.progress < 0.8) {
                        if(imagefilm.paused || imagefilm.muted) {
                            imagefilm.currentTime = 1.68;
                            imagefilm.play();
                        }
                    }
                }
            }
        })

        tl2.to('.imagefilm-inner', {
            height: '500px'
        });
    });

    imagefilm.addEventListener('ended', () => {
        imagefilmInner.classList.add('--paused');
    })
    imagefilm.addEventListener('play', () => {
        imagefilmInner.classList.remove('--paused');
    })

})();
