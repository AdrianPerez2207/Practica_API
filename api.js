window.onload = async () => {
    const ciudad = document.getElementById("ciudad");
    const boton = document.getElementById("boton");
    const resultado = document.getElementById("resultado");

    /**
     * Creamos un evento que al pulsar el botón hagamos una petición a la API para que nos devuelva la long y lat.
     * Guardamos esos datos y se los pasamos a otra API para obtener la previsión meteorológica.
     * Luego de obtener la previsión meteorológica, se crean los elementos que vamos a mostrar en la página con la información
     * sacada de la API.
     */
    boton.addEventListener("click", async () => {
        const resultadoCity = await getWeatherByCity(ciudad.value);
        const longitud = resultadoCity.data[0].longitude;
        const latitud = resultadoCity.data[0].latitude;
        const resultadoWeather = await getWeather(latitud, longitud);

        const dia1 = resultadoWeather.data[0];
        const dia2 = resultadoWeather.data[1];
        const dia3 = resultadoWeather.data[2];
        const dia4 = resultadoWeather.data[3];
        const dia5 = resultadoWeather.data[4];

        resultado.innerHTML = "";
        resultado.appendChild(crearElemento(dia1.weather.description, dia1.temp, dia1.precip, dia1.datetime, dia1.weather.icon));
        resultado.appendChild(crearElemento(dia2.weather.description, dia2.temp, dia2.precip, dia2.datetime, dia2.weather.icon));
        resultado.appendChild(crearElemento(dia3.weather.description, dia3.temp, dia3.precip, dia3.datetime, dia3.weather.icon));
        resultado.appendChild(crearElemento(dia4.weather.description, dia4.temp, dia4.precip, dia4.datetime, dia4.weather.icon));
        resultado.appendChild(crearElemento(dia5.weather.description, dia5.temp, dia5.precip, dia5.datetime, dia5.weather.icon));
    });

    /**
     * Creaamos los elementos que vamos a mostrar en la página con la información sacada de la API
     * @param texto
     * @param temperatura
     * @param precipitacion
     * @param fecha
     * @param icono
     * @returns {HTMLDivElement}
     */
    function crearElemento(texto, temperatura, precipitacion, fecha, icono) {
        const div = document.createElement("div");
        div.className = "col border border-primary d-flex flex-column justify-content-center align-items-center gap-2";
        const imagen = document.createElement("img");
        imagen.src = `./icons/${icono}.png`;
        const parrafo = document.createElement("p");
        const descripcion = document.createTextNode("Descripción: " + texto);
        parrafo.appendChild(descripcion);
        const span1 = document.createElement("span");
        const temp = document.createTextNode("Temperatura: " + temperatura);
        span1.appendChild(temp);
        const span2 = document.createElement("span");
        const precip = document.createTextNode("Precipitación: " + precipitacion);
        span2.appendChild(precip);
        const span3 = document.createElement("span");
        const dia = document.createTextNode("Fecha: " + fecha);
        span3.appendChild(dia);
        div.appendChild(imagen);
        div.appendChild(parrafo);
        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);
        return div;
    }





    /**
     * Con esta API buscamos la coordenadas de una ciudad y nos devuelve la previsión meteorológica
     * @param latitud
     * @param longitud
     * @param unidades
     * @param idioma
     * @returns {Promise<void>}
     */
    async function getWeather(latitud, longitud, unidades="metric", idioma="es") {
        const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${latitud}&lon=${longitud}&units=${unidades}l&lang=${idioma}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '33ddd42f3dmsh347a4f5e624187ap176703jsn3d48ceb3c2b9',
                'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Con esta API buscamos la ciudad por nombre y nos devuelve las coordenadas
     * @param city
     * @returns {Promise<void>}
     */

    async function getWeatherByCity(city){
        const url = `https://weather-api163.p.rapidapi.com/weather/citySearch?search_term=${city}`;
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '33ddd42f3dmsh347a4f5e624187ap176703jsn3d48ceb3c2b9',
                'x-rapidapi-host': 'weather-api163.p.rapidapi.com',
                'Content-Type': 'application/json',
                'sec-ch-ua-platform': '"Windows"',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'sec-fetch-site': 'cross-site',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-mode': 'cors',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                accept: '*/*',
                origin: 'https://edition.cnn.com',
                referer: 'https://edition.cnn.com/',
                priority: 'u=1, i',
                'sec-fetch-dest': 'empty',
                'accept-language': 'en-US,en;q=0.9'
            },
            body: {
                key1: 'value',
                key2: 'value'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}