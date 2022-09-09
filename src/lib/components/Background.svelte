<svelte:options tag="x6-background" />
<script>
import { onMount } from 'svelte'
import { usePatentContext, noop, get } from '../GraphContext'

export let enabled = true

const defaultOptions = {
  color: '#f5f5f5',
}

let unmount = noop;
onMount(() => () => unmount())

usePatentContext().then(context => {
  const graph = get(context.graph)
  if (graph) {
    const options = Object.assign({}, defaultOptions, { enabled })
    graph.clearBackground()
    // console.log('drawBackground', options)
    graph.drawBackground(options)
  }
  unmount = () => {
    // console.log('clearBackground')
    if (graph) {
      graph.clearBackground()
    }
  }
})
</script>
