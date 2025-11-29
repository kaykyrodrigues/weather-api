// Servidor backend intermediário entre o front-end e a WeatherAPI, feito para impedir a exposição da chave de forma direta no navegador

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware habilitando CORS

app.use(cors());

// Rota que recebe um parâmetro de query chamado de "loc" e faz uma requisição para a WeatherAPI, retornando os dados da previsão

app.get("/weather", async (req, res) => {
  try {
    const loc = req.query.loc;

    const apiKey = "01fcff10bc604b2c99a213640252611";
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&days=3&aqi=no`
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.listen(3000, () => {
  console.log("Server online at door 3000");
});
