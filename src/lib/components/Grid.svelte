<svelte:options tag="x6-grid" />
<script>
import { onMount } from 'svelte'
import { usePatentContext, noop } from '../GraphContext'

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

let unmount = noop;
onMount(() => () => unmount())

usePatentContext().then(({ graph }) => {
  if (graph) {
    const options = Object.assign({}, defaultOptions, { visible, size, type })
    graph.clearGrid()
    // console.log('drawGrid', options)
    graph.drawGrid(options)
  }
  unmount = () => {
    if (graph) {
      graph.clearGrid()
    }
  }
})
</script>
