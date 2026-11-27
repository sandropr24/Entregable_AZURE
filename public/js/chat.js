
const formulario = document.getElementById("form-chat");
const entrada = document.getElementById("mensaje");
const mensajes = document.getElementById("mensajes");
const enviar = document.getElementById("enviar");

let chatId = null;

function agregarMensaje(texto, tipo) {
    const elemento = document.createElement("div");
    elemento.className = `mensaje ${tipo}`;

    if (tipo === "bot" && window.marked && window.DOMPurify) {
        elemento.innerHTML = DOMPurify.sanitize(
            marked.parse(texto, { breaks: true })
        );
    } else {
        elemento.textContent = texto;
    }

    mensajes.appendChild(elemento);
    mensajes.scrollTop = mensajes.scrollHeight;
    return elemento;
}

agregarMensaje(
    "¡Hola! 👋 Soy el asistente virtual de STOREFINAL. ¿En qué puedo ayudarte?",
    "bot"
);

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const mensaje = entrada.value.trim();
    if (!mensaje || enviar.disabled) return;

    agregarMensaje(mensaje, "usuario");
    entrada.value = "";
    entrada.disabled = true;
    enviar.disabled = true;
    estadoRobot("pensando");

    const espera = agregarMensaje("Escribiendo...", "bot");

    try {
        const respuesta = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(chatId ? { "X-Chat-Id": chatId } : {})
            },
            body: JSON.stringify({ mensaje })
        });

        if (!respuesta.ok) {
            throw new Error("Error al consultar el asistente");
        }

        const datos = await respuesta.json();
        chatId = datos.chatId ?? null;

        espera.remove();
        agregarMensaje(datos.respuesta || "No pude generar una respuesta.", "bot");
        estadoRobot("respondiendo");
    } catch (error) {
        espera.remove();
        agregarMensaje("Lo siento, ocurrió un error. Inténtalo nuevamente.", "bot");
        estadoRobot("error");
        console.error(error);
    } finally {
        entrada.disabled = false;
        enviar.disabled = false;
        entrada.focus();
    }
});
