import axios from "axios";
import { useRef , useState , useEffect } from "react";
import Weather from "./Weather";
import Errortext from "./Errortext";
import './App.css'
import { country_data } from "./country";

const API_KEY = '1014ac07dc1af6149756ebfe253c9ade'


function App() {

const cityName = useRef('')
const countryName = useRef('')

const[weatherData , setWeatherData] = useState()
const[error , setError] = useState(false)

//fetch weather data according to inpt field
  const fetchWeather = async () =>{
      try{
        const countryCode = country_data.filter((item) =>{
          console.log(countryName.current.value)
            return item.Name.toLowerCase() === countryName.current.value.toLowerCase()
        } )
        console.log(countryCode)
        if(!countryCode){
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.current.value}&appid=${API_KEY}&units=metric`)
          console.log(res)
          setWeatherData(res.data)
          setError(false)
          cityName.current.value="";
          countryName.current.value=""
        }
        else{
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.current.value},${countryCode[0].code}&appid=${API_KEY}&units=metric`)
          console.log(res)
          setWeatherData(res.data)
          setError(false)
          cityName.current.value="";
          countryName.current.value=""

        }
  

      }
      catch(err){
      console.log(err)
      setError(true)
      } 
  }




useEffect( () =>{
   //default location
 let Latitude = 25.59
 let Longitude = 85.15

//get the location
 function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
   } else {
     console.log("Geolocation is not supported by this browser.");
   }
 }

 function showPosition(position) {
   Latitude = position.coords.latitude
   Longitude = position.coords.longitude
   console.log("Latitude: " + Latitude.toFixed(2) +
   "Longitude: " + Longitude.toFixed(2));
 }
 getLocation()
 //fetch weather according to user location
  const fetchWeatherOnce = async () =>{
    try{
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`)
      // const result = res.json();
  
      console.log(res)
      setWeatherData(res.data)
    }
    catch(err){
    console.log(err)
    } 
  }

  //fetch weather according to the loaction
  fetchWeatherOnce()
} , [])


  return <div className="App">
   <div className="wrapper">
    <header>Weather App</header>
    <div className="inputContainer">
      <input type="text" className="city input" placeholder="City" ref={cityName} />
      <input type="text" className="country input" placeholder="Country" ref={countryName}/>
      <button onClick={fetchWeather} className='btn input'>Submit</button>
    </div>
    {!weatherData || error ? <Errortext content={"! Entered city doesn't match"}/> : <Weather weatherData={weatherData} />}

   </div>
   </div>
  
}

export default App;
