document.getElementById("enable-quickbook").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs.id,
      { action: "enableQuickBook" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log(response);
        }
      }
    );
  });
});

document.getElementById("disable-quickbook").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs.id,
      { action: "disableQuickBook" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log(response);
        }
      }
    );
  });
});

// Añadir un nuevo botón para activar/desactivar el sonido
const toggleSoundButton = document.createElement("button");
toggleSoundButton.textContent = "Activar/Desactivar Sonido";
toggleSoundButton.id = "toggle-sound";
document.body.appendChild(toggleSoundButton);

// Añadir un event listener al nuevo botón
toggleSoundButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs.id, // Corregido: se debe acceder al ID de la pestaña mediante tabs.id
      { action: "toggleSound" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log(response);
          // Actualizar el texto del botón según el estado del sonido
          toggleSoundButton.textContent = response.soundEnabled
            ? "Desactivar Sonido"
            : "Activar Sonido";
        }
      }
    );
  });
});
