<script lang='ts'>
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'

  const { children } = $props()

  const title = 'Miyajima Tide'
  const description = 'Shows the tide information for Miyajima, Japan.'
</script>

<svelte:head>
  <title>{title}</title>
  <meta property='og:title' content={title} />
  <meta property='og:description' content={description} />
  <meta property='og:type' content='website' />
  <meta property='og:url' content='https://noy4.github.io/miyajima-tide/' />
  <meta property='og:image' content='https://noy4.github.io/miyajima-tide/favicon.png' />
</svelte:head>

{@render children?.()}
