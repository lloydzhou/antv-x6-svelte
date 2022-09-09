# 用html标签画x6图形

1. 加载x6的js
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/antv-x6/1.34.0/x6.min.js"></script>
```

2. 加载x6tag.js（这个是将svelte封装的x6的组件编译成web component之后的代码）
```
<script type="module" src="/dist/index.js"></script>

使用本地编译的文件，或者使用cdn上面编译好的版本

<script type="module" src="https://cdn.jsdelivr.net/gh/lloydzhou/antv-x6-svelte@0.0.3/dist/index.js"></script>
```

3. 使用html标签画图
```
<x6-graph>
  <x6-background></x6-background>
  <x6-grid></x6-grid>
  <x6-node id="1" label="node1" x="100" y="100" width="250" height="120">
    <x6-node id="11" label="node11" x="150" y="110"></x6-node>
  </x6-node>
  <x6-node id="2" label="node2" x="100" y="300"></x6-node>
  <x6-edge id="1-2" source="1" target="2"></x6-edge>
</x6-graph>
```
> 其中node1是一个group，包含了node11，拖动node1的时候，node11会一起拖动


## online demo
[codesandbox 使用html标签画x6图形](https://codesandbox.io/s/antv-x6-html-988sgg?file=/index.html)

# TODO

1. 参考[antv-x6-vue](https://github.com/lloydzhou/antv-x6-vue)封装其他组件
2. 支持渲染自定义组件


