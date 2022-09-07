<script>
import { Node as X6Node, Edge as X6Edge, Shape, Cell as BaseShape } from '@antv/x6'
import { getContext, onMount, tick, createEventDispatcher, setContext } from 'svelte'
import { contextSymbol, cellContextSymbol } from './GraphContext'

export let id
export let shape = 'rect'

let cell

setContext(cellContextSymbol, () => ({ cell }))

const getGraph = getContext(contextSymbol)
const getParent = getContext(cellContextSymbol)
const dispatch = createEventDispatcher();

$: options = {
  id, ...$$restProps,
}

$: {
  console.log('options', options, $$restProps)
}

onMount(async () => {
  await tick()
  const { graph } = getGraph()
  const { cell: parent } = getParent()

  if (graph) {
    const ShapeClass = X6Node.registry.get(shape) || X6Edge.registry.get(shape) || BaseShape

    cell = new ShapeClass(options)

    cell.once('added', (e) => dispatch('added', e))
    cell.once('removed', (e) => dispatch('removed', e))
    cell.on('cell:change:*', (e) => dispatch('change', e))

    if (parent) {
      parent.addChild(cell)
    }
    graph.addCell(cell)
    return () => {
      cell.off('cell:change:*')
      if (parent) {
        parent.removeChild(cell)
      }
      graph.removeCell(cell)
      cell = null
    }
  }
})
</script>

<slot></slot>

