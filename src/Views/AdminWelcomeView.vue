<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  ShieldCheck,
  MapPin,
  Utensils,
  Calendar,
  ArrowRight,
  LogOut,
  Lock,
} from "lucide-vue-next";

const router = useRouter();

const admin = ref({
  name: "Admin User",
  email: "admin@giaComo.com",
  avatar: "https://i.pravatar.cc/150?img=47",
  role: "Administrador",
  establishment: "Goxu",
  status: "Activo",
  lastAccess: "03/09/2026",
});

function goToPanel() {
  router.push({ name: "admin-dashboard" });
}

function logout() {
  router.push({ name: "login" });
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center px-6 py-16">
    <div
      class="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-6"
    >
      <ShieldCheck class="w-8 h-8 text-primary" />
    </div>

    <h1
      class="text-white! font-headline text-[32px] leading-10 md:text-[48px] md:leading-14 font-semibold text-center max-w-xl"
    >
      Bienvenido al panel de administración
    </h1>
    <p class="font-body text-white text-center mt-4 max-w-md">
      Has iniciado sesión correctamente. Estos son tus datos de administrador.
    </p>

    <div
      class="mt-10 w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-lg p-6 md:p-10"
    >
      <div class="flex flex-col items-center">
        <div class="relative">
          <img
            :src="admin.avatar"
            alt=""
            class="w-24 h-24 rounded-full object-cover"
          />
          <span
            class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary-container border-2 border-surface-container-lowest flex items-center justify-center"
          >
            <ShieldCheck class="w-3.5 h-3.5 text-white" />
          </span>
        </div>
        <h2 class="font-ui text-2xl font-bold text-on-surface mt-4">
          {{ admin.name }}
        </h2>
        <p class="font-body text-outline">{{ admin.email }}</p>
      </div>

      <hr class="border-surface-container-low my-6" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-surface-container-low rounded-lg p-4">
          <p
            class="font-ui text-label-caps tracking-caps uppercase text-outline mb-1"
          >
            Rol
          </p>
          <p
            class="flex items-center gap-2 font-ui font-semibold text-on-surface"
          >
            <MapPin class="w-4 h-4 text-highlight" />
            {{ admin.role }}
          </p>
        </div>
        <div class="bg-surface-container-low rounded-lg p-4">
          <p
            class="font-ui text-label-caps tracking-caps uppercase text-outline mb-1"
          >
            Establecimiento
          </p>
          <p
            class="flex items-center gap-2 font-ui font-semibold text-on-surface"
          >
            <Utensils class="w-4 h-4 text-highlight" />
            {{ admin.establishment }}
          </p>
        </div>
        <div class="bg-surface-container-low rounded-lg p-4">
          <p
            class="font-ui text-label-caps tracking-caps uppercase text-outline mb-1"
          >
            Estado
          </p>
          <span
            class="inline-block bg-highlight/20 text-highlight font-ui font-semibold px-3 py-1 rounded-full text-sm"
          >
            ● {{ admin.status }}
          </span>
        </div>
        <div class="bg-surface-container-low rounded-lg p-4">
          <p
            class="font-ui text-label-caps tracking-caps uppercase text-outline mb-1"
          >
            Último acceso
          </p>
          <p
            class="flex items-center gap-2 font-ui font-semibold text-on-surface"
          >
            <Calendar class="w-4 h-4 text-highlight" />
            {{ admin.lastAccess }}
          </p>
        </div>
      </div>

      <hr class="border-surface-container-low my-6" />

      <div class="text-center">
        <h3 class="font-ui font-bold text-lg text-on-surface">
          Todo listo para gestionar {{ admin.establishment }}.
        </h3>
        <p class="font-body text-outline mt-2">
          Accede al panel para administrar productos, pedidos, facturación e
          informes.
        </p>

        <button
          @click="goToPanel"
          class="mt-6 w-full bg-primary-container text-white rounded-xl py-4 font-ui text-button font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          ACCEDER AL PANEL DE ADMINISTRACIÓN
          <ArrowRight class="w-4 h-4" />
        </button>

        <button
          @click="logout"
          class="mt-4 flex items-center justify-center gap-2 mx-auto font-ui font-semibold text-highlight"
        >
          <LogOut class="w-4 h-4" />
          CERRAR SESIÓN
        </button>
      </div>
    </div>

    <p
      class="flex items-center justify-center gap-1.5 font-body text-outline text-sm mt-6"
    >
      <Lock class="w-3.5 h-3.5" />
      Conexión cifrada de administración {{ admin.establishment }}
    </p>
  </div>
</template>
