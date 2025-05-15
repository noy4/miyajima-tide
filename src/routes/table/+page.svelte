<script lang='ts'>
  import { WeatherState } from '$lib/state.svelte'

  const state = new WeatherState()
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  th, td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center;
  }
  th {
    background-color: #f4f4f4;
  }
  img {
    vertical-align: middle;
  }
</style>

<h2>Weather & Tide Forecast</h2>
<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Weather</th>
      <th>Max / Min Temp (°C)</th>
      <th>High Tides<br /><small>(Time / cm)</small></th>
      <th>Low Tides<br /><small>(Time / cm)</small></th>
    </tr>
  </thead>
  <tbody>
    {#each state.data as day}
      <tr>
        <td>{day.date}</td>
        <td>
          <img src={day.condition_icon} alt={day.condition_text} width='32' height='32' />
          <div>{day.condition_text}</div>
        </td>
        <td>{day.maxtemp_c} / {day.mintemp_c}</td>
        <td>
          {#each day.highTides.filter(t => t.time) as tide}
            <div>{tide.time} / {tide.tide} cm</div>
          {/each}
        </td>
        <td>
          {#each day.lowTides.filter(t => t.time) as tide}
            <div>{tide.time} / {tide.tide} cm</div>
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
