<svelte:options tag="x6-grid" />
<script>
import { onMount } from 'svelte'
import { getContext, get } from '../GraphContext'
import { get_current_component } from 'svelte/internal'

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

const self = get_current_component()

onMount(() => {
  const { graph: g } = getContext(self)
  const graph = g && get(g)
  if (graph) {
    const options = Object.assign({}, defaultOptions, { visible, size, type })
    graph.clearGrid()
    // console.log('drawGrid', options)
    graph.drawGrid(options)
  }
  return () => {
    if (graph) {
      graph.clearGrid()
    }
  }
})
</script>
