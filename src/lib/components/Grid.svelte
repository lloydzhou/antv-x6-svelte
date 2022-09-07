<script>
import { getContext, onMount, tick } from 'svelte'
import { contextSymbol } from '../GraphContext'

export let visible = true
export let size = 10
export let type = 'dot'

const defaultOptions = {
  size: 10,
  visible: true,
  type: 'dot',
  args: {
    color: '#a0a0a0',
    thickness: 1,
  }
} 

const getGraph = getContext(contextSymbol)

onMount(async () => {
  await tick();
  const { graph } = getGraph()
  if (graph) {
    const options = Object.assign({}, defaultOptions, { visible, size, type })
    graph.clearGrid()
    graph.drawGrid(options)
    return () => {
      graph.clearGrid()
    }
  }
})

</script>
