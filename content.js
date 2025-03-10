document.addEventListener("DOMContentLoaded", detectLoads);
if (document.readyState === "complete") {
  detectLoads();
}

function detectLoads() {
  setInterval(() => {
    const loads = document.querySelectorAll(".load-card");
    if (loads.length > 0) {
      console.log(`Encontradas ${loads.length} cargas disponibles.`);
      loads.forEach((load) => {
        console.log(load.innerText);
        addQuickBookButton(load);
      });
    } else {
      console.log("No se encontraron cargas disponibles.");
    }
  }, 3000); // Escanea cada 3 segundos
}

function addQuickBookButton(load) {
  if (!load.querySelector(".quick-book-btn")) {
    const quickBookBtn = document.createElement("button");
    quickBookBtn.innerText = "Reserva Rápida";
    quickBookBtn.className = "quick-book-btn";
    quickBookBtn.style.marginLeft = "10px";
    quickBookBtn.style.padding = "5px";
    quickBookBtn.style.backgroundColor = "#ff9800";
    quickBookBtn.style.color = "white";
    quickBookBtn.style.border = "none";
    quickBookBtn.style.cursor = "pointer";
    quickBookBtn.style.position = "absolute";
    quickBookBtn.style.right = "10px";
    quickBookBtn.style.top = "10px";
    quickBookBtn.style.zIndex = "1000";

    quickBookBtn.addEventListener("click", () => {
      attemptBooking(load);
    });

    load.style.position = "relative";
    load.appendChild(quickBookBtn);
  }
}

function attemptBooking(load) {
  const bookButton = load.querySelector("button.book");
  if (bookButton) {
    console.log("Intentando reservar carga...");
    bookButton.click();
    setTimeout(() => {
      const confirmButton = load.querySelector("button.confirm");
      if (confirmButton) {
        confirmButton.click();
        console.log("Reserva confirmada");
      } else {
        console.log("No se encontró el boton de confirmacion");
      }
    }, 1000);
  } else {
    console.log("No se encontro el boton de reserva en esta carga.");
  }
}