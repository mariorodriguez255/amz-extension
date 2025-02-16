document.getElementById("enable-quickbook").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "enableQuickBook" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log(response);
            }
        });
    });
});

document.getElementById("disable-quickbook").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "disableQuickBook" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log(response);
            }
        });
    });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "enableQuickBook" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error al enviar el mensaje:", chrome.runtime.lastError);
            } else {
                console.log("Respuesta recibida:", response);
            }
        });
    } else {
        console.error("No hay pestañas activas.");
    }
});

// Añadir un nuevo botón para activar/desactivar el sonido
const toggleSoundButton = document.createElement("button");
toggleSoundButton.textContent = "Activar/Desactivar Sonido";
toggleSoundButton.id = "toggle-sound";
document.body.appendChild(toggleSoundButton);

// Añadir un event listener al nuevo botón
toggleSoundButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs.id, { action: "toggleSound" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log(response);
                // Actualizar el texto del botón según el estado del sonido
                toggleSoundButton.textContent = response.soundEnabled? "Desactivar Sonido": "Activar Sonido";
            }
        });
    });
});