<svelte:options tag="x6-node" />
<script>
import { useCell } from './Cell'
import { getContext, cellContextSymbol, dispatch } from './GraphContext'
import { writable, get } from 'svelte/store'
import { setContext, createEventDispatcher, onMount, beforeUpdate, afterUpdate } from 'svelte'
import { get_current_component, not_equal } from 'svelte/internal'

let cell = writable(null)
setContext(cellContextSymbol, cell)
const svelteDispatch = createEventDispatcher()

export let id = undefined
export let shape = 'rect'
export let label = ''
export let x = 0
export let y = 0
export let width = 160
export let height = 40
export let angle = 0
export let markup = undefined
export let zIndex = undefined
export let visible = true

$: props = {
  ...$$restProps,
  id,
  shape,
  label,
  width: Number(width) || 160,
  height: Number(height) || 40,
  x: Number(x) || 0,
  y: Number(y) || 0,
  angle: Number(angle) || 0,
  markup,
  zIndex,
  visible,
}
$: {
  // console.log('props', props, $$restProps)
  // Object.keys(props).forEach(key => {
  // })
  // TODO 这里更新attrs
}

afterUpdate(() => {
  const item = get(cell)
  // console.log('afterUpdate', props, item)
  if (item) {
    Object.keys(props).forEach(key => {
      // ['angle', 'position', 'size', 'attrs', 'visible', 'shape', 'id', 'parent', 'zIndex', 'label']
      const value = props[key]
      if (undefined === value) {
        return
      }
      if (['angle', 'attrs', 'visible', 'parent', 'zIndex', 'data'].indexOf(key) > -1) {
        if (value && not_equal(item.prop(key), value)) {
          console.log('setProp', key, value, item.prop(key))
          item.prop(key, value)
        }
      }
      if (key === 'label' && value && not_equal(item.attr('label/text'), value)) {
        item.attr('label/text', value)
      }
    })
    const {x, y} = item.prop('position')
    if (props.x && props.y && (not_equal(x, props.x) || not_equal(y, props.y))) {
      item.prop('position', {x: Number(props.x), y: Number(props.y)})
    }
    const {width, height} = item.prop('size')
    if (props.width && props.height && (not_equal(width, props.width) || not_equal(height, props.height))) {
      item.prop('size', {width: Number(props.width), height: Number(props.height)})
    }
    // 如果id变化了，就创建新的id
    if (props.id && not_equal(item.id, props.id)) {
    // if (props.id && item.model) {
      $cell = item.model.updateCellId(item, props.id)
      console.log('$cell', $cell)
    }
  }
})

//   6 export const CellProps = ['id', 'markup', 'attrs', 'shape', 'view', 'zIndex', 'visible', 'data', 'parent']
//   7 export const EdgeProps = CellProps.concat('source', 'target', 'vertices', 'router', 'connector', 'labels', 'defaultLabel')
//   8 export const NodeProps = CellProps.concat('x', 'y', 'width', 'height', 'angle', 'ports', 'label', 'magnet')


const self = get_current_component()
onMount(() => {
  const context = getContext(self)
  return useCell(context, props, cell, dispatch.bind(null, self, svelteDispatch))
})
</script>
<slot></slot>
