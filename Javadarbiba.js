let visiDati = [];
let aktivaisFiltrs = "visi";

async function ieladetDatus() {
  try {
    const inventarsResponse = await fetch("./inventars.json");
    if (!inventarsResponse.ok) {
      throw new Error(`Neizdevās ielādēt inventars.json: ${inventarsResponse.status} ${inventarsResponse.statusText}`);
    }
    const vielasResponse = await fetch("./vielas.json");
    if (!vielasResponse.ok) {
      throw new Error(`Neizdevās ielādēt vielas.json: ${vielasResponse.status} ${vielasResponse.statusText}`);
    }

    const inventars = await inventarsResponse.json();
    const vielas = await vielasResponse.json();

    const inventaraDati = inventars.map(item => ({
      ...item,
      kategorija: "inventars",
      svarsDaudzums: `${item.daudzums ?? "-"}${item.mervienibas ? " " + item.mervienibas.trim() : ""}`
    }));

    const vieluDati = vielas.map(item => ({
      ...item,
      kategorija: "viela",
      svarsDaudzums: `${item.daudzums ?? "-"} ${(item.mervienibas ?? "").trim()}`
    }));

    visiDati = [...inventaraDati, ...vieluDati];
    atjaunotTabulu();
        } catch (error) {
    console.error("Kļūda ielādējot datus:", error);
  }
}

function atjaunotTabulu() {
  const tbody = document.getElementById("tableBody");
  if (!tbody) {
    console.warn('Element with id "tableBody" not found.');
    return;
  }
  const meklejums = document.getElementById("searchInput").value.toLowerCase();

  let filtrētieDati = visiDati;

  if (aktivaisFiltrs === "viela") {
    filtrētieDati = filtrētieDati.filter(item => item.kategorija === "viela");
  } else if (aktivaisFiltrs === "inventars") {
    filtrētieDati = filtrētieDati.filter(item => item.kategorija === "inventars");
  }

  if (meklejums) {
    filtrētieDati = filtrētieDati.filter(item =>
      String(item.id).toLowerCase().includes(meklejums) ||
      (item.nosaukums || "").toLowerCase().includes(meklejums) ||
      (item.tips || "").toLowerCase().includes(meklejums) ||
      (item.apakstips || "").toLowerCase().includes(meklejums) ||
      (item.komentari || "").toLowerCase().includes(meklejums)
    );
  }

  tbody.innerHTML = "";

  filtrētieDati.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.id ?? ""}</td>
      <td>${item.nosaukums ?? ""}</td>
      <td>${item.tips ?? ""}</td>
      <td>${item.apakstips ?? ""}</td>
      <td>${item.skaits ?? ""}</td>
      <td>${item.svarsDaudzums ?? "-"}</td>
      <td>${item.komentari ?? ""}</td>
    `;

    tbody.appendChild(row);
  });
}

function uzstaditAktivoPogu(pogasId) {
  document.querySelectorAll(".toolbar button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(pogasId).classList.add("active");
}

document.getElementById("showAllBtn").addEventListener("click", () => {
  aktivaisFiltrs = "visi";
  uzstaditAktivoPogu("showAllBtn");
  atjaunotTabulu();
});

document.getElementById("showVielasBtn").addEventListener("click", () => {
  aktivaisFiltrs = "viela";
  uzstaditAktivoPogu("showVielasBtn");
  atjaunotTabulu();
});

document.getElementById("showInventarsBtn").addEventListener("click", () => {
  aktivaisFiltrs = "inventars";
  uzstaditAktivoPogu("showInventarsBtn");
  atjaunotTabulu();
});

document.getElementById("searchInput").addEventListener("input", atjaunotTabulu);

ieladetDatus();