<script>
import Cell from './Cell.svelte'

export let id = undefined
export let shape = 'edge'
export let source
export let target

$: props = {
  id,
  shape,
  source,
  target,
  ...$$restProps,
}

</script>

<Cell {...props}>
  <slot></slot>
</Cell>
