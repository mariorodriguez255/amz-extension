chrome.runtime.onInstalled.addListener(() => {
    try {
        console.log("Extensión de Amazon Relay instalada.");
    } catch (error) {
        console.error("Error al instalar la extensión de Amazon Relay:", error);
    }
});