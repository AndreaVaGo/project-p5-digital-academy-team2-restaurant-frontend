<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  LayoutGrid,
  UtensilsCrossed,
  ClipboardList,
  Receipt,
  LogOut,
  Menu,
  X,
} from "lucide-vue-next";

const router = useRouter();

const navItems = [
  { name: "admin-dashboard", label: "Resumen", icon: LayoutGrid },
  { name: "admin-products", label: "Productos", icon: UtensilsCrossed },
  { name: "admin-orders", label: "Pedidos", icon: ClipboardList },
  { name: "admin-billing", label: "Facturación", icon: Receipt },
];

const admin = ref({
  name: "Admin User",
  email: "admin@goxu.com",
  avatar: "https://i.pravatar.cc/150?img=47",
});

const mobileMenuOpen = ref(false);

function closeMenu() {
  mobileMenuOpen.value = false;
}

watch(() => router.currentRoute.value.fullPath, closeMenu);

function logout() {
  closeMenu();
  router.push({ name: "login" });
}
</script>

<template>
  <div class="min-h-screen flex bg-[#7c8874]">
    <div
      class="md:hidden fixed top-0 left-0 right-0 z-30 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between px-4 py-3"
    >
      <h1 class="font-headline text-xl text-primary">Goxu Admin</h1>
      <button
        type="button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="p-2"
      >
        <Menu v-if="!mobileMenuOpen" class="w-6 h-6 text-on-surface" />
        <X v-else class="w-6 h-6 text-on-surface" />
      </button>
    </div>

    <div
      v-if="mobileMenuOpen"
      @click="closeMenu"
      class="md:hidden fixed inset-0 bg-black/40 z-20"
    ></div>

    <aside
      class="w-64 shrink-0 bg-surface-container-lowest flex flex-col justify-between p-6 border-r border-outline-variant/30 fixed inset-y-0 left-0 z-30 transition-transform duration-200 md:relative md:translate-x-0"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div>
        <h1
          class="font-headline text-2xl text-primary leading-tight hidden md:block"
        >
          Goxu<br />Admin
        </h1>
        <p
          class="font-ui text-xs text-outline uppercase tracking-caps mt-1 hidden md:block"
        >
          Gestión Gastronómica
        </p>

        <nav class="mt-10 md:mt-10 flex flex-col gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="{ name: item.name }"
            @click="closeMenu"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-ui font-semibold text-on-surface-variant transition-colors"
            exact-active-class="bg-primary-container text-on-primary-container"
          >
            <component :is="item.icon" class="w-4 h-4" />
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>

      <div>
        <hr class="border-outline-variant/30 mb-4" />
        <div class="flex items-center gap-3">
          <img
            :src="admin.avatar"
            alt=""
            class="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p class="font-ui text-sm font-semibold text-on-surface">
              {{ admin.name }}
            </p>
            <p class="font-ui text-xs text-outline">{{ admin.email }}</p>
          </div>
        </div>
        <button
          @click="logout"
          class="mt-4 flex items-center gap-2 font-ui text-sm font-semibold text-error"
        >
          <LogOut class="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>

    <main class="flex-1 p-4 md:p-8 mt-14 md:mt-0">
      <RouterView />
    </main>
  </div>
</template>
