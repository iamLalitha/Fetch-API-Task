//ad0536549d37c335378450fbdb95e002


// Fetch data from REST Countries API
fetch('https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json')
    .then(response => response.json())
    .then(data => {
        const cardsRow = document.getElementById('cardsRow');

        // Loop through the countries data and create cards for each country
        data.forEach(country => {
            const card = createCard(country);
            cardsRow.appendChild(card);
        });

        // Attach event listener to the parent element for event delegation
        cardsRow.addEventListener('click', event => {
            if (event.target.classList.contains('btn')) {
                const city = event.target.dataset.city;
                getWeather(city, event.target);
            }
        });
    })
    .catch(error => console.log(error));


// Create a card element with country data
function createCard(country) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-sm-12';

    const cardContent = `
        <div class="card">
            <div class="card-header">${country.name}</div>
            <div class="card-body">
                 <span class="flag-icon flag-icon-${country.alpha2Code.toLowerCase()} flag-icon-lg d-inline-block"></span>
                 <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Latlng:</strong> ${country.latlng.join(', ')}</p>
                <p><strong>Country Code:</strong> ${country.alpha3Code}</p>
                <button class="btn btn-primary" data-city="${country.capital}">Click for Weather</button>
                <div class="weather-details"></div>
            </div>
        </div>
    `;

    card.innerHTML = cardContent;
    return card;
}

// Getting current weather data for a specific city
function getWeather(city, button) {
    const apiKey = 'ad0536549d37c335378450fbdb95e002';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateCardWithWeather(data, button);
        })
        .catch(error => console.log(error));
}

// Update the card with weather details
function updateCardWithWeather(weatherData, button) {
    const cardBody = button.parentNode;

    // Create weather details element
    const weatherDetails = document.createElement('div');
    weatherDetails.innerHTML = `
        <p><strong>Weather:</strong> ${weatherData.weather[0].main}</p>
        <p><strong>Temperature:</strong> ${convertKelvinToCelsius(weatherData.main.temp)}°C</p>
        <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
    `;

    // Append weather details to the card body
    const weatherContainer = cardBody.querySelector('.weather-details');
    weatherContainer.appendChild(weatherDetails);
}

// Convert temperature from Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}


