let vielas = [];
let inventars = [];

async function start() {
  try {
    let v = await fetch("vielas.json");
    let i = await fetch("inventars.json");

    if (!v.ok || !i.ok) {
      throw new Error("Neizdevās ielādēt JSON failus");
    }

    vielas = await v.json();
    inventars = await i.json();

    radit([...vielas, ...inventars]);

  } catch (err) {
    console.error(err);
  }
}

function radit(dati) {
  let tabula = document.getElementById("tabula");

  if (!tabula) {
    console.error("Nav atrasts elements ar id 'tabula'");
    return;
  }

  tabula.innerHTML = "";

  dati.forEach(x => {
    tabula.innerHTML += `
      <tr>
        <td>${x.id ?? ""}</td>
        <td>${x.nosaukums ?? ""}</td>
        <td>${x.skaits ?? ""}</td>
      </tr>
    `;
  });
}

function filtrs() {
  let f = document.getElementById("filtrs").value;

  if (f === "vielas") {
    radit(vielas);
  } 
  else if (f === "inventars") {
    radit(inventars);
  } 
  else {
    radit([...vielas, ...inventars]);
  }
}

let visiDati = [];
let aktivaisFiltrs = "visi";
;