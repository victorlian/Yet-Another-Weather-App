import axios from 'axios';

var config = {
    headers: {
        'x-api-key': 'cfea31d81f081ff8b10e8be3666b5072',
        'Access-Control-Allow-Origin': '*',
    }
};

export default {
    //Needed a little hacking to solve the cors issue
    getWeatherForId(cityId) {
        return axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric`, config)
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log("ERROR");
            });
    }, 
}