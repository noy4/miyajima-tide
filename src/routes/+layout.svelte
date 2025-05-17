<script lang='ts'>
  // iPad Safari はキャッシュが非常に強く、CSS の更新を無視することがあります。
  // 💡 対処法：
  // 開発中は URL にクエリパラメータをつける（例：<link rel="stylesheet" href="/uno.css?v=123">）
  import 'virtual:uno.css?v=2'

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
