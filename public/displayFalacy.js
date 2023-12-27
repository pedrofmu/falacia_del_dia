const falacy_frase = document.getElementById("falacy_phrase");
const falacy_definition = document.getElementById("falacy_definition");
const falacy_ejemplification = document.getElementById(
  "falacy_ejemplification"
);

falacy_frase.innerHTML = "";

fetch("/api/")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Hubo un problema al obtener los datos.");
    }
    return response.json();
  })
  .then((data) => {
    i = 0;
    let falacyArray = data.frase.split("");
    falacyArray.forEach((element) => {
      let leter = document.createElement("span");
      if (element != " ") {
        leter.innerHTML = element.toUpperCase();
      } else {
        leter.innerHTML = "&middot;";
      }
      leter.style = "--i:" + i;
      i++;
      falacy_frase.appendChild(leter); // Agregar cada h1 a falacy_frase
    });
    falacy_definition.innerHTML = data.definicion;
    falacy_ejemplification.innerHTML = data.ejemplificacion;
  })
  .catch((error) => {
    // Manejar cualquier error que haya ocurrido durante la solicitud
    console.error("Hubo un problema con la solicitud fetch:", error);
  });
