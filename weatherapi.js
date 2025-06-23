document.getElementById('txtloc')
    .addEventListener('keydown', pressEnter)

function pressEnter(event) {

    if (event.key === 'Enter') {
        let loc = event.target.value
        console.log(loc)

        function getApi() {

            let region = document.getElementById('region')
            let localTime = document.getElementById('localTime')
            let img = document.getElementById('img')
            let temp = document.getElementById('temp')

            const key = '70befa9fc4dc4fe0a3c140404251006'
            fetch(`https://api.weatherapi.com/v1/current.json?key=70befa9fc4dc4fe0a3c140404251006&q=${loc}&aqi=no`)
                .then(response => response.json())
                .then(data => {
                    region.innerHTML = `<img src="images/locationpoint.png" alt="Ponto de localização" id="locationPoint">` + data.location.region + ', ' + data.location.country;
                    localTime.innerHTML = data.location.localtime;
                    img.src = data.current.condition.icon;
                    temp.innerHTML = data.current.temp_c + '°';
                    condition.innerHTML = data.current.condition.text;
                })
                .catch(err => {
                    console.log('Error: ' + err)
                })
        }

        getApi()
    }
}

