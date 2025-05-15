<script lang='ts'>
  import { WeatherState } from '$lib/state.svelte'

  const state = new WeatherState()
</script>

<pre>
  {JSON.stringify(state.data, null, 2)}
</pre>
