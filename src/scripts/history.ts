import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  for (const trail of document.querySelectorAll<SVGSVGElement>('.route-trail')) {
    const path = trail.querySelector<SVGPathElement>('.route-progress')!;
    const position = trail.querySelector<SVGGElement>('.route-position')!;
    const length = path.getTotalLength();
    ScrollTrigger.create({
      trigger: trail,
      start: 'top 78%',
      end: 'bottom 52%',
      onUpdate: draw,
      onRefresh: draw,
    });

    function draw({ progress }: ScrollTrigger) {
      const distance = progress * length;
      const point = path.getPointAtLength(distance);
      const nearby = path.getPointAtLength(Math.min(length, distance + 2));
      const angle = Math.atan2(nearby.y - point.y, nearby.x - point.x) * 180 / Math.PI;
      path.style.strokeDashoffset = String(1 - progress);
      position.style.visibility = progress > 0 && progress < 1 ? 'visible' : 'hidden';
      position.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
    }
  }

  return () => document.querySelectorAll<SVGElement>('.route-progress,.route-position')
    .forEach((element) => element.removeAttribute('style'));
});
