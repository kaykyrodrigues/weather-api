document.getElementById("txtloc").addEventListener("keydown", pressEnter);

const input = document.getElementById("txtloc");
const region = document.getElementById("region");
const localTime = document.getElementById("localTime");
const tempCelsius = document.getElementById("temp-celsius");
const tempF = document.getElementById("temp-f");
const weatherIcon = document.getElementById("weather-icon");
const forecast = document.getElementById("forecast-title");
const statusForecast = document.getElementById("status-forecast");
const dayCard = document.getElementById("day-card");
const condition = document.getElementById("condition");

// Função que se ativa ao pressionar a tecla Enter e realiza a requisição para a API.

function pressEnter(event) {
  if (event.key === "Enter") {
    getApi(event.target.value);
  }
}

async function getApi(loc) {
  console.log(loc);

  // ícones customizados que servem para substituir os ícones padrões da API, utilizando a chave "condition.code" que é retornada pela WeatherAPI.

  const customIcons = {
    1000: {
      day: "../images/sunny.png",
      night: "../images/clear-night.png",
    },
    1003: {
      day: "../images/partly-cloudy.png",
      night: "../images/partly-cloudy.png",
    },
    1006: {
      day: "../images/cloudy.png",
      night: "../images/cloudy.png",
    },
    1009: {
      day: "../images/overcast.png",
      night: "../images/overcast.png",
    },
    1030: {
      day: "../images/mist.png",
      night: "../images/mist.png",
    },
    1063: {
      day: "../images/rain-light.png",
      night: "../images/rain-light.png",
    },
    1183: {
      day: "../images/rain.png",
      night: "../images/rain.png",
    },
    1195: {
      day: "../images/heavy-rain.png",
      night: "../images/heavy-rain.png",
    },
  };

  try {
    // Faz a requisição para a API através do backend
    const response = await fetch(`http://localhost:3000/weather?loc=${loc}`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    // Converte os dados para JSON
    const data = await response.json();

    // O ícone personalizado (customIcons) é selecionado de acordo com a condição climática
    const code = data.current.condition.code;
    weatherIcon.src = customIcons[code] || "../images/weatherIcon.png";

    const isDay = data.current.is_day;

    const iconSet = customIcons[code];
    const icon = iconSet
      ? isDay
        ? iconSet.day
        : iconSet.night
      : "/images/weatherIcon.png";
    weatherIcon.src = icon;

    //Altera a cor de fundo com base no horário local
    document.body.classList.toggle("day", isDay === 1);
    document.body.classList.toggle("night", isDay === 0);

    const forecastDays = data.forecast.forecastday;

    statusForecast.innerHTML = "";
    let cont = 1;

    for (const day of forecastDays) {
      const card = document.createElement("div");
      card.classList.add("forecast-card");

      // Troca a cor do fundo do card dependendo se está de dia ou de noite
      if (isDay === 1) {
        card.style.background =
          "linear-gradient(to bottom, #0280febf, #779dfeb9)";
      } else {
        card.style.background =
          "linear-gradient(to bottom, #182d56bf, #000000d4)";
      }

      //Estrutura do card
      card.innerHTML = `
    <h3>DAY ${cont++}</h3>
    <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
    <p>Máx: ${day.day.maxtemp_c}°C</p>
    <p>Mín: ${day.day.mintemp_c}°C</p>
  `;

      statusForecast.appendChild(card);
    }

    //Atualiza informações da região
    region.textContent = `${data.location.region}, ${data.location.country}`;
    localTime.textContent = data.location.localtime;

    //Atualiza as temperaturas (Celsius e Fahrenheit)
    tempCelsius.textContent = `${data.current.temp_c}°C`;
    tempF.textContent = `${data.current.temp_f}°F`;

    //Atualiza a descrição da condição climática
    condition.textContent = data.current.condition.text;
  } catch (err) {
    console.error(err);
    alert("Local não encontrado. Tente novamente.");
  }
}
