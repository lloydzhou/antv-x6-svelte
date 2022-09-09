import { get_current_component, raf } from 'svelte/internal'
import { getContext, setContext, tick } from 'svelte'
import { get } from 'svelte/store'
// import { SvelteElement } from "svelte/internal";

// https://github.com/sveltejs/svelte/issues/1152#issuecomment-776185006
// SvelteElement.prototype.disconnectedCallback = function () {
//   this.$destroy();
// };


export const contextSymbol = String(Symbol('x6ContextSymbol'))

export const cellContextSymbol = String(Symbol('x6cellContextSymbol'))

export const parentCellContextSymbol = String(Symbol('x6parentCellContextSymbol'))

export function useContext(node, callback) {
  tick().then(() => tick()).then(() => {
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

export function usePatentContext(_, callback) {
  const self = get_current_component()
  // 当前节点渲染的时候，拿不到父节点元素，所以usePatentContext使用了tick
  return tick().then(() => tick()).then(() => {
    // const parent = self.parentNode
    const parent = self.$$.root.host.parentNode
    console.log('parent', self, parent)
    const context = self.$$.context
    const host = self.$$.root.getRootNode().host
    // const context = host.$$.context
    // const pcontext = parent && parent.$$ && parent.$$.context
    const pcontext = host.parentNode && host.parentNode.$$ && host.parentNode.$$.context
    // console.log('context', context, pcontext, self, parent)
    // 编译成web component之后，setContext不能跨组件
    // 这里直接从pcontext读取
    const graph = pcontext && pcontext.get(contextSymbol)
    if (graph) {
      context.set(contextSymbol, graph)
    }
    const p = pcontext && pcontext.get(cellContextSymbol)
    const c = context.get(cellContextSymbol)
    return {
      graph: graph && get(graph),
      parent: p && get(p),
      cell: c && get(c),
    }
  }).then(context => {
    if (callback) {
      callback(context)
    }
    return context
  })
}

export { noop } from 'svelte/internal'
export { get } from 'svelte/store'

