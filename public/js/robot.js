
const robot = document.getElementById("robot");
const ventanaChat = document.getElementById("ventana-chat");
const cerrarChat = document.getElementById("cerrar-chat");

let temporizadorRobot;

function estadoRobot(estado = "normal") {
    clearTimeout(temporizadorRobot);
    robot.classList.remove("pensando", "respondiendo", "error");

    if (estado !== "normal") {
        robot.classList.add(estado);
    }

    if (estado === "respondiendo" || estado === "error") {
        temporizadorRobot = setTimeout(() => estadoRobot(), 2000);
    }
}

robot.addEventListener("click", () => {
    const abrir = ventanaChat.classList.contains("oculto");

    ventanaChat.classList.toggle("oculto", !abrir);
    robot.setAttribute("aria-expanded", String(abrir));

    if (abrir) document.getElementById("mensaje").focus();
});

cerrarChat.addEventListener("click", () => {
    ventanaChat.classList.add("oculto");
    robot.setAttribute("aria-expanded", "false");
    robot.focus();
});
