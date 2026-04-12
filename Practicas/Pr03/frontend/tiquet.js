function renderOrder() {
	const orderData = JSON.parse(localStorage.getItem("tiquet"));

    document.getElementById("order-id").textContent = orderData.id;
    
    const dateObj = new Date(orderData.fecha);
    document.getElementById("order-date").textContent = dateObj.toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const listContainer = document.getElementById("receipt-items-list");
    listContainer.innerHTML = "";

    orderData.items.forEach(item => {
        listContainer.innerHTML += `
            <article class="receipt-item">
                <div class="item-desc">
                    <h4>ID: ${item.camisetaId}</h4>
                    <p>
                        <span class="options-label">Talla: ${item.talla}</span>
                        <span class="options-label">Color: ${item.color}</span>
                        <span class="options-label">Cantidad: ${item.cantidad}</span>
                    </p>
                </div>
                <div class="item-total-box">
                    <span class="item-subtotal">${item.subtotal.toFixed(2)}€</span>
                    <span class="item-unit-price">${item.precioUnitario.toFixed(2)}€ / unidad</span>
                </div>
            </article>
        `;
    });

    document.getElementById("final-subtotal").textContent = orderData.total.toFixed(2) + "€";
    document.getElementById("final-total").textContent = orderData.total.toFixed(2) + "€";
}
