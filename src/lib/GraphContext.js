import { get_current_component, raf } from 'svelte/internal'
import { setContext, tick, createEventDispatcher } from 'svelte'
import { get } from 'svelte/store'

export const contextSymbol = String(Symbol('x6ContextSymbol'))

export const cellContextSymbol = String(Symbol('x6cellContextSymbol'))

export function getContext(self) {
  const parent = self.parentNode
  const pcontext = parent.$$.context
  // console.log('parent', self, parent, pcontext)
  const graph = pcontext && pcontext.get(contextSymbol)
  if (graph) {
    const context = self.$$.context
    context.set(contextSymbol, graph)
  }
  const p = pcontext && pcontext.get(cellContextSymbol)
  return {
    graph,
    parent: p,
  }
}

export { get } from 'svelte/store'

export const dispatch = (component, svelteDispatch, name, detail) => {
  // console.log(`svelte: ${name}`, component, svelteDispatch);
  svelteDispatch(name, detail);
  component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
};
