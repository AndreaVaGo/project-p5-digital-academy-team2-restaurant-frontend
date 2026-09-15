import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import AdminProductsView from "../../Views/AdminProductsView.vue";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.reject(new Error("sin backend"))),
  );
});

describe("AdminProductsView", () => {
  it("cae a los datos de ejemplo si el backend no responde", async () => {
    const wrapper = mount(AdminProductsView);
    await flushPromises();
    expect(wrapper.vm.products.length).toBeGreaterThan(0);
    expect(wrapper.vm.errorCarga).toBe(true);
  });

  it("filtra los productos por categoría", async () => {
    const wrapper = mount(AdminProductsView);
    await flushPromises();
    wrapper.vm.activeCategory = "Bebidas";
    await wrapper.vm.$nextTick();
    expect(
      wrapper.vm.filteredProducts.every((p) => p.category === "Bebidas"),
    ).toBe(true);
  });

  it("cambia el estado de disponibilidad al hacer toggle", async () => {
    const wrapper = mount(AdminProductsView);
    await flushPromises();
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: async () => ({}) })),
    );
    const producto = wrapper.vm.products[0];
    const estadoInicial = producto.available;
    await wrapper.vm.toggleAvailability(producto.id);
    expect(producto.available).toBe(!estadoInicial);
  });
});
