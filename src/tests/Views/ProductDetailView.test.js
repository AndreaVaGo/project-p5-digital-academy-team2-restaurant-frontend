import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import ProductDetailView from "../../Views/Menu/ProductDetailView.vue";

const createTestRouter = async () => {
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

  router.push("/product/1");
  await router.isReady();

  return router;
};

const mockProduct = {
  id: 1,
  name: "Fabada Asturiana",
  description: "Plato tradicional asturiano",
  image: "/images/fabada.jpg",
  price: 12.5,
  available: true,
};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => mockProduct,
      }),
    ),
  );
});

describe("ProductDetailView", () => {
  it("deshabilita el botón de añadir al pedido si el producto no está disponible", async () => {
    const router = await createTestRouter();

    const wrapper = mount(ProductDetailView, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    wrapper.vm.product.available = false;

    await wrapper.vm.$nextTick();

    const boton = wrapper
      .findAll("button")
      .find((button) => button.text().includes("AGOTADO"));

    expect(boton).toBeDefined();
    expect(boton.attributes("disabled")).toBeDefined();
  });

  it("habilita el botón cuando el producto está disponible", async () => {
    const router = await createTestRouter();

    const wrapper = mount(ProductDetailView, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    const boton = wrapper
      .findAll("button")
      .find((button) => button.text().includes("AÑADIR AL PEDIDO"));

    expect(boton).toBeDefined();
    expect(boton.attributes("disabled")).toBeUndefined();
  });
});