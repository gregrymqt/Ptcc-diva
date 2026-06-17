import { getOrders } from "../../checkout/services/checkoutServices.js";
import { AdminOrdersComponent } from "../../checkout/components/AdminOrdersComponent.js";

export function carregarModuloPedidos() {
    var dadosPedidos = getOrders();
    var htmlLista = AdminOrdersComponent(dadosPedidos);
    
    var containerLista = document.getElementById("admin-orders-list");
    if (containerLista) {
        containerLista.innerHTML = htmlLista;
    }
}
