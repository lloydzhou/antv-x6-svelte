<script>
import * as X6 from '@antv/x6'
import { setContext, onMount } from 'svelte'
import { contextSymbol, cellContextSymbol } from './GraphContext'

export let width = 800
export let height = 600
export let panning = true
let container
let graph

setContext(contextSymbol, () => ({graph}))

onMount(() => {
  graph = new X6.Graph({
    container,
    width,
    height,
    panning: !!panning,
  })

  return () => {
    console.log('onUnMount')
  }
})

</script>


<div class="graph-contaner" style="width: 100%;height: 100%; position: relative;">
  <div bind:this={container} data-testid="custom-element" class="graph-core" style="width: 100%;height: 100%;"></div>
  <div class="graph-component">
    <slot></slot>
  </div>
</div>
