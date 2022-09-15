<svelte:options tag="x6-edge"/>
<script>
import { useCell } from './Cell'
import { getContext, cellContextSymbol, dispatch } from './GraphContext'
import { writable, get } from 'svelte/store'
import { setContext, createEventDispatcher, onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'

export let id = undefined
export let shape = 'edge'
export let source = undefined
export let target = undefined

let cell = writable(null)
setContext(cellContextSymbol, cell)

$: props = {
  ...$$restProps,
  id,
  shape,
  source,
  target,
}

const self = get_current_component()
const svelteDispatch = createEventDispatcher()
onMount(() => {
  const context = getContext(self)
  return useCell(context, props, cell, dispatch.bind(null, self, svelteDispatch))
})
</script>
