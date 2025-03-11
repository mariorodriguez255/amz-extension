document.addEventListener("DOMContentLoaded", detectLoads);
if (document.readyState === "complete") {
  detectLoads();
}

function detectLoads() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains("load-card")) {
            console.log(`Encontrada nueva carga disponible.`);
            console.log(node.innerText);
            addQuickBookButton(node);
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Verificar si ya existen elementos .load-card al cargar la página
  const initialLoads = document.querySelectorAll(".load-card");
  if (initialLoads.length > 0) {
    console.log(`Encontradas ${initialLoads.length} cargas disponibles.`);
    initialLoads.forEach((load) => {
      console.log(load.innerText);
      addQuickBookButton(load);
    });
  } else {
    console.log("No se encontraron cargas disponibles.");
  }
}

function addQuickBookButton(load) {
  if (!load.querySelector(".quick-book-btn")) {
    const quickBookBtn = document.createElement("button");
    quickBookBtn.innerText = "Reserva Rápida";
    quickBookBtn.className = "quick-book-btn";

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
        console.error("No se encontró el botón de confirmación");
      }
    }, 1000);
  } else {
    console.error("No se encontró el botón de reserva en esta carga.");
  }
}