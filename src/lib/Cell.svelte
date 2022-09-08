<svelte:options tag="x6-cell" />
<script>
import { Node as X6Node, Edge as X6Edge, Cell as BaseShape } from '@antv/x6'
import { onDestroy, createEventDispatcher } from 'svelte'
import { writable, get } from 'svelte/store'
import { useContext } from './GraphContext'

export let id = undefined
export let shape = 'rect'

let cell = writable(null)
let graph
let parent

const dispatch = createEventDispatcher();

$: options = {
  id, ...$$restProps,
}

$: {
  // console.log('options', options, $$restProps)
  // TODO 刷新attrs
}

onDestroy(() => {
  console.log('onDestroy')
  const item = get(cell)
  if (parent) {
    parent.removeChild(item)
  }
  if (graph) {
    graph.removeCell(item)
  }
})

const setup = (context) => {
  graph = context.graph
  parent = context.cell
  // console.log('graph in cell', graph, parent, id, context.host)
  if (graph) {
    const ShapeClass = X6Node.registry.get(shape) || X6Edge.registry.get(shape) || BaseShape
    const item = $cell = new ShapeClass(options)

    item.once('added', (e) => dispatch('added', e))
    item.once('removed', (e) => dispatch('removed', e))
    item.on('cell:change:*', (e) => dispatch('change', e))
    if (parent) {
      parent.addChild(item)
    }
    graph.addCell(item)
  }
  return cell
}

</script>
<slot use:useContext={setup} />

