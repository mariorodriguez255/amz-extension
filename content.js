let isAutoBooking = false;
const sound = new Audio("https://www.soundjay.com/button/beep-07.wav");

// Función para resaltar los viajes nuevos y agregar el botón de "Reserva Rápida"
function highlightNewTrips(tripElements) {
  tripElements.forEach((trip) => {
    if (!trip.classList.contains("new-trip")) {
      trip.classList.add("new-trip");
      trip.style.backgroundColor = "#FFD700"; // Color dorado llamativo
      sound.play();

      // Crear el botón de reserva rápida
      const quickBookButton = document.createElement("button");
      quickBookButton.textContent = "Reserva Rápida";
      quickBookButton.style.padding = "5px 15px";
      quickBookButton.style.margin = "5px";
      quickBookButton.style.backgroundColor = "#4CAF50";
      quickBookButton.style.color = "white";
      quickBookButton.style.border = "none";
      quickBookButton.style.borderRadius = "5px";
      quickBookButton.style.cursor = "pointer";

      // Añadir el botón de reserva rápida al viaje
      quickBookButton.addEventListener("click", () => {
        const bookButton = trip.querySelector("button[data-test='book']");
        if (bookButton) {
          bookButton.click(); // Simula el clic en el botón de "Reservar"
          alert("¡Viaje reservado con éxito!");
        }
      });

      // Añadir el botón de reserva rápida a la UI del viaje
      trip.appendChild(quickBookButton);
    }
  });
}

// Función para observar los viajes nuevos
function observeTrips() {
  const container = document.querySelector("div[data-test='trip-list-container']");
  if (!container) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newTrips = Array.from(mutation.addedNodes).filter(
        (node) => node.nodeType === 1 && node.matches("div[data-test='trip']")
      );

      if (newTrips.length > 0) {
        highlightNewTrips(newTrips);
      }
    });
  });

  observer.observe(container, { childList: true, subtree: true });
}

// Iniciar la observación de los viajes
observeTrips();