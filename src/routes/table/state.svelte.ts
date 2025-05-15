import { getTideData } from '$lib/tide'
import { getTodaysAndTomorrowsWeather } from '$lib/weather'

export interface DateData {
  date: string
  maxtemp_c: number
  mintemp_c: number
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
        condition_text: day.day.condition.text,
        condition_icon: day.day.condition.icon,
        highTides: tide.highTides,
        lowTides: tide.lowTides,
      }
    })
    console.log('this.data:', this.data)
  }
}
