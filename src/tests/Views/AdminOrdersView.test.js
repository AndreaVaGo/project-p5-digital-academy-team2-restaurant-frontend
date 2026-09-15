import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AdminOrdersView from "../../Views/AdminOrdersView.vue";

describe("AdminOrdersView", () => {
  it("cuenta correctamente los pedidos activos", () => {
    const wrapper = mount(AdminOrdersView);
    expect(wrapper.vm.counts.activos).toBe(3);
  });

  it("filtra solo los pedidos cancelados al seleccionar esa pestaña", async () => {
    const wrapper = mount(AdminOrdersView);
    wrapper.vm.activeTab = "cancelados";
    await wrapper.vm.$nextTick();
    expect(
      wrapper.vm.filteredOrders.every((o) => o.status === "cancelado"),
    ).toBe(true);
  });
});
