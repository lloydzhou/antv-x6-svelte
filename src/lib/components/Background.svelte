<svelte:options tag="x6-background" />
<script>
import { onDestroy } from 'svelte'
import { useContext } from '../GraphContext'

export let enabled = true

const defaultOptions = {
  color: '#f5f5f5',
}

let graph

const setup = (context) => {
  graph = context.graph
  // console.log('graph in background', graph)
  if (graph) {
    const options = Object.assign({}, defaultOptions, { enabled })
    graph.clearBackground()
    // console.log('drawBackground', options)
    graph.drawBackground(options)
  }
}

onDestroy(() => {
  // console.log('destroy in background', graph)
  if (graph) {
    graph.clearBackground()
  }
})

</script>
<div use:useContext={setup}></div>
