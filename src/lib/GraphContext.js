import { getContext, setContext, tick } from 'svelte'
import { get } from 'svelte/store'
import { SvelteElement } from "svelte/internal";

// https://github.com/sveltejs/svelte/issues/1152#issuecomment-776185006
SvelteElement.prototype.disconnectedCallback = function () {
  this.$destroy();
};


export const contextSymbol = String(Symbol('x6ContextSymbol'))

export const cellContextSymbol = String(Symbol('x6cellContextSymbol'))

export function useContext(node, callback) {
  tick().then(() => {
    const host = node.getRootNode().host
    const context = host.$$.context
    if (host.parentNode.$$) {
      host.parentNode.$$.context.forEach((value, key) => {
        // console.log('value', value, key)
        if (!context.has(key)) {
          context.set(key, value)
        }
      })
    }
    // console.log('useContext', node, host, host.parentNode, host.parentNode.$$)
    if (callback) {
      const graph = get(context.get(contextSymbol))
      const parent = host.parentNode.$$ && get(host.parentNode.$$.context.get(cellContextSymbol));
      const cell = callback({graph, cell: parent, host})
      context.set(cellContextSymbol, cell)
    }
  })
}

