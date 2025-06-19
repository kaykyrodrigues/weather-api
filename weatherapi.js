document.getElementById('txtloc')
    .addEventListener('keydown', pressEnter)

function pressEnter(event) {

    if (event.key === 'Enter') {
        let loc = event.target.value
        console.log(loc)

        function getApi() {

            let localTime = document.getElementById('localTime')
            let temp = document.getElementById('temp')

            const key = '70befa9fc4dc4fe0a3c140404251006'
            fetch(`https://api.weatherapi.com/v1/current.json?key=70befa9fc4dc4fe0a3c140404251006&q=${loc}&aqi=no`)
                .then(response => response.json())
                .then(data => {
                    localTime.innerHTML = data.location.localtime
                    temp.innerHTML = data.current.temp_c + '°'
                })
                .catch(err => {
                    console.log('Error: ' + err)
                })
        }

        getApi()
    }
}

