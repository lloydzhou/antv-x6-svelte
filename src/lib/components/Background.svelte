<script>
import { getContext, onMount, tick } from 'svelte'
import { contextSymbol } from '../GraphContext'


export let enabled = true

const defaultOptions = {
  color: '#f5f5f5',
}

const getGraph = getContext(contextSymbol)

onMount(async () => {
  await tick();
  const { graph } = getGraph()
  if (graph) {
    const options = Object.assign({}, defaultOptions, { enabled })
    graph.clearBackground()
    graph.drawBackground(options)
    return () => {
      graph.clearBackground()
    }
  }
})

</script>
