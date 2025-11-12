let ausentes = [];
let cursoActual = null;

const cursos = {
  "Primero1234": {
    nombre: "1ro Secundaria",
    estudiantes: [
      "ALANOCA RIOS YESICA VALENTINA",
      "AYALA RODRIGUEZ AIRAN JUAN",
      "BALDELLON LAURA VALENTINA",
      "CALLIZAYA PAUCARA ALISON MAYTE",
      "CEREZO ADUVIRI SEBASTIAN DAVIDE",
      "CEREZO ADUVIRI GIORGIO MORIS",
      "CHAMBI GUTIERREZ FABIAN",
      "CHAVEZ LIMACHI SARA SCARLETT",
      "FLORES LOZA SALVADOR DEIVID",
      "LUNA MERLO LEONEL ALEXANDER",
      "MAMANI MENDOZA NAIZETH AYLIN",
      "MAMANI HUANCA YOSIMAR JHOEL",
      "MAMANI QUISPE DENIS",
      "MAMANI MARIN JHAEMY MARBEL",
      "MAMANI APAZA YERCO JHOEL",
      "MARAZA ESPEJO DANIEL",
      "PEREZ GUTIERREZ JOHAN ERLAN",
      "QUISPE CARRILLO ARACELI BRIANCA",
      "QUISPE MAMANI CRISTIAN KEVIN",
      "QUISPE AMARU LIZETH LUNA",
      "ZACARIAS YUJRA DAVID"
    ]
  },
  "Luz123": {
    nombre: "3ro Secundaria",
    estudiantes: [
      "MENDOZA MARCO ANTONIO",
      "ARCE SOLIZ ROY DAVID",
      "ARTEAGA APAZA PRISCILA",
      "AVILE ULLOA LUZ DAYANA",
      "CHAMBI LUNA ANGELA MILAGROS",
      "CHAMBI GUTIERREZ JUAN DE DIOS",
      "CONDORI PAUCARA DINA VALERIA",
      "CONDORI MAMANI MAITE",
      "FLORES LOZA JHONATAN DENNIS",
      "FORA CONDORI JOSE MIGUEL",
      "GONZALES ROSAS JHAN CARLA",
      "GUARACHI CARRILLO ALAN STYBEN",
      "MAMANI LOPEZ GUADALUPE",
      "MAMANI CASTRO FRANKLIN",
      "MATIAS CALLISAYA JHOVANA",
      "MAYTA HERRERA JAQUELINE VALERY",
      "PATZI FRIAS DUBAL SEBASTIAN",
      "POMA PAUCARA TATIANA RUTH",
      "QUISPE ALVARO ERICK BEYMAR",
      "QUISPE QUISPE LUZ NAYELLY",
      "QUISPE MAMANI ALEJANDRA",
      "QUISPE AMARU GENESIS CAMILA",
      "QUISPE CARRILLO GUADALUPE TATIANA",
      "QUISPE MAMANI MELANI PILAR",
      "ROJAS AGUILAR SONIA",
      "ROQUE MENDOZA RAQUEL WARA",
      "SANCHEZ PAUCARA EMILI CLARA",
      "SILLERICO FERNANDEZ SHODIN ALWA",
      "TORREZ ROJAS ZEYLA JHANELA",
      "VALVERDE SANCHEZ VICTOR FERNANDO"
    ]
  },
  "Danna12345": {
    nombre: "5to Secundaria",
    estudiantes: [
      "ALVARADO CARVAJAL ALEXIS SANTIAGO",
      "ARTEAGA APAZA VIANCA ANALIA",
      "CASTILLO FLORES YAMIL DEYMAR",
      "CHAMBI GUTIERREZ ANGEL",
      "CHOQUETARQUI ERGUETA MAYRA DANETZA",
      "ESPEJO CHAVEZ YHENY KEILA",
      "HUALLPARA CRUZ FERNANDO ISRAEL",
      "LOPEZ CACHI ANELIZ",
      "LUCANA LLANQUECHOQUE DIEGO LEONEL",
      "MENDOZA AMORAGA NATALIA LILIANA",
      "PAUCARA MAMANI ISRAEL",
      "QUISPE LIMACHI ELVIS PABLO",
      "QUISPE MAMANI MARIANA",
      "QUISPE QUISPE DANER",
      "QUISPE POMA DANNA MARICELA",
      "QUISPE PAUCARA CLIVER ADEMAR",
      "RAMOS PAUCARA DELIA JHOSELIN",
      "REYES RIVEROS MUKTI RAMIRO",
      "SOLAR ALBA DEIVIS ALEXANDER",
      "SUXO CACERES ANA CAROLINA",
      "VALVERDE SANCHEZ NATALIA",
      "VARGAS ROJAS SHARIE MILAGROS",
      "VELASCO ULO JAZMINE ABIGAIL",
      "YARARI QUISPE ARIEL WILSON",
      "FERRANO MOLLO EDSON DIEGO"
    ]
  }
};

// 🔐 Verifica el código
function verificarCodigo() {
  const codigo = document.getElementById("codigoInput").value.trim();
  const error = document.getElementById("mensajeError");

  if (cursos[codigo]) {
    cursoActual = cursos[codigo];
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("formSection").classList.remove("hidden");
    document.getElementById("tituloCurso").textContent = `Ensayo de Danza - ${cursoActual.nombre}`;
    generarLista();
  } else {
    error.textContent = "Código incorrecto. Intente nuevamente.";
  }
}

// 🧾 Generar lista
function generarLista() {
  const lista = document.getElementById("listaEstudiantes");
  lista.innerHTML = "";
  ausentes = [];

  cursoActual.estudiantes.forEach(nombre => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = nombre;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + nombre));
    lista.appendChild(label);
  });
}

function agregarSeleccionados() {
  const seleccionados = Array.from(document.querySelectorAll("#listaEstudiantes input:checked"))
    .map(chk => chk.value);
  seleccionados.forEach(nombre => {
    if (!ausentes.includes(nombre)) ausentes.push(nombre);
  });
  document.querySelectorAll("#listaEstudiantes input").forEach(chk => chk.checked = false);
  mostrarAusentes();
}

function mostrarAusentes() {
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "<h3>Ausentes Registrados:</h3>";
  if (ausentes.length === 0) {
    contenedor.innerHTML += "<p>No hay estudiantes ausentes.</p>";
    return;
  }
  ausentes.forEach((nombre, index) => {
    const div = document.createElement("div");
    div.className = "ausente-item";
    div.innerHTML = `<span>${nombre}</span><button onclick="eliminarAusente(${index})">❌</button>`;
    contenedor.appendChild(div);
  });
}

function eliminarAusente(i) {
  ausentes.splice(i, 1);
  mostrarAusentes();
}

function guardarPDF() {
  if (ausentes.length === 0) return alert("No hay ausentes para guardar.");

  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' });
  const hora = fecha.toLocaleTimeString();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`Ensayo de Danza - ${cursoActual.nombre}`, 10, 15);
  doc.setFontSize(11);
  doc.text(`Fecha: ${fechaFormateada} | Hora: ${hora}`, 10, 25);
  doc.setFontSize(12);
  doc.text("Estudiantes Ausentes:", 10, 35);

  ausentes.forEach((n, i) => doc.text(`${i + 1}. ${n}`, 10, 45 + i * 8));
  doc.save(`Ausentes_${cursoActual.nombre}_${fechaFormateada.replace(/\s/g, "_")}.pdf`);
}

function salir() {
  if (confirm("¿Desea salir del formulario?")) location.reload();
}

function togglePassword() {
  const input = document.getElementById("codigoInput");
  const icon = document.querySelector(".toggle-password");
  if (input.type === "password") { input.type = "text"; icon.textContent = "🙈"; }
  else { input.type = "password"; icon.textContent = "👁️"; }
}

// 🌙 Modo oscuro
document.querySelectorAll(".toggleThemeBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modo = document.body.classList.contains("dark-mode") ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
    document.querySelectorAll(".toggleThemeBtn").forEach(b => b.textContent = modo);
  });
});
