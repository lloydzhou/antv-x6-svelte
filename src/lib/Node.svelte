<script>
import Cell from './Cell.svelte'

export let id
export let shape = 'rect'
export let label = ''
export let x = 0
export let y = 0
export let width = 160
export let height = 40
export let angle = 0

$: props = {
  id,
  shape,
  label,
  width: Number(width) || 160,
  height: Number(height) || 40,
  x: Number(x) || 0,
  y: Number(y) || 0,
  angle: Number(angle) || 0,
  ...$$restProps,
}

</script>

<Cell {...props}>
  <slot></slot>
</Cell>
