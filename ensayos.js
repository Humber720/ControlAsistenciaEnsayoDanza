let ausentes = [];
let cursoActual = null; // Guardamos el curso actual

// 🎓 Todos los cursos con su código y lista de estudiantes
const cursos = {
  "Danna1234": {
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
  },
  "Carlos123": {
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
  "Ana123": {
    nombre: "4to Secundaria",
    estudiantes: [
      "Ejemplo Estudiante 1",
      "Ejemplo Estudiante 2",
      "Ejemplo Estudiante 3"
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
    generarLista();
  } else {
    error.textContent = "Código incorrecto. Intente nuevamente.";
  }
}

// 🧾 Genera la lista de estudiantes según el curso
function generarLista() {
  const lista = document.getElementById("listaEstudiantes");
  lista.innerHTML = ""; // Limpiar lista anterior
  ausentes = []; // Reiniciar ausentes

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

// ➕ Agregar seleccionados a la lista de ausentes
function agregarSeleccionados() {
  const seleccionados = Array.from(document.querySelectorAll("#listaEstudiantes input:checked"))
    .map(chk => chk.value);

  seleccionados.forEach(nombre => {
    if (!ausentes.includes(nombre)) ausentes.push(nombre);
  });

  // Desmarcar todos los checks
  document.querySelectorAll("#listaEstudiantes input").forEach(chk => chk.checked = false);
  mostrarAusentes();
}

// 📋 Mostrar ausentes en pantalla
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
    div.innerHTML = `
      <span>${nombre}</span>
      <button onclick="eliminarAusente(${index})">❌ Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

// ❌ Eliminar un ausente
function eliminarAusente(indice) {
  ausentes.splice(indice, 1);
  mostrarAusentes();
}

// 💾 Guardar en PDF
function guardarPDF() {
  if (ausentes.length === 0) {
    alert("No hay ausentes para guardar.");
    return;
  }

  const fecha = new Date();
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  const hora = fecha.toLocaleTimeString();
  const fechaFormateada = fecha.toLocaleDateString('es-BO', opciones);

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`Registro de Ensayo de Danza - ${cursoActual.nombre}`, 10, 15);

  doc.setFontSize(11);
  doc.text(`Fecha: ${fechaFormateada}`, 10, 25);
  doc.text(`Hora: ${hora}`, 150, 25);

  doc.setFontSize(12);
  doc.text("Estudiantes ausentes:", 10, 35);

  ausentes.forEach((nombre, i) => {
    const y = 45 + i * 8;
    if (y > 270) {
      doc.addPage();
      doc.setFontSize(12);
      doc.text("Continuación de lista de ausentes:", 10, 15);
    }
    doc.text(`${i + 1}. ${nombre}`, 10, y);
  });

  doc.save(`Ausentes_${cursoActual.nombre}_${fechaFormateada.replace(/\s/g, "_")}.pdf`);
}

// 🚪 Salir del formulario
function salir() {
  if (confirm("¿Desea salir del formulario?")) {
    location.reload();
  }
}

// 👁️ Mostrar/Ocultar contraseña
function togglePassword() {
  const input = document.getElementById("codigoInput");
  const icon = document.querySelector(".toggle-password");

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}

// Seleccionamos todos los botones con la clase
const themeButtons = document.querySelectorAll(".toggleThemeBtn");

themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    // Cambiamos el texto de todos los botones
    const modo = document.body.classList.contains("dark-mode") ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
    themeButtons.forEach(b => b.textContent = modo);
  });
});
