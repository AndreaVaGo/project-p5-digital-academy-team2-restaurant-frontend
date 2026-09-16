import { ref } from 'vue'

import cachopoImg from '@/assets/images/menu/cachopo-tradicional.png'
import fabadaImg from '@/assets/images/menu/fabada.png'
import arrozConLecheImg from '@/assets/images/menu/arroz-con-leche.png'
import croquetasImg from '@/assets/images/menu/croquetas-jamon.png'
import cochinilloImg from '@/assets/images/menu/cochinillo.png'
import baoImg from '@/assets/images/menu/bao-panceta.png'
import tartaQuesoImg from '@/assets/images/menu/tarta-queso.png'
import sidraImg from '@/assets/images/menu/sidra.png'

const products = ref([
  {
    id: 1,
    name: 'Cachopo Tradicional',
    price: 24.5,
    image: cachopoImg,
    category: 'Carnes',
    available: true,
    badge: { label: 'Recomendado', tone: 'primary' },
    description:
      'Dos tiernos filetes de ternera asturiana rellenos de jamón serrano reserva y queso de Pría fundido, empanado crujiente. Acompañado de patatas gajo.',
    featured: true,
  },
  {
    id: 2,
    name: 'Fabada Asturiana',
    price: 18.0,
    image: fabadaImg,
    category: 'Especialidades',
    available: true,
    badge: { label: 'Clásico', tone: 'highlight' },
    description:
      'La auténtica fabada elaborada a fuego lento con faba de la Granja IGP y nuestro compango seleccionado (chorizo, morcilla y panceta ahumada).',
    featured: true,
  },
  {
    id: 3,
    name: 'Arroz con Leche Réquexu',
    price: 6.5,
    image: arrozConLecheImg,
    category: 'Postres',
    available: false,
    badge: { label: 'Postre', tone: 'neutral' },
    description:
      'Cremoso y suave, requemado al momento con azúcar de caña. Una receta familiar transmitida de generación en generación.',
    featured: true,
  },
  {
    id: 4,
    name: 'Croquetas de Jamón',
    price: 9.5,
    image: croquetasImg,
    category: 'Entrantes',
    available: true,
    badge: null,
    description: 'Croquetas caseras cremosas de jamón ibérico, fritas al momento y de textura crujiente.',
    featured: true,
  },
  {
    id: 5,
    name: 'Cochinillo Asado',
    price: 22.0,
    image: cochinilloImg,
    category: 'Carnes',
    available: true,
    badge: null,
    description: 'Cochinillo asado lentamente hasta conseguir una piel crujiente y una carne jugosa y tierna.',
    featured: false,
  },
  {
    id: 6,
    name: 'Bao de Panceta',
    price: 12.0,
    image: baoImg,
    category: 'Entrantes',
    available: true,
    badge: null,
    description: 'Pan bao esponjoso relleno de panceta confitada, encurtidos y salsa asturiana.',
    featured: false,
  },
  {
    id: 7,
    name: 'Tarta de Queso',
    price: 7.0,
    image: tartaQuesoImg,
    category: 'Postres',
    available: true,
    badge: { label: 'Postre', tone: 'neutral' },
    description: 'Tarta de queso cremosa horneada al estilo tradicional, con un ligero toque caramelizado.',
    featured: false,
  },
  {
    id: 8,
    name: 'Sidra Natural',
    price: 8.0,
    image: sidraImg,
    category: 'Bebidas',
    available: true,
    badge: null,
    description: 'Sidra natural asturiana DOP, servida escanciada al momento.',
    featured: false,
  },
])

export function useProducts() {
  function toggleFeatured(productId) {
    const product = products.value.find((p) => p.id === productId)
    if (product) product.featured = !product.featured
  }

  return {
    products,
    toggleFeatured,
  }
}