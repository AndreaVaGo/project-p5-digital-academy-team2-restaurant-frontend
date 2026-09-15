<template>
  <section class="relative flex items-center justify-center min-h-120 md:min-h-150 px-5">
    <div class="absolute inset-0 bg-black/40"></div>

    <div class="relative z-10 flex flex-col items-center text-center max-w-4xl gap-4">
      <h1
        class="text-white text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight m-0"
        style="font-family: 'DM Serif Display', serif"
      >
        ¡Fartucos de sabor!
      </h1>

      <p
        class="text-stone-100 text-base md:text-lg leading-relaxed m-0 max-w-140"
        style="font-family: 'Manrope', sans-serif"
      >
        Una experiencia gastronómica que une el mar Cantábrico y los Picos
        de Europa en cada bocado.
      </p>

      <!-- TODO(GC-82): proposed route /carta — pending Iker to create the actual view/route -->
      <RouterLink to="/carta" class="inline-flex items-center justify-center bg-green-600 text-white text-xs font-semibold tracking-wide uppercase no-underline px-7 py-3.5 rounded-xl transition hover:opacity-90 hover:-translate-y-0.5" style="font-family: 'Inter', sans-serif">Ver la carta</RouterLink>
    </div>
  </section>
</template>