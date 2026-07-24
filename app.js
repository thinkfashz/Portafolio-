const screens = [...document.querySelectorAll('[data-screen]')];
const navButtons = [...document.querySelectorAll('[data-tab-target]')];
const openButtons = [...document.querySelectorAll('[data-open-tab]')];

function activateScreen(name) {
  screens.forEach((screen) => screen.classList.toggle('active-screen', screen.dataset.screen === name));
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.tabTarget === name));

  if (window.innerWidth <= 850) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.querySelector(`[data-screen="${name}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (name === 'estadisticas') animateCounters();
}

navButtons.forEach((button) => button.addEventListener('click', () => activateScreen(button.dataset.tabTarget)));
openButtons.forEach((button) => button.addEventListener('click', () => activateScreen(button.dataset.openTab)));
document.querySelectorAll('[data-tab]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  activateScreen(link.dataset.tab);
}));

let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  document.querySelectorAll('[data-count]').forEach((element) => {
    const target = Number(element.dataset.count);
    const suffix = target >= 40 ? '+' : '+';
    const state = { value: 0 };

    if (window.gsap) {
      gsap.to(state, {
        value: target,
        duration: 1.25,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = `${Math.round(state.value).toLocaleString('es-CL')}${suffix}`;
        }
      });
    } else {
      element.textContent = `${target.toLocaleString('es-CL')}${suffix}`;
    }
  });
}

window.addEventListener('load', () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-copy > *', {
    y: 28,
    opacity: 0,
    duration: 0.75,
    stagger: 0.09,
    ease: 'power3.out'
  });

  gsap.to('.hero-orbit', {
    rotation: 18,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-screen',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  if (window.innerWidth > 850) {
    gsap.utils.toArray('.live-project, .compact-projects a, .bio-grid article, .stats-grid article, .timeline article').forEach((element) => {
      gsap.from(element, {
        y: 42,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.live-preview').forEach((preview) => {
      gsap.fromTo(preview, { scale: 0.97 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: preview,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    ScrollTrigger.create({
      trigger: '#estadisticas',
      start: 'top 70%',
      once: true,
      onEnter: animateCounters
    });
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 850) {
    screens.forEach((screen) => screen.classList.add('active-screen'));
  } else {
    const activeName = document.querySelector('.bottom-nav button.active')?.dataset.tabTarget || 'inicio';
    screens.forEach((screen) => screen.classList.toggle('active-screen', screen.dataset.screen === activeName));
  }
});

if (window.innerWidth > 850) {
  screens.forEach((screen) => screen.classList.add('active-screen'));
}