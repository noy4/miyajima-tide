<script lang='ts'>
  import type { Tide } from '$lib/tide'
  import { getTideData } from '$lib/tide'
  import { getTodaysAndTomorrowsWeather } from '$lib/weather'
  import { onMount } from 'svelte'

  let filteredTideData: Tide[] = $state([])
  let weatherData: any = $state([])

  function getFormattedDate(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  async function fetchTideData() {
    const allTideData = await getTideData()
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const todayStr = getFormattedDate(today)
    const tomorrowStr = getFormattedDate(tomorrow)

    filteredTideData = allTideData.filter(
      tide => tide.date === todayStr || tide.date === tomorrowStr,
    )
  }

  async function fetchWeatherData() {
    weatherData = await getTodaysAndTomorrowsWeather()
  }

  onMount(() => {
    fetchWeatherData()
  // fetchTideData()
  })
</script>

<pre>
  {JSON.stringify(weatherData, null, 2)}
</pre>

<pre>
  {JSON.stringify(filteredTideData, null, 2)}
</pre>
