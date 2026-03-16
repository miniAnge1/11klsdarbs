let vielas = [];
let inventars = [];

async function start() {

    let v = await fetch("vielas.json");
    vielas = await v.json();

    let i = await fetch("inventars.json");
    inventars = await i.json();

    radit([...vielas, ...inventars]);
}

function radit(dati){

    let tabula = document.getElementById("tabula");
    tabula.innerHTML = "";

    dati.forEach(x => {

        tabula.innerHTML += `
        <tr>
        <td>${x.id}</td>
        <td>${x.nosaukums}</td>
        <td>${x.skaits}</td>
        </tr>
        `;
    });
}

function filtrs(){

    let f = document.getElementById("filtrs").value;

    if(f === "vielas"){
        radit(vielas);
    }

    else if(f === "inventars"){
        radit(inventars);
    }

    else{
        radit([...vielas, ...inventars]);
    }
}

start();
