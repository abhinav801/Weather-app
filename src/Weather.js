import React from 'react'

function Weather({weatherData}) {
let time = new Date()

  return (
    <div className="weatherContainer">
    <div className="primaryContainer">
      <div className="primaryContainer_first" >
      <h6>{weatherData.name} , IN. Weather</h6>
      <p>As of {time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true })
}</p>
      </div>
      <div className="primaryContainer_second" >
        <div className="innerOne"><h1>{Math.round(weatherData.main.temp)} <sup>o</sup> </h1></div>
      <div className="innerTwo" >
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` } 
      alt={weatherData.weather[0].description}  />
      <p>{weatherData.weather[0].main}</p>
      
      </div>
      </div>
      <p className="primaryContainer_third">{weatherData.weather[0].main}</p>
    </div>
    <div className="secondaryContainer">
      <div className="box">
        <h6>High/Low</h6>
        <p>{Math.round(weatherData.main.temp_max)}/{Math.round(weatherData.main.temp_min)}</p>
      </div>
      <div className="box">
        <h6>Wind</h6>
        <p>{Math.round(weatherData.wind.speed)} Km/hr</p>
      </div>
      <div className="box">
        <h6>Humidity</h6>
        <p>{weatherData.main.humidity} %</p>
      </div>
      <div className="box">
        <h6>Wind direction</h6>
        <p>{weatherData.wind.deg} deg</p>
      </div>
      <div className="box">
        <h6>Pressure</h6>
        <p>{weatherData.main.pressure} hpa</p>
      </div>
      <div className="box">
        <h6>Sunrise </h6>
        <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true })}</p>
      </div>
      <div className="box">
        <h6>Visibility</h6>
        <p>{Number(weatherData.visibility) / 1000} km</p>
      </div>
      <div className="box">
        <h6>Sunset</h6>
        <p>{new Date(weatherData.sys.sunset * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true })}</p>
      </div>
    </div>
  </div>
  )
}

export default Weather