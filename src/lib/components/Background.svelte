<svelte:options tag="x6-background" />
<script>
import { onMount } from 'svelte'
import { getContext, get } from '../GraphContext'
import { get_current_component } from 'svelte/internal'

export let enabled = true

const defaultOptions = {
  color: '#f5f5f5',
}

const self = get_current_component()

onMount(() => {
  const { graph: g } = getContext(self)
  const graph = g && get(g)
  if (graph) {
    const options = Object.assign({}, defaultOptions, { enabled })
    graph.clearBackground()
    // console.log('drawBackground', options)
    graph.drawBackground(options)
  }
  return () => {
    // console.log('clearBackground')
    if (graph) {
      graph.clearBackground()
    }
  }
})
</script>
