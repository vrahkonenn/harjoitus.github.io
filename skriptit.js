function muuta_tuote_amount(tuotenimi, alkuperainen, muutos){
    uusi_value = parseInt(alkuperainen) + muutos;

    if (uusi_value <0) {
        uusi_value = 0
    }

    document.getElementById(tuotenimi).value = uusi_value
}

function lisaa_koriin(tuotenimi, hinta, tuotemaara) {
    if (tuotemaara > 0) {
        const hintatiedot = [hinta, tuotemaara]
        localStorage.setItem(tuotenimi, JSON.stringify(hintatiedot));
    }
}

function poista_tuote(tuotenimi) {
    localStorage.removeItem(tuotenimi);
    paivitaKori();
    paivitaYhteensa();
}

function paivitaHinta(hinta, maara, tuoteID, tuote) {
    if (maara <0) {
        maara = 0
        document.getElementById(tuote).value = 0
    }

    let uusihinta = parseFloat(hinta)*parseInt(maara);

    document.getElementById(tuoteID).innerHTML = uusihinta.toFixed(2) + " €";
    paivitaYhteensa();
}

function paivitaYhteensa() {
    tuotemaarat = 0;
    hintayht = 0;
    if (localStorage.getItem('maito')) {
        tuotemaarat += parseInt(document.getElementById('maitomaara').value);
        hintayht += 3.45 * parseInt(document.getElementById('maitomaara').value);
        document.getElementById('input-maito').value = document.getElementById('maitomaara').value; 
    }
    if (localStorage.getItem('kivi')) {
        tuotemaarat += parseInt(document.getElementById('kivimaara').value); 
        hintayht += 99.95 * parseInt(document.getElementById('kivimaara').value); 
        document.getElementById('input-kivi').value = document.getElementById('kivimaara').value;
    }
    if (localStorage.getItem('puhelin')) {
        tuotemaarat += parseInt(document.getElementById('puhelinmaara').value);
        hintayht += 12.30 * parseInt(document.getElementById('puhelinmaara').value);
        document.getElementById('input-puhelin').value = document.getElementById('puhelinmaara').value;
    }
    if (localStorage.getItem('kalja')) {
        tuotemaarat += parseInt(document.getElementById('kaljamaara').value); 
        hintayht += 5.00 * parseInt(document.getElementById('kaljamaara').value);
        document.getElementById('input-kalja').value = document.getElementById('kaljamaara').value;
    }
    if (localStorage.getItem('viivoitin')) {
        tuotemaarat += parseInt(document.getElementById('viivoitinmaara').value);
        hintayht += 0.50 * parseInt(document.getElementById('viivoitinmaara').value);
        document.getElementById('input-viivoitin').value = document.getElementById('viivoitinmaara').value;
    }
    if (localStorage.getItem('taksari')) {
        tuotemaarat += parseInt(document.getElementById('taksarimaara').value);
        hintayht += 1.00 * parseInt(document.getElementById('taksarimaara').value);
        document.getElementById('input-taksari').value = document.getElementById('taksarimaara').value;
    }
    if (localStorage.getItem('auto')) {
        tuotemaarat += parseInt(document.getElementById('automaara').value); 
        hintayht += 12000 * parseInt(document.getElementById('automaara').value);
        document.getElementById('input-auto').value = document.getElementById('automaara').value;
    }
    if (localStorage.getItem('sohva')) {
        tuotemaarat += parseInt(document.getElementById('sohvamaara').value);
        hintayht += 7500 * parseInt(document.getElementById('sohvamaara').value);
        document.getElementById('input-sohva').value = document.getElementById('sohvamaara').value;
    }
    if (localStorage.getItem('lamppu')) {
        tuotemaarat += parseInt(document.getElementById('lamppumaara').value);
        hintayht += 50 * parseInt(document.getElementById('lamppumaara').value);
        document.getElementById('input-lamppu').value = document.getElementById('lamppumaara').value;
    }

    if (!localStorage.getItem('maito') && !localStorage.getItem('kivi') && !localStorage.getItem('puhelin') && !localStorage.getItem('kalja') && !localStorage.getItem('viivoitin') && !localStorage.getItem('taksari') && !localStorage.getItem('auto') && !localStorage.getItem('sohva') && !localStorage.getItem('lamppu')) {
        document.getElementById('yhteensa').innerHTML = '';
        document.getElementById('otsikko').innerHTML = '';
        document.getElementById('tyhja').innerHTML = '<h1>VAI ETTÄ OSTOSKORISI ON TYHJÄ!</h1><h2 id="kehoitus">OSTOKSILLE SIITÄ!</h2><img src="../kuvat/vihainen2.png" id="vihanaama">'

    } else {
        tuloste = '<img src="../kuvat/filleri.png" class="tuotekuva" id="filleri">'
        + '<p id="tyhjap"></p>'
        + '<p id="pyht">Yhteensä: </p>'
        + '<p id="tuoteyht">' + tuotemaarat + ' tuotetta</p>'
        + '<p id="hintayht">= ' + hintayht.toFixed(2) + ' €</p>'
        + '<button class="poista" id="nappi-filleri"></button>'

        document.getElementById('yhteensa').innerHTML = tuloste
        
    }
}

function paivitaKori(){
    if (localStorage.getItem('maito')) {
        tiedot = JSON.parse(localStorage.getItem('maito'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/maito.png">'
        + '<p class="tuotenimi">Maito</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('maitomaara', document.getElementById('maitomaara').value, -1); paivitaHinta('3.45', document.getElementById('maitomaara').value, '1',); lisaa_koriin('maito', '3.45', document.getElementById('maitomaara').value);">-</button>`
        + '<input class="input-field" id="maitomaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`3.45`, document.getElementById(`maitomaara`).value, `1`, `maitomaara`);">'
        + `<button onclick="muuta_tuote_amount('maitomaara', document.getElementById('maitomaara').value, 1); paivitaHinta('3.45', document.getElementById('maitomaara').value, '1',); lisaa_koriin('maito', '3.45', document.getElementById('maitomaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="1">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +'€</p>'
        + `<button class="poista" onclick="poista_tuote('maito');">X</button>`

        document.getElementById('tuote_maito').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_maito').innerHTML = ""
    }

    if (localStorage.getItem('kivi')) {
        tiedot = JSON.parse(localStorage.getItem('kivi'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/kivi.png">'
        + '<p class="tuotenimi">Kivi</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('kivimaara', document.getElementById('kivimaara').value, -1); paivitaHinta('99.5', document.getElementById('kivimaara').value, '2'); lisaa_koriin('kivi', '99.95', document.getElementById('kivimaara').value);">-</button>`
        + '<input class="input-field" id="kivimaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`99.5`, document.getElementById(`kivimaara`).value, `2`, `kivimaara`);">'
        + `<button onclick="muuta_tuote_amount('kivimaara', document.getElementById('kivimaara').value, 1); paivitaHinta('99.5', document.getElementById('kivimaara').value, '2'); lisaa_koriin('kivi', '99.95', document.getElementById('kivimaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="2">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('kivi');">X</button>`

        document.getElementById('tuote_kivi').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_kivi').innerHTML = ""
    }

    if (localStorage.getItem('puhelin')) {
        tiedot = JSON.parse(localStorage.getItem('puhelin'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/puhelin.png">'
        + '<p class="tuotenimi">Puhelin</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('puhelinmaara', document.getElementById('puhelinmaara').value, -1); paivitaHinta('12.30', document.getElementById('puhelinmaara').value, '3'); lisaa_koriin('puhelin', '12.30', document.getElementById('puhelinmaara').value);">-</button>`
        + '<input class="input-field" id="puhelinmaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`12.30`, document.getElementById(`puhelinmaara`).value, `3`, `puhelinmaara`);">'
        + `<button onclick="muuta_tuote_amount('puhelinmaara', document.getElementById('puhelinmaara').value, 1); paivitaHinta('12.30', document.getElementById('puhelinmaara').value, '3'); lisaa_koriin('puhelin', '12.30', document.getElementById('puhelinmaara').value);"">+</button>`
        + '</div>'
        + '<p class="hinta" id="3">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('puhelin');">X</button>`

        document.getElementById('tuote_puhelin').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_puhelin').innerHTML = ""
    }

    if (localStorage.getItem('kalja')) {
        tiedot = JSON.parse(localStorage.getItem('kalja'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/kalja.png">'
        + '<p class="tuotenimi">Kalja</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('kaljamaara', document.getElementById('kaljamaara').value, -1); paivitaHinta('5.00', document.getElementById('kaljamaara').value, '4'); lisaa_koriin('kalja', '5.00', document.getElementById('kaljamaara').value);">-</button>`
        + '<input class="input-field" id="kaljamaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`5.00`, document.getElementById(`kaljamaara`).value, `4`, `kaljamaara`);">'
        + `<button onclick="muuta_tuote_amount('kaljamaara', document.getElementById('kaljamaara').value, 1); paivitaHinta('5.00', document.getElementById('kaljamaara').value, '4');  lisaa_koriin('kalja', '5.00', document.getElementById('kaljamaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="4">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('kalja');">X</button>`

        document.getElementById('tuote_kalja').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_kalja').innerHTML = ""
    }

    if (localStorage.getItem('viivoitin')) {
        tiedot = JSON.parse(localStorage.getItem('viivoitin'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/viivoitin.png">'
        + '<p class="tuotenimi">Viivoitin</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('viivoitinmaara', document.getElementById('viivoitinmaara').value, -1); paivitaHinta('0.50', document.getElementById('viivoitinmaara').value, '5'); lisaa_koriin('viivoitin', '0.50', document.getElementById('viivoitinmaara').value);">-</button>`
        + '<input class="input-field" id="viivoitinmaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`0.50`, document.getElementById(`viivoitinmaara`).value, `5`, `viivoitinmaara`);">'
        + `<button onclick="muuta_tuote_amount('viivoitinmaara', document.getElementById('viivoitinmaara').value, 1); paivitaHinta('0.50', document.getElementById('viivoitinmaara').value, '5'); lisaa_koriin('viivoitin', '0.50', document.getElementById('viivoitinmaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="5">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('viivoitin');">X</button>`

        document.getElementById('tuote_viivoitin').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_viivoitin').innerHTML = ""
    }

    if (localStorage.getItem('taksari')) {
        tiedot = JSON.parse(localStorage.getItem('taksari'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/makkaraperunat.png">'
        + '<p class="tuotenimi">Taksari</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('taksarimaara', document.getElementById('taksarimaara').value, -1); paivitaHinta('1.00', document.getElementById('taksarimaara').value, '6'); lisaa_koriin('taksari', '1.00', document.getElementById('taksarimaara').value);">-</button>`
        + '<input class="input-field" id="taksarimaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`1.00`, document.getElementById(`taksarimaara`).value, `6`, `taksarimaara`);">'
        + `<button onclick="muuta_tuote_amount('taksarimaara', document.getElementById('taksarimaara').value, 1); paivitaHinta('1.00', document.getElementById('taksarimaara').value, '6'); lisaa_koriin('taksari', '1.00', document.getElementById('taksarimaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="6">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('taksari');">X</button>`

        document.getElementById('tuote_taksari').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_taksari').innerHTML = ""
    }

    if (localStorage.getItem('auto')) {
        tiedot = JSON.parse(localStorage.getItem('auto'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/auto.png">'
        + '<p class="tuotenimi">Auto</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('automaara', document.getElementById('automaara').value, -1); paivitaHinta('12000', document.getElementById('automaara').value, '7'); lisaa_koriin('auto', '12000', document.getElementById('automaara').value);">-</button>`
        + '<input class="input-field" id="automaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`12000`, document.getElementById(`automaara`).value, `7`, `automaara`);">'
        + `<button onclick="muuta_tuote_amount('automaara', document.getElementById('automaara').value, 1); paivitaHinta('12000', document.getElementById('automaara').value, '7'); lisaa_koriin('auto', '12000', document.getElementById('automaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="7">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('auto');">X</button>`

        document.getElementById('tuote_auto').innerHTML = tuloste;   
    } else {
        document.getElementById('tuote_auto').innerHTML = ""
    }

    if (localStorage.getItem('sohva')) {
        tiedot = JSON.parse(localStorage.getItem('sohva'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/gorillasohva.png">'
        + '<p class="tuotenimi">Gorilla sohva</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('sohvamaara', document.getElementById('sohvamaara').value, -1); paivitaHinta('7500', document.getElementById('sohvamaara').value, '8'); lisaa_koriin('sohva', '7500', document.getElementById('sohvamaara').value);">-</button>`
        + '<input class="input-field" id="sohvamaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`7500`, document.getElementById(`sohvamaara`).value, `8`, `sohvamaara`);">'
        + `<button onclick="muuta_tuote_amount('sohvamaara', document.getElementById('sohvamaara').value, 1); paivitaHinta('7500', document.getElementById('sohvamaara').value, '8'); lisaa_koriin('sohva', '7500', document.getElementById('sohvamaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="8">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('sohva');">X</button>`

        document.getElementById('tuote_sohva').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_sohva').innerHTML = ""
    }

    if (localStorage.getItem('lamppu')) {
        tiedot = JSON.parse(localStorage.getItem('lamppu'))
        tuloste =
        '<img class="tuotekuva" src="../kuvat/lamppu.png">'
        + '<p class="tuotenimi">Kattolamppu</p>'
        + '<p class="tuotehinta">' + tiedot[0] + '€</p>'
        + '<div class="tuotemaara">'
        + `<button onclick="muuta_tuote_amount('lamppumaara', document.getElementById('lamppumaara').value, -1); paivitaHinta('50.00', document.getElementById('lamppumaara').value, '9'); lisaa_koriin('lamppu', '50.00', document.getElementById('lamppumaara').value);">-</button>`
        + '<input class="input-field" id="lamppumaara" value="' + tiedot[1] + '" onchange="paivitaHinta(`50.00`, document.getElementById(`lamppumaara`).value, `9`, `lamppumaara`);">'
        + `<button onclick="muuta_tuote_amount('lamppumaara', document.getElementById('lamppumaara').value, 1); paivitaHinta('50.00', document.getElementById('lamppumaara').value, '9'); lisaa_koriin('lamppu', '50.00', document.getElementById('lamppumaara').value);">+</button>`
        + '</div>'
        + '<p class="hinta" id="9">' + (parseFloat(tiedot[0])*parseInt(tiedot[1])).toFixed(2) +' €</p>'
        + `<button class="poista" onclick="poista_tuote('lamppu');">X</button>`

        document.getElementById('tuote_lamppu').innerHTML = tuloste   
    } else {
        document.getElementById('tuote_lamppu').innerHTML = ""
    }
}

