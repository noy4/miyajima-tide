interface WeatherCondition {
  text: string
  icon: string
  code: number
}

interface DayWeather {
  maxtemp_c: number
  mintemp_c: number
  avgtemp_c: number
  maxwind_kph: number
  totalprecip_mm: number
  totalsnow_cm: number
  avgvis_km: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: WeatherCondition
  uv: number
}

interface Astro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: string
}

interface HourWeather {
  time_epoch: number
  time: string
  temp_c: number
  is_day: number
  condition: WeatherCondition
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  snow_cm: number
  humidity: number
  cloud: number
  feelslike_c: number
  windchill_c: number
  heatindex_c: number
  dewpoint_c: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  gust_kph: number
  uv: number
}

interface ForecastDay {
  date: string
  date_epoch: number
  day: DayWeather
  astro: Astro
  hour: HourWeather[]
}

export interface WeatherAPIResponse {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    is_day: number
    condition: WeatherCondition
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    precip_mm: number
    humidity: number
    cloud: number
    feelslike_c: number
    vis_km: number
    uv: number
    gust_kph: number
  }
  forecast: {
    forecastday: ForecastDay[]
  }
}

export interface SimplifiedWeatherForecast {
  date: string
  maxtemp_c: number
  mintemp_c: number
  condition_text: string
  condition_icon: string
}

export async function getTodaysAndTomorrowsWeather() {
  const apiKey = 'fcd34af252da443293102038251505'
  const location = 'Miyajima'
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&aqi=no&alerts=no`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`WeatherAPI request failed with status ${response.status}`)
    }
    const data: WeatherAPIResponse = await response.json()
    return data

    // if (!data.forecast || !data.forecast.forecastday || data.forecast.forecastday.length < 2) {
    //   throw new Error('Invalid weather data received')
    // }

    // return data.forecast.forecastday.map(day => ({
    //   date: day.date,
    //   maxtemp_c: day.day.maxtemp_c,
    //   mintemp_c: day.day.mintemp_c,
    //   condition_text: day.day.condition.text,
    //   condition_icon: day.day.condition.icon,
    // }))
  }
  catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
