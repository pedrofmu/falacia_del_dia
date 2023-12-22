const falacy_frase = document.getElementById("falacy_frase");
const falacy_definition = document.getElementById("falacy_definition");
const falacy_ejemplification = document.getElementById("falacy_ejemplification");

fetch('/api/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos.');
        }
        return response.json();
    })
    .then(data => {
        falacy_frase.innerHTML = data.frase.toUpperCase();
        falacy_definition.innerHTML = data.definicion;
        falacy_ejemplification.innerHTML = data.ejemplificacion;
    })
    .catch(error => {
        // Manejar cualquier error que haya ocurrido durante la solicitud
        console.error('Hubo un problema con la solicitud fetch:', error);
    });


