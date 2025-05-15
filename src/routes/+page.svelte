<script lang='ts'>
  import { WeatherState } from '$lib/state.svelte'
  import { format, parseISO } from 'date-fns'

  const state = new WeatherState()
  const forecast = $derived(state.data)
</script>

<style>
  :global(body) {
    background: #f0f0f0;
  }
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
    /* background: #f0f0f0; */
  }
</style>

<div class='p-4'>
  <div class='text-2xl p-4 max-w-4xl bg-white rounded rounded-xl'>
    <div class='overflow-x-auto w-full'>
      <table>
        <tbody>
          <tr>
            <th></th>
            {#each forecast as day}
              <th>{format(parseISO(day.date), 'M.d (E)')}</th>
            {/each}
          </tr>
          <tr>
            <td></td>
            {#each forecast as day}
              <td>
                <div class='flex flex-col items-center'>
                  <img src={day.condition_icon} alt={day.condition_text} class='w-32' />
                  {day.condition_text}
                  <div>{day.maxtemp_c}° / {day.mintemp_c}°</div>
                </div>
              </td>
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
</div>
