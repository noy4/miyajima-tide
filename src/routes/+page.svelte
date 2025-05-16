<svelte:head>
  <link rel='preconnect' href='https://fonts.googleapis.com'>
  <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin='anonymous'>
  <link href='https://fonts.googleapis.com/css2?family=Caveat&display=swap' rel='stylesheet'>
  <link href='https://fonts.googleapis.com/css2?family=Neucha&display=swap' rel='stylesheet'>
</svelte:head>

<script lang='ts'>
  import highTideImg from '$lib/assets/high-tide.png'
  import { WeatherState } from '$lib/state.svelte'
  import { format, parseISO } from 'date-fns'

  const state = new WeatherState()
  const { data: forecast, loading } = $derived(state)
</script>

<style>
  :global(body) {
    background: #f0f0f0;
  }
  main {
    font-family: 'Caveat', cursive;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: center;
  }
</style>

<main class='flex justify-center items-center min-h-100dvh p-2'>
  <div class='text-4xl px-2 sm:px-16 py-16 max-w-4xl w-full bg-white rounded rounded-xl'>
    {#if loading}
      ...loading
    {:else}
      <div class='overflow-x-auto'>
        <table class='w-full border-collapse'>
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
                    <div class='font-900'>
                      <span class='text-red-500'>{Math.round(day.maxtemp_c)}°</span> /
                      <span class='text-blue-500'>{Math.round(day.mintemp_c)}°</span>
                    </div>
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
              <td>
                <div class='flex justify-center items-center'>
                  High Tide
                  <img src={highTideImg} alt='high tide' class='w-20' />
                </div>
              </td>
              {#each forecast as day}
                <td>
                  {#each day.highTides.filter(t => t.time) as tide}
                    <div>{tide.time}</div>
                  {/each}
                </td>
              {/each}
            </tr>
            <tr>
              <td>
                <div class='flex justify-center items-center'>
                  <!-- <img src={lowTideImg} alt='high tide' class='w-20' /> -->
                  Low Tide
                </div>
              </td>
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
    {/if}
  </div>
</main>
