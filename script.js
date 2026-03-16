let vielas = [];
let inventars = [];

async function ieladet() {

    const v = await fetch("vielas.json");
    vielas = await v.json();

    const i = await fetch("inventars.json");
    inventars = await i.json();

    raditTabulu([...vielas, ...inventars]);
}

function raditTabulu(dati) {

    let tabula = document.getElementById("tabula");
    tabula.innerHTML = "";

    dati.forEach(x => {

        let rinda = `
        <tr>
            <td>${x.id}</td>
            <td>${x.nosaukums}</td>
            <td>${x.tips}</td>
            <td>${x.apakstips}</td>
            <td>${x.skaits}</td>
            <td>${x.komentari || ""}</td>
        </tr>
        `;

        tabula.innerHTML += rinda;
    });
}

function filtrēt(){

    let izvele = document.getElementById("filtrs").value;

    if(izvele == "vielas"){
        raditTabulu(vielas);
    }

    else if(izvele == "inventars"){
        raditTabulu(inventars);
    }

    else{
        raditTabulu([...vielas, ...inventars]);
    }
}

window.onload = ieladet;
