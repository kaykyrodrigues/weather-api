document.getElementById("txtloc").addEventListener("keydown", pressEnter);

function pressEnter(event) {
  if (event.key === "Enter") {
    let loc = event.target.value;
    console.log(loc);

    async function getApi() {
      const region = document.getElementById("region");
      const localTime = document.getElementById("localTime");
      const img = document.getElementById("img");
      const temp = document.getElementById("temp");

      try {
        const apiKey = "70befa9fc4dc4fe0a3c140404251006";
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=$=${loc}&aqi=no`
        );

        if (!response.ok) {
          throw new Error(
            `Erro na API: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        region.innerHTML = `
            <img src="images/locationpoint.png" alt="Ponto de localização" id="locationPoint">
            ${data.location.region}, ${data.location.country}
            `;
        localTime.textContent = data.location.localtime;
        img.src = data.current.condition.icon;
        temp.textContent = `${data.current.temp_c}°`;
        condition.textContent = `Time condition: ${data.current.condition.text}`;
      } catch (err) {
        console.error("Erro ao capturar dados: " + err.message);
      }
    }

    getApi();
  }
}