<svelte:options tag="x6-edge"/>
<script>
import Cell from './Cell.svelte'

export let id = undefined
export let shape = 'edge'
export let source = undefined
export let target = undefined

$: props = {
  ...$$restProps,
  id,
  shape,
  source,
  target,
}
</script>
<Cell {...props} />
