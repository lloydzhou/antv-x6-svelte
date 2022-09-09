<svelte:options tag="x6-edge"/>
<script>
import { useCell } from './Cell'
import { usePatentContext, noop, cellContextSymbol } from './GraphContext'
import { writable, get } from 'svelte/store'
import { setContext, createEventDispatcher, onMount } from 'svelte'

export let id = undefined
export let shape = 'edge'
export let source = undefined
export let target = undefined

let cell = writable(null)
setContext(cellContextSymbol, cell)
const dispatch = createEventDispatcher();

$: props = {
  ...$$restProps,
  id,
  shape,
  source,
  target,
}

let unmount = noop;
onMount(() => () => unmount())

usePatentContext().then(context => {
  unmount = useCell(context, props, cell, dispatch)
})
</script>
