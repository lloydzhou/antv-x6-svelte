<script>
  import Graph from './lib/Graph.svelte'
  import Background from './lib/components/Background.svelte'
  import Grid from './lib/components/Grid.svelte'
  import Node from './lib/Node.svelte'
  import Edge from './lib/Edge.svelte'
</script>

<main>
  <Graph>
    <Background />
    <Grid />
    <Node id="1" label="node1" x={100} y={100} />
    <Node id="2" label="node2" x={200} y={200} />
    <Edge id="1-2" source="1" target="2" />
  </Graph>
</main>

<style>
</style>
