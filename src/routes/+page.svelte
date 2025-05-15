<script lang='ts'>
  import { WeatherState } from '$lib/state.svelte'

  const state = new WeatherState()
  const forecast = $derived(state.data)
</script>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: center;
  }
  th {
    background: #f0f0f0;
  }
</style>

<div class='text-2xl p-4'>
  <div class='overflow-x-auto max-w-4xl'>
    <table>
      <tbody>
        <tr>
          <th></th>
          {#each forecast as day}
            <th>{day.date}</th>
          {/each}
        </tr>
        <tr>
          <td>Weather</td>
          {#each forecast as day}
            <td>
              <img src={day.condition_icon} alt={day.condition_text} width='32' height='32' /><br />
              {day.condition_text}
            </td>
          {/each}
        </tr>
        <tr>
          <td>Temp (Max / Min)</td>
          {#each forecast as day}
            <td>{day.maxtemp_c}° / {day.mintemp_c}°</td>
          {/each}
        </tr>
        <tr>
          <td>Sunrise / Sunset</td>
          {#each forecast as day}
            <td>
              {day.sunrise}<br />
              {day.sunset}
            </td>
          {/each}
        </tr>
        <tr>
          <td>High Tide</td>
          {#each forecast as day}
            <td>
              {#each day.highTides.filter(t => t.time) as tide}
                <div>{tide.time}</div>
              {/each}
            </td>
          {/each}
        </tr>
        <tr>
          <td>Low Tide</td>
          {#each forecast as day}
            <td>
              {#each day.lowTides.filter(t => t.time) as tide}
                <div>{tide.time}</div>
              {/each}
            </td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>
</div>
