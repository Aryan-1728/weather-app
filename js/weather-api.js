async function getWeatherData(city){
    const API_KEY = "d651ae9d999eb45cd3553384b8a4c37e";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`status : ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
}
