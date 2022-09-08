<svelte:options tag="my-app"/>
<script>
  import Graph from './lib/Graph.svelte'
  import Background from './lib/components/Background.svelte'
  import Grid from './lib/components/Grid.svelte'
  import Node from './lib/Node.svelte'
  import Edge from './lib/Edge.svelte'
</script>

<main>
  <x6-graph>
    <x6-background />
    <x6-grid />
    <x6-node id="1" label="node1" x={100} y={100} width={250} height={120}>
      <x6-node id="11" label="node11" x={150} y={110} />
    </x6-node>
    <x6-node id="2" label="node2" x={100} y={300} />
    <x6-edge id="1-2" source="1" target="2">
  </x6-graph>
</main>
