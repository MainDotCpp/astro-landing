(() => {
	const navToggle = document.querySelector('.nav-toggle');
	const mainNav = document.querySelector('.main-nav');
	navToggle.addEventListener('click', () => {
		mainNav.classList.toggle('--active');
	})
})();


class Particle {
	constructor(x=window.innerWidth/2, y=window.innerHeight/2) {
		const minRadius = 10;
		const maxRadius = 200;

		this.x = x;
		this.y = y;
		this.velocityX = 0;
		this.velocityY = 0;
		this.mass = Math.random() * 0.8 + 0.2;
		this.r = 2*Math.pow(this.mass, 2);

		this.opacity = Math.random()*0.3;
		this.hue = Math.round(Math.random()*26+173);
		this.saturation = Math.round(Math.random()*50+50);
		this.lightness = Math.random()*0.55 + 0.45;

		this.friction = 0.8;
		this.angleOffset = Math.random() * 2 * Math.PI;
		this.targetRadius = Math.random() * Math.random() * (maxRadius-minRadius) + minRadius;
	}

	update = (targetX, targetY, hover, click) => {
		let r = this.targetRadius;
		if(click && hover) {
			r = r*25;
		} else if(hover) {
			r = r/5;
		}
		targetX = targetX + Math.sin(this.angleOffset + window.performance.now() * 1e-4 * 2e2/r) * r;
		targetY = targetY + Math.cos(this.angleOffset + window.performance.now() * 1e-4 * 2e2/r) * r;
		const dirX = targetX > this.x ? 1 : -1;
		const dirY = targetY > this.y ? 1 : -1;
		const forceX = 0.2 * (targetX - this.x);
		const forceY = 0.2 * (targetY - this.y);
		this.velocityX = this.velocityX * this.friction + forceX / this.mass;
		this.velocityY = this.velocityY * this.friction + forceY / this.mass;
		this.x += this.velocityX * 0.1;
		this.y += this.velocityY * 0.1;
	}

	draw = (ctx) => {
		//ctx.fillStyle = 'rgba(20, 232, 242, '+this.opacity+')';
		ctx.fillStyle = `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness*100}%, ${this.opacity})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2*this.r, 0, 2*Math.PI);
		ctx.fill();
	}
}

class CursorParticles {
	constructor(selector, x=0, y=0) {
		this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext('2d');

		this.particleCount = 1e3;

		this.x = x;
		this.y = y;
		this.hover = 0;
		this.click = 0;

		this.init();
		window.addEventListener('resize', this.init);

		document.addEventListener('mousemove', (e) => {
			this.x = e.x;
			this.y = e.y;
		});

		this.particles = [];
		for(let i=0; i<this.particleCount; i++) {
			this.particles.push(new Particle(this.x, this.y));
		}

		if(!('ontouchstart' in window)) {
			this.draw();
		}

		const links = Array.from(document.querySelectorAll('a, button'));
		links.forEach(link => {
			link.addEventListener('mouseover', this.mouseInHandler);
			link.addEventListener('mouseout', this.mouseOutHandler);
		});
		document.addEventListener('mousedown', this.mouseDownHandler);
		document.addEventListener('mouseup', this.mouseUpHandler);
	}

	init = () => {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		if(this.x == 0) {
			this.x = this.canvas.width / 2;
		}
		if(this.y == 0) {
			this.y = this.canvas.height / 2;
		}
	}

	draw = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.particles.forEach(particle => {
			particle.update(this.x, this.y, this.hover > 0, this.click > 0);
			particle.draw(this.ctx);
		});

		requestAnimationFrame(this.draw);
	}

	mouseInHandler = () => {
		this.hover += 1;
	}
	mouseOutHandler = () => {
		this.hover = Math.max(0, this.hover-1);
	}
	mouseDownHandler = () => {
		this.click += 1;
	}
	mouseUpHandler = () => {
		this.click = Math.max(0, this.click-1);
	}
}

/*
(() => {
	window.addEventListener('mousemove', (e) => {
		const cursorParticles = new CursorParticles('#cursor', e.x, e.y);
	}, {once: true});
})();
*/

(() => {
    // Check if the banner was previously closed
    if (localStorage.getItem('topBannerClosed')) {
        const topBanner = document.querySelector('.top-banner');
    } else {
        // Show the banner by removing the --hidden class if not previously closed
        const topBanner = document.querySelector('.top-banner');
        if (topBanner) {
            topBanner.classList.remove('--hidden');
        }
    }

    // Add close button functionality
    document.addEventListener('DOMContentLoaded', () => {
        const topBanner = document.querySelector('.top-banner');
        if (!topBanner) return;

        // Check if close button exists, if not create one
        let closeButton = topBanner.querySelector('.close');
        if (!closeButton) {
            closeButton = document.createElement('button');
            closeButton.className = 'close';
            closeButton.innerHTML = '&times;';
            topBanner.appendChild(closeButton);
        }

        // Add click event to close button
        closeButton.addEventListener('click', () => {
            topBanner.classList.add('--hidden');
            localStorage.setItem('topBannerClosed', 'true');
        });
    });
})();


(() => {
    // Check if the video popover was previously closed
    // Add close button functionality
    document.addEventListener('DOMContentLoaded', () => {
        const videoPopover = document.querySelector('.video-popover');
        if (localStorage.getItem('videoPopoverClosed')) {
        } else {
            // Show the banner by removing the --hidden class if not previously closed
            if (videoPopover) {
                videoPopover.classList.remove('--hidden');
            }
        }
        if (!videoPopover) return;

        // Check if close button exists, if not create one
        let closeButton = videoPopover.querySelector('.video-popover-close');
        if (!closeButton) {
            closeButton = document.createElement('button');
            closeButton.className = 'video-popover-close';
            closeButton.innerHTML = '&times;';
            videoPopover.appendChild(closeButton);
        }

        // Add click event to close button
        closeButton.addEventListener('click', () => {
            videoPopover.classList.add('--hidden');
            const video = videoPopover.querySelector('video');
            video.pause();
            localStorage.setItem('videoPopoverClosed', 'true');
        });
    });
})();
