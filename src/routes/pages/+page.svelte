<script lang='ts'>
  const items = [
    '/data',
    '/date-data',
    '/table',
    '/table-vertical',
  ]
</script>

{#each items as v}
  <div>
    <a href={v}>{v}</a>
  </div>
{/each}
