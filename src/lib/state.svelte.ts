import { getTideData } from '$lib/tide'
import { getTodaysAndTomorrowsWeather } from '$lib/weather'

const dummy = [
  {
    date: '2025-05-15',
    maxtemp_c: 20.4,
    mintemp_c: 15.9,
    sunrise: '05:08 AM',
    sunset: '07:05 PM',
    condition_text: 'Sunny',
    condition_icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
    highTides: [
      { time: '10:39', tide: 300 },
      { time: '23:38', tide: 339 },
      { time: null, tide: null },
      { time: null, tide: null },
    ],
    lowTides: [
      { time: '05:01', tide: 121 },
      { time: '17:00', tide: 28 },
      { time: null, tide: null },
      { time: null, tide: null },
    ],
  },
  {
    date: '2025-05-16',
    maxtemp_c: 19.7,
    mintemp_c: 16.8,
    sunrise: '05:07 AM',
    sunset: '07:05 PM',
    condition_text: 'Patchy rain nearby',
    condition_icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
    highTides: [
      { time: '11:12', tide: 292 },
      { time: null, tide: null },
      { time: null, tide: null },
      { time: null, tide: null },
    ],
    lowTides: [
      { time: '05:36', tide: 130 },
      { time: '17:34', tide: 35 },
      { time: null, tide: null },
      { time: null, tide: null },
    ],
  },
]

export interface DateData {
  date: string
  maxtemp_c: number
  mintemp_c: number
  sunrise: string
  sunset: string
  condition_text: string
  condition_icon: string

  highTides: { time: string | null, tide: number | null }[]
  lowTides: { time: string | null, tide: number | null }[]
}

export class WeatherState {
  data: DateData[] = $state([])

  constructor() {
    $effect(() => {
      this.fetchData()
    })
  }

  async fetchData() {
    this.data = dummy
    // return

    const [weatherData, tideData] = await Promise.all([
      getTodaysAndTomorrowsWeather(),
      getTideData(),
    ])
    const days = weatherData.forecast.forecastday.slice(0, 2)
    this.data = days.map((day) => {
      const date = day.date
      const tide = tideData.find(v => v.date === date)!
      return {
        date,
        maxtemp_c: day.day.maxtemp_c,
        mintemp_c: day.day.mintemp_c,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        condition_text: day.day.condition.text,
        condition_icon: day.day.condition.icon,
        highTides: tide.highTides,
        lowTides: tide.lowTides,
      }
    })
    console.log('this.data:', this.data)
  }
}
