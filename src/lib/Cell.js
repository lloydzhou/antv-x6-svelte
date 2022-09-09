import { Node as X6Node, Edge as X6Edge, Cell as BaseShape } from '@antv/x6'
import { writable, get } from 'svelte/store'
import { usePatentContext, noop } from './GraphContext'

export const useCell = (context, options, cell, dispatch) => {
  const graph = get(context.graph)
  const parent = get(context.parent)
  // console.log('graph in cell', graph, parent, options)
  if (graph) {
    const { shape } = options
    const ShapeClass = X6Node.registry.get(shape) || X6Edge.registry.get(shape) || BaseShape
    const item = new ShapeClass(options)
    cell.set(item)

    item.once('added', (e) => dispatch('added', e))
    item.once('removed', (e) => dispatch('removed', e))
    item.on('cell:change:*', (e) => dispatch('change', e))
    if (parent) {
      parent.addChild(item)
    }
    graph.addCell(item)
  }
  return () => {
    // console.log('onDestroy')
    const item = get(cell)
    if (parent) {
      parent.removeChild(item)
    }
    if (graph) {
      graph.removeCell(item)
    }
  }
}

