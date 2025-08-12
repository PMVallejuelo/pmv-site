// Lee un CSV publicado desde Google Sheets y llena la tabla de agentes activos.
// 1) Publica tu Google Sheet: Archivo -> Compartir -> Publicar en la web -> Hoja "Activos" -> CSV
// 2) Copia el enlace y pégalo abajo en SHEET_CSV_URL.

const SHEET_CSV_URL = "REEMPLAZA_GOOGLE_SHEETS_CSV_URL"; // <- pega aquí tu URL CSV publicado

async function fetchCSV(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo leer el CSV");
  return await res.text();
}

function parseCSV(csvText) {
  // Parseo simple; asume comas como separador y que las comillas están bien formadas
  const rows = csvText.trim().split(/\r?\n/).map(r => {
    // Divide respetando comillas
    const out = [];
    let cur = "", inQuotes = false;
    for (let i = 0; i < r.length; i++) {
      const ch = r[i];
      if (ch === '"') {
        if (inQuotes && r[i+1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        out.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur.trim());
    return out;
  });
  return rows;
}

function renderTable(rows) {
  // Espera encabezados: #, NOMBRE, RANGO, MATRÍCULA/PLACA, UNIDAD/SECTOR, ESTADO, OBSERVACIÓN
  const tbody = document.querySelector("#tabla-agentes tbody");
  tbody.innerHTML = "";

  const headers = rows[0].map(h => h.toUpperCase());
  const idxNombre = headers.indexOf("NOMBRE");
  const idxRango = headers.indexOf("RANGO");
  const idxMat = headers.findIndex(h => h.includes("MATR"));
  const idxUnidad = headers.findIndex(h => h.includes("UNIDAD"));
  const idxEstado = headers.indexOf("ESTADO");

  let count = 0;
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const estado = (r[idxEstado] || "").toLowerCase();
    if (estado !== "activo") continue;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${++count}</td>
      <td>${r[idxNombre] || ""}</td>
      <td>${r[idxRango] || ""}</td>
      <td>${r[idxMat] || ""}</td>
      <td>${r[idxUnidad] || ""}</td>
    `;
    tbody.appendChild(tr);
  }
  document.getElementById("last-update").textContent = "Actualizado: " + new Date().toLocaleString();
  attachSearch();
}

function attachSearch() {
  const input = document.getElementById("search");
  const rows = [...document.querySelectorAll("#tabla-agentes tbody tr")];
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    rows.forEach(tr => {
      const txt = tr.textContent.toLowerCase();
      tr.style.display = txt.includes(q) ? "" : "none";
    });
  });
}

async function main() {
  if (!SHEET_CSV_URL || SHEET_CSV_URL.includes("REEMPLAZA_")) {
    console.warn("Define SHEET_CSV_URL en assets/js/activos.js");
    // Render de ejemplo por si aún no hay CSV
    const sample = [
      ["#", "NOMBRE", "RANGO", "MATRÍCULA/PLACA", "UNIDAD/SECTOR", "ESTADO", "OBSERVACIÓN"],
      ["", "JUAN PÉREZ", "Raso", "PMV-001", "Centro", "Activo", ""],
      ["", "MARÍA GÓMEZ", "Cabo", "PMV-014", "Norte", "Activo", ""],
      ["", "DANY MONTERO", "Raso", "PMV-099", "Oeste", "Suspendido", ""]
    ];
    renderTable(sample);
    return;
  }
  try {
    const csv = await fetchCSV(SHEET_CSV_URL);
    const rows = parseCSV(csv);
    renderTable(rows);
  } catch (err) {
    console.error(err);
    alert("No se pudo cargar el listado. Intente más tarde.");
  }
}

document.addEventListener("DOMContentLoaded", main);
