function getAnotherFalacy() {
    fetch('/api/getanotherfalacy')
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos.');
        }
        return response.json();
    })
    .then(data => {
        if (data.definicion == falacy_definition.innerHTML){
            getAnotherFalacy();
            return;
        }  
        while (falacy_frase.firstChild) {
            falacy_frase.removeChild(falacy_frase.firstChild);
        }

        let i = 0;
        let falacyArray = data.frase.split(''); 
        falacyArray.forEach(element => {
            let letter = document.createElement("span");
            if (element != " "){
                letter.innerHTML = element.toUpperCase(); 
            } else {
                letter.innerHTML = "&middot;";
            }
            letter.style.setProperty("--i", i);
            i++;
            falacy_frase.appendChild(letter); // Agregar cada span a falacy_frase
        });
        falacy_definition.innerHTML = data.definicion;
        falacy_ejemplification.innerHTML = data.ejemplificacion;
    })
    .catch(error => {
        // Manejar cualquier error que haya ocurrido durante la solicitud
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
}

document.getElementById("get-another-falacy-btn").addEventListener("click", getAnotherFalacy);
