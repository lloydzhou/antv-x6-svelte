<svelte:options tag="x6-node" />
<script>
import Cell from './Cell.svelte'

export let id = undefined
export let shape = 'rect'
export let label = ''
export let x = 0
export let y = 0
export let width = 160
export let height = 40
export let angle = 0

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
}
$: {
  // console.log('props', props, $$restProps)
  // TODO 这里更新attrs
}

</script>

<Cell {...props}>
  <slot></slot>
</Cell>
