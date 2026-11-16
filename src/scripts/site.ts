import './photo';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const compact = matchMedia('(max-width: 760px)');
const hero = document.querySelector<HTMLElement>('.hero')!;
if (!motion.matches) {
  gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } })
    .from('.hero-title', { y: 22, opacity: 0.65 })
    .from('.hero-actions', { y: 10, opacity: 0.7 }, '-=0.6');
}

for (const scene of document.querySelectorAll<HTMLElement>('.hero, [data-motion-scene]')) {
  const video = scene.querySelector('video')!;
  let visible = false;
  let finished = false;

  function syncFilm() {
    if (motion.matches) {
      video.pause();
      video.classList.remove('ready');
      return;
    }
    if (!visible || finished || document.hidden) {
      video.pause();
      return;
    }
    if (!video.getAttribute('src')) {
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      const source = compact.matches ? video.dataset.mobile : video.dataset.desktop;
      if (saveData || !source) return;
      video.src = source;
    }
    video.play().catch(() => video.classList.remove('ready'));
  }

  video.addEventListener('playing', () => video.classList.add('ready'));
  video.addEventListener('ended', () => { finished = true; });
  video.addEventListener('timeupdate', () => {
    if (video.currentTime < 4.75) return;
    finished = true;
    video.pause();
  });
  motion.addEventListener('change', syncFilm);
  document.addEventListener('visibilitychange', syncFilm);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.28;
    syncFilm();
  }, { threshold: 0.28 }).observe(scene);
}

const modifier = document.querySelector<HTMLElement>('[data-modifier]')!;
const stage = modifier.querySelector<HTMLElement>('.variant-stage')!;
stage.tabIndex = 0;
stage.setAttribute('role', 'button');
stage.setAttribute('aria-label', 'Размеры платформы');
stage.setAttribute('aria-pressed', 'false');
stage.setAttribute('aria-controls', 'dimension-overlay');
function toggleDimensions() {
  stage.setAttribute('aria-pressed', String(stage.getAttribute('aria-pressed') !== 'true'));
}
stage.addEventListener('click', (event) => {
  if (event.pointerType !== 'mouse' || !matchMedia('(any-hover: hover)').matches) toggleDimensions();
});
stage.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  if (!event.repeat) toggleDimensions();
});
const variants = Array.from(modifier.querySelectorAll<HTMLButtonElement>('[data-variant]'));
const panels = Array.from(modifier.querySelectorAll<HTMLElement>('[data-panel]'));
variants.forEach((button) => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  variants.forEach((variant) => variant.setAttribute('aria-pressed', String(variant === button)));
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== button.dataset.variant;
    if (!panel.hidden && !motion.matches) {
      gsap.fromTo(panel.firstElementChild, { opacity: 0.45, y: 7 }, { opacity: 1, y: 0, duration: 0.25, clearProps: 'opacity,transform', overwrite: true });
    }
  });
}));

const track = document.querySelector<HTMLElement>('.gallery-track')!;
const frames = Array.from(track.querySelectorAll('li'));
const controls = document.querySelector<HTMLElement>('.gallery-controls')!;
const counter = controls.querySelector('output')!;
const prev = controls.querySelector<HTMLButtonElement>('[data-gallery-prev]')!;
const next = controls.querySelector<HTMLButtonElement>('[data-gallery-next]')!;
const last = frames.length - 1;
const offset = (index: number) => frames[index].offsetLeft - frames[0].offsetLeft;
let index = 0;

function updateGallery() {
  const end = track.scrollWidth - track.clientWidth;
  index = track.scrollLeft >= end - 2 && end > 2
    ? last
    : frames.reduce((closest, _, i) => Math.abs(offset(i) - track.scrollLeft) < Math.abs(offset(closest) - track.scrollLeft) ? i : closest, 0);
  counter.value = `${String(index + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
  prev.disabled = index === 0;
  next.disabled = index === last;
}
function step(direction: number) {
  track.scrollTo({ left: offset(Math.min(last, Math.max(0, index + direction))), behavior: motion.matches ? 'instant' : 'smooth' });
}
prev.addEventListener('click', () => step(-1));
next.addEventListener('click', () => step(1));
track.addEventListener('scroll', updateGallery, { passive: true });
new ResizeObserver(updateGallery).observe(track);
controls.hidden = false;
updateGallery();

const chapterNav = document.querySelector<HTMLElement>('.chapter-nav')!;
const chapterLinks = Array.from(chapterNav.querySelectorAll<HTMLAnchorElement>('li a'));
const chapterNext = chapterNav.querySelector<HTMLAnchorElement>('.chapter-next')!;
const count = chapterNav.querySelector('.chapter-count')!;
const label = chapterNav.querySelector('.chapter-label')!;
const menu = chapterNav.querySelector('details')!;
const chapters = chapterLinks.map((link) => document.querySelector<HTMLElement>(link.hash)!);

function updateChapter() {
  const cutoff = innerHeight * 0.45;
  const current = chapters.reduce((active, section, i) => section.getBoundingClientRect().top <= cutoff ? i : active, 0);
  const nextLink = chapterLinks[(current + 1) % chapterLinks.length];
  chapterLinks.forEach((link, i) => i === current ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
  count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;
  label.textContent = chapterLinks[current].textContent;
  chapterNext.href = nextLink.hash;
  chapterNext.firstElementChild!.classList.toggle('up', current === chapters.length - 1);
  chapterNext.setAttribute('aria-label', current === chapters.length - 1 ? 'Вернуться к началу' : `Следующий раздел: ${nextLink.textContent}`);
  chapterNav.hidden = hero.getBoundingClientRect().bottom > innerHeight * 0.65;
  if (chapterNav.hidden) menu.open = false;
}

chapterLinks.forEach((link) => link.addEventListener('click', () => { menu.open = false; }));
chapterNext.addEventListener('click', () => { menu.open = false; });
chapterNav.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});
ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: updateChapter,
  onRefresh: updateChapter,
});
updateChapter();



