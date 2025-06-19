function getApi() {

    const key = '70befa9fc4dc4fe0a3c140404251006'
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=London&aqi=no`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log('Error: ' + err)
        })
}

getApi()