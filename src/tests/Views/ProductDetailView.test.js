import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import ProductDetailView from "../../Views/ProductDetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
    },
  ],
});

describe("ProductDetailView", () => {
  it("deshabilita el botón de añadir al pedido si el producto no está disponible", async () => {
    router.push("/product/1");
    await router.isReady();
    const wrapper = mount(ProductDetailView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    wrapper.vm.product.available = false;
    await wrapper.vm.$nextTick();
    const boton = wrapper
      .findAll("button")
      .find((b) => b.text().includes("AÑADIR AL PEDIDO"));
    expect(boton.attributes("disabled")).toBeDefined();
  });

  it("habilita el botón cuando el producto está disponible", async () => {
    router.push("/product/1");
    await router.isReady();
    const wrapper = mount(ProductDetailView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    const boton = wrapper
      .findAll("button")
      .find((b) => b.text().includes("AÑADIR AL PEDIDO"));
    expect(boton.attributes("disabled")).toBeUndefined();
  });
});
