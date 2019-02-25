export default (categories, graph, layout) => {
  return {
    legend: {
      data: categories
    },
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: layout,
        force: {
          repulsion: 500,
          edgeLength: 150
        },
        // 节点数据
        data: graph.nodes,
        // 连接数据
        links: graph.links,
        categories: categories,
        roam: true,
        focusNodeAdjacency: true,
        symbolSize: (value, item) => {
          if (typeof item.data.category === 'number') {
            return categories[item.data.category].symbolSize || 45;
          }
          return 45;
        },
        edgeSymbol: ['none', 'arrow'],
        // 节点
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        // 节点文字
        label: {
          show: true
        },
        // 线条
        lineStyle: {
          opacity: 1,
          color: 'source',
          curveness: layout == 'circular' ? 0.1 : 0,
          width: 1
        },
        // 线条文字
        edgeLabel: {
          formatter: '{@score}',
          show: true,
          fontSize: 12,
          fontWeight: 'bold',
          verticalAlign: 'middle',
          backgroundColor: "#fff",
          padding: 5
        },
        // 高亮状态
        emphasis: {
          lineStyle: {
            width: 5
          }
        }
      }
    ]
  };
}