let isAutoBooking = false;
let soundEnabled = true; // Opción para activar/desactivar el sonido
const sound = new Audio(chrome.runtime.getURL("beep-07.wav"));

// Función para resaltar los viajes nuevos y agregar el botón de "Reserva Rápida"
function highlightNewTrips(tripElements) {
    tripElements.forEach((trip) => {
        if (!trip.classList.contains("new-trip")) {
            try {
                trip.classList.add("new-trip");
                trip.style.backgroundColor = "#FFD700";
                if (soundEnabled) {
                    sound.play().catch(error => console.error("Error playing sound:", error));
                }

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
                    const bookButton = trip.querySelector("button[data-test='book-trip']");
                    if (bookButton &&!isAutoBooking) {
                        isAutoBooking = true;
                        bookButton.click();
                        alert("¡Viaje reservado con éxito!");
                        setTimeout(() => {
                            isAutoBooking = false;
                        }, 2000);
                    } else {
                        console.error("Error: Book button not found or auto booking in progress.");
                    }
                });

                // Añadir el botón de reserva rápida a la UI del viaje
                trip.querySelector("div[data-test='trip-card-details']").appendChild(quickBookButton);
            } catch (error) {
                console.error("Error al resaltar el viaje o agregar el botón de reserva rápida:", error);
            }
        }
    });
}

// Función para observar los viajes nuevos
function observeTrips() {
    const container = document.querySelector("div[data-test='trip-container']");
    if (!container) {
        console.warn("Trip container not found. Retrying in 2 seconds...");
        setTimeout(observeTrips, 2000);
        return;
    }

    // Observar solo los cambios en los elementos de la lista de viajes
    const listItems = container.querySelectorAll("div[data-test^='trip-card']");
    if (listItems.length > 0) {
        const observer = new MutationObserver((mutations) => {
            highlightNewTrips(Array.from(listItems)); // Resaltar los nuevos viajes en la lista
        });

        listItems.forEach(listItem => {
            observer.observe(listItem, { childList: true, subtree: false });
        });
    } else {
        console.warn("Trip list items not found. Retrying in 2 seconds...");
        setTimeout(observeTrips, 2000);
    }
}

// Iniciar la observación de los viajes
observeTrips();

// Escucha los mensajes enviados desde el popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Mensaje recibido:", request);
    if (request.action === "enableQuickBook") {
        observeTrips();
        sendResponse({ status: "quickbook_enabled" });
    } else if (request.action === "disableQuickBook") {
        sendResponse({ status: "quickbook_disabled" });
    } else if (request.action === "toggleSound") {
        soundEnabled =!soundEnabled; // Cambiar el estado del sonido
        sendResponse({ soundEnabled: soundEnabled });
    }
});