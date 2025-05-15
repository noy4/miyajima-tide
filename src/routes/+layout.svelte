<script lang='ts'>
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'

  const { children } = $props()
</script>

{@render children?.()}
