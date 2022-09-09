<svelte:options tag="x6-graph"/>
<script>
import * as X6 from '@antv/x6'
import { setContext, onMount } from 'svelte'
import { contextSymbol, cellContextSymbol } from './GraphContext'
import { writable, get } from 'svelte/store'

export let width = 800
export let height = 600
export let panning = true
export let css = 'https://cdnjs.cloudflare.com/ajax/libs/antv-x6/1.34.0/x6.min.css'
let container
let graph = writable(null)

setContext(contextSymbol, graph)

onMount(() => {
  const instance = new X6.Graph({
    container,
    width,
    height,
    panning: !!panning,
  })

  graph.set(instance)

  return () => {
    instance.dispose()
  }
})


</script>

<link rel="stylesheet" type="text/css" href={css}>
<div class="graph-contaner" style="width: 100%;height: 100%; position: relative;">
  <div bind:this={container} data-testid="custom-element" class="graph-core" style="width: 100%;height: 100%;"></div>
  <div class="graph-component">
    <slot></slot>
  </div>
</div>
