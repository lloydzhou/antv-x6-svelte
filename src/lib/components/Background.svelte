<svelte:options tag="x6-background" />
<script>
import { onMount } from 'svelte'
import { usePatentContext, noop } from '../GraphContext'

export let enabled = true

const defaultOptions = {
  // color: '#f5f5f5',
  color: '#444',
}

let unmount = noop;
onMount(() => () => unmount())

usePatentContext().then(({ graph }) => {
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
