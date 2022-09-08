<svelte:options tag="x6-grid" />
<script>
import { onDestroy } from 'svelte'
import { useContext } from '../GraphContext'

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

let graph

const setup = (context) => {
  graph = context.graph
  // console.log('graph in grid', graph)
  if (graph) {
    const options = Object.assign({}, defaultOptions, { visible, size, type })
    graph.clearGrid()
    // console.log('drawGrid', options)
    graph.drawGrid(options)
  }
}

onDestroy(() => {
  // console.log('destroy in grid', graph)
  if (graph) {
    graph.clearGrid()
  }
})

</script>
<div use:useContext={setup}></div>
