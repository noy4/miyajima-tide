<script lang='ts'>
  const items = [
    '/json',
    '/date-data-json',
    '/table',
    '/table-vertical',
  ]
</script>

{#each items as v}
  <div>
    <a href={v}>{v}</a>
  </div>
{/each}
