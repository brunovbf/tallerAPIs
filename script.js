//Obtenemos los elementos del HTML mediante el DOM.
const countryNameInput = document.getElementById("countryName");
const searchButton = document.getElementById("searchButton");
const countryList = document.getElementById("countryList");
const resultList = document.getElementById("resultList");

//Agregamos un addEventListener para el evento click y guardamos el valor del input en la variable countryName.
searchButton.addEventListener("click", () => {
  const countryName = countryNameInput.value;

  //Si el valor de countryName no esta vacio se realiza la solicitud filtrando por el nombre. 
  if (countryName !== "") {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())// convierte la respuesta a JSON.
      .then((data) => {
        resultList.innerHTML = ""; // Limpia la lista de resultados.
        // Recorre los datos de los paises y moestra la informacion en la lista.
        if (data.length > 0) {
          data.forEach((country) => {
            const listItem = document.createElement("li");
            // Muestra los datos en la lista.
            listItem.innerHTML = `
                  <strong>Nombre:</strong> ${country.name.common}<br>
                  <strong>Capital:</strong> ${country.capital[0]}<br>
                  <strong>Población:</strong> ${country.population.toLocaleString()}
                `;
            //Agrega el elemento a la lista.
            resultList.appendChild(listItem);
          });
          //Muestra una alerta en el caso de no encontrar el pais.
        } else {
          alert("No se encontró el país.");
        }
      })//Fin de menejador de errore.
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }
});

