import axios from 'axios';

var config = {
    headers: {
        'x-api-key': 'cfea31d81f081ff8b10e8be3666b5072',
        'Access-Control-Allow-Origin': '*',
    }
};

export default {
    getWeatherForId(cityId) {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric`, config)
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log("ERROR");
            });
    }, 
}