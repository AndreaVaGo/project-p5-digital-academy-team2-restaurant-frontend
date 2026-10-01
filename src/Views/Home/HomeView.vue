<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import HeroSection from '../../components/HeroSection.vue'
import SpecialtiesSection from '../../components/SpecialtiesSection.vue'
import EventsSection from '../../components/EventsSection.vue'
import ContactForm from '../../components/ContactForm.vue'
import { useProducts } from '@/composables/useProducts'
import { useEvents } from '@/composables/useEvents'

const { products, cargarProductos } = useProducts()
const dishes = computed(() => products.value.filter((p) => p.featured))

/* Los productos vienen del back: se piden al entrar en la Home */
onMounted(cargarProductos)

/*
 * Eventos del back: la Home solo muestra los destacados (featured = true)
 * que todavía no han pasado, porque la sección se llama "Próximos eventos".
 * La carga se lanza al montar la página.
 */
const { events: allEvents, cargarEventos } = useEvents()
const events = computed(() => {
  const now = new Date()
  return allEvents.value.filter((e) => e.featured && new Date(e.eventDate) > now)
})

onMounted(cargarEventos)

/*
 * Mobile-only slow parallax: the photo (fixed size, see .parallax-bg)
 * drifts down slower than the page as you scroll, instead of scrolling
 * with it 1:1. Desktop keeps its own background rule untouched (see
 * <style> below).
 *
 * One eased rise, then permanently glued: the photo needs to have moved
 * down by `coreMax` (= wrapper height - photo height) by the time only one
 * viewport of scroll remains (`riseSpan` below), because every px of scroll
 * after that is forced - there's no more slack to delay it without opening
 * a gap at the bottom. So it rises (slow start, constant cruise, smooth
 * ease-out) over that whole span - covering Hero plus most of "la carta" -
 * then holds that exact value, unchanged, the rest of the way through the
 * Contact form and into the footer. No further growth after it lands means
 * nothing to outrun the footer with: it arrives flush and just rides along.
 */
const parallaxImg = ref(null)
const PARALLAX_RISE_EASE = 140
const PARALLAX_LANDING_BUFFER = 3

// Position reached after easing from speed `v` down to 0 over width `ease`,
// as a fraction (0 to 1) of the way through that easing, so the curve lands
// with zero velocity instead of snapping to a stop.
function easeOutDistance(u, v, ease) {
  const x = Math.min(Math.max(u, 0), 1)
  return v * ease * (x - (x ** 3 - 0.5 * x ** 4))
}

function risePhase(scrolled, riseSpan, target) {
  const ease = Math.min(PARALLAX_RISE_EASE, riseSpan / 2)
  const linearSpan = riseSpan - ease
  const speed = target / (riseSpan - ease / 2)
  if (scrolled <= linearSpan) return speed * scrolled
  return speed * linearSpan + easeOutDistance((scrolled - linearSpan) / ease, speed, ease)
}

function targetTranslate(img) {
  const wrapper = img.parentElement
  const rect = wrapper.getBoundingClientRect()
  const scrolled = Math.min(Math.max(-rect.top, 0), rect.height)
  const coreMax = Math.max(rect.height - img.offsetHeight, 0) + PARALLAX_LANDING_BUFFER

  const riseSpan = Math.max(rect.height - window.innerHeight, 1)
  return scrolled >= riseSpan ? coreMax : risePhase(scrolled, riseSpan, coreMax)
}

/*
 * An earlier version eased the on-screen value toward the target instead of
 * snapping to it, to smooth out frame-to-frame jitter during the near-zero
 * velocity freeze. That's no longer needed - the freeze is a genuinely flat
 * plateau now (targetTranslate's value literally doesn't change across it),
 * so there's nothing to jitter there regardless. Worse, that easing lagged
 * behind on a fast flick (scroll stops, the shown value is still catching
 * up to where it should already be), which read as the photo "sticking"
 * for a moment before lurching to catch up - exactly the opposite of
 * "always moving with the scroll". Setting it straight to the target avoids
 * that while still batching the write to the next paint via rAF.
 */
let parallaxFrame = null

function parallaxTick() {
  const img = parallaxImg.value
  parallaxFrame = null
  if (!img) return
  if (window.innerWidth >= 768) {
    img.style.transform = ''
    return
  }
  img.style.transform = `translate(calc(-50% - 3cm), ${targetTranslate(img)}px)`
}

function scheduleParallaxUpdate() {
  if (parallaxFrame === null) parallaxFrame = requestAnimationFrame(parallaxTick)
}

onMounted(() => {
  window.addEventListener('scroll', scheduleParallaxUpdate, { passive: true })
  window.addEventListener('resize', scheduleParallaxUpdate)
  scheduleParallaxUpdate()
})
onUnmounted(() => {
  window.removeEventListener('scroll', scheduleParallaxUpdate)
  window.removeEventListener('resize', scheduleParallaxUpdate)
  if (parallaxFrame !== null) cancelAnimationFrame(parallaxFrame)
})
</script>

<template>
  <main class="home flex flex-col w-full animate-[fade-in-up_0.6s_ease-out]">
    <div class="atmosphere-wrapper relative">
      <img ref="parallaxImg" src="/home-img/home-background.png" alt="" aria-hidden="true" class="parallax-bg" />
      <HeroSection />
      <SpecialtiesSection :dishes="dishes" />
      <EventsSection :events="events" />
      <ContactForm />
    </div>
  </main>
</template>

<style scoped>
.atmosphere-wrapper {
  background-image: url('/home-img/home-background.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 150% auto;
  background-position: 88% center;
}

.parallax-bg {
  display: none;
}

/* Below md: "fixed" measures against the viewport, not this very tall
   wrapper, so the old background-attachment:fixed left a gap at the top
   and re-showed the photo mid-scroll. Instead, the photo becomes a plain
   <img> positioned behind the content (.parallax-bg below) that a scroll
   listener (see <script>) slides down at a fraction of scroll speed,
   the whole length of the Home (Hero down to where the footer starts).
   Centered on the bottle-to-glass line (object-position). The wrapper's
   own background-color is the photo's bottom-edge tone, as a fallback
   behind any gap the slide-down creates. Desktop (md+) is untouched. */
@media (max-width: 767px) {
  .atmosphere-wrapper {
    background-image: none;
    background-color: #3b2b1f;
    overflow: hidden;
  }

  .parallax-bg {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 170%;
    max-width: none;
    height: 140vh;
    object-fit: cover;
    object-position: 68% 48%;
    transform: translate(calc(-50% - 3cm), 0);
    pointer-events: none;
    z-index: 0;
    will-change: transform;
  }

  .atmosphere-wrapper > :not(.parallax-bg) {
    position: relative;
    z-index: 1;
  }
}

/* GC-83: animación de entrada (estilos mobile-first) */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>