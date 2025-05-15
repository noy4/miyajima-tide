<script lang='ts'>
  import { base } from '$app/paths'

  const items = [
    '/data',
    '/date-data',
    '/table',
    '/table-vertical',
  ].map(v => `${base}${v}`)
</script>

{#each items as v}
  <div>
    <a href={v}>{v}</a>
  </div>
{/each}
