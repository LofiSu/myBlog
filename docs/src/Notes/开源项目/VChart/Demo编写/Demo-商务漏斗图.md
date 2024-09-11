[[Demo] demo of funnel chart · Issue #2657 · VisActor/VChart (github.com)](https://github.com/VisActor/VChart/issues/2657)

# 一份基础的 spec
[一份基础的 spec——VisActor/VChart 教程文档](https://visactor.io/vchart/guide/tutorial_docs/Basic/A_Basic_Spec)



---

category: examples

group: funnel chart

title: 业务漏斗图模版

keywords: funnelChart,composition,trend,custom,template,customMark

cover: /vchart/preview/funnel-business-template-1.0.png

option: funnelChart

---

  

# 业务漏斗图

  

## 代码演示

  

```javascript livedemo

const spec = {

  type: 'common',

  padding: { bottom: 300, top: 0 },

  height: 600,

  color: {

    type: 'ordinal',

    range: ['#4E91FF', '#8FC7FF', '#AEE2FF']

  },

  data: [

    {

      id: 'funnel',

      values: [

        { label: '进入直播间人数', value: 10000, attach: '万', average: 2000, percent: 1 },

        { label: '商品曝光人数', value: 9000, attach: '万', average: 1000, percent: 0.9 },

        { label: '商品点击人数', value: 5000, attach: '万', average: 500, percent: 0.5 },

        { label: '创建订单人数', value: 2000, attach: '万', average: 200, percent: 0.2 }

      ]

    }

  ],

  series: [

    {

      type: 'funnel',

      isTransform: true,

      heightRatio: 1,

      gap: 2,

      maxSize: '60%',

      shape: 'rect',

      categoryField: 'label',

      valueField: 'value',

      funnelOrient: 'left',

      funnelAlign: 'bottom',

      funnel: {

        style: {

          cornerRadius: 4,

          stroke: 'white',

          lineWidth: 2

        },

        state: {

          hover: {

            stroke: '#4e83fd',

            lineWidth: 1

          }

        }

      },

      transform: {

        style: {

          fill: '#A7C6ED',

          stroke: 'white',

          strokeWidth: 6,

          fillOpacity: 0.5

        },

        state: {

          hover: {

            stroke: '#4e83fd',

            strokeWidth: 1

          }

        },

        interactive: true,

        visible: true,

        zIndex: 1

      },

      transformLabel: {

        visible: true,

        style: {

          text: datum => {

            return `${(-(1 - datum.percent) * 100).toFixed(2)}%`;

          }

        }

      },

      outerLabel: {

        visible: true,

        fontWeight: 'bold',

        line: { visible: false },

        formatMethod: (label, datum) => datum.label,

        style: {

          wordWrap: true,

          wordBreak: 'break-word',

          overflow: 'hidden',

          textOverflow: 'ellipsis',

          maxWidth: '100%',

          fill: 'black',

          fontSize: 18,

          y: (data, ctx) => {

            const { getPoints } = ctx;

            const [tl, tr, br, bl] = getPoints(data);

            return tl.y + 20;

          }

        }

      },

      extensionMark: [

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              const curIndex = data.findIndex(d => d.label === datum.label);

  

              if (curIndex === 0) return '100%';

  

              const prevValue = data[curIndex - 1].value;

              const currentValue = datum.value;

  

              const percent = (currentValue / prevValue) * 100;

              return `${percent.toFixed(2)}%`;

            },

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'black',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 + 70;

            },

            y: 70

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              const curIndex = data.findIndex(d => d.label === datum.label);

  

              if (curIndex === 0) return ' ';

  

              const prevValue = data[curIndex - 1].value;

              const currentValue = datum.value;

  

              const percent = (currentValue / prevValue) * 100;

              const prevPercent = data[curIndex - 1].percent * 100;

  

              const percentDifference = percent - prevPercent;

  

              return `${percentDifference.toFixed(2)}%`;

            },

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'green',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 - 70;

            },

            y: 70

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: data => data.value,

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 + 70;

            },

            y: 100

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              const curIndex = data.findIndex(d => d.label === datum.label);

  

              if (curIndex === data.length - 1) return '';

  

              const currentValue = datum.value;

              const nextValue = data[curIndex + 1].value;

  

              const valueDifference = currentValue - nextValue;

  

              return valueDifference.toFixed(2);

            },

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 + 220;

            },

            y: 100

          }

        },

        //箭头

        {

          type: 'symbol',

          dataId: 'funnel',

          style: {

            visible: true,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 - 60;

            },

            y: 325,

            size: 18,

            scaleX: 0.8,

            symbolType: 'arrow2Right',

            cornerRadius: 5,

            fill: 'rgb(200,200,200)'

          }

        },

        //箭头尾巴

        {

          type: 'symbol',

          dataId: 'funnel',

          style: {

            visible: true,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 - 70;

            },

            y: 325,

            size: 15,

            scaleX: 0.8,

            symbolType: 'roundLine',

            lineWidth: 3,

            cornerRadius: 0,

            stroke: 'rgb(200,200,200)'

          }

        },

        //矩形-转化层的背景

        {

          type: 'rect',

          dataId: 'funnel',

          style: {

            fill: 'rgb(200,200,200)',

            fillOpacity: 0.1,

            width: 148,

            height: 300,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 - 148;

            },

            y: 45

          }

        },

        //矩形-跨层指标背景1

        {

          type: 'rect',

          dataId: 'funnel',

          zIndex: 0,

          state: {

            hover: {

              outerBorder: {

                stroke: 'rgb(11,136,245)',

                lineWidth: 1,

                strokeOpacity: 1,

                distance: 2

              },

              fill: 'rgb(11,136,245)',

              fillOpacity: 0.05

            }

          },

          style: {

            fill: 'rgb(249,249,251)',

            fillOpacity: 0.1,

            width: 330,

            height: 100,

            x: 5,

            y: 370

          }

        },

        //矩形-跨层指标背景2

        {

          type: 'rect',

          dataId: 'funnel',

          zIndex: 0,

          state: {

            hover: {

              outerBorder: {

                stroke: 'rgb(11,136,245)',

                lineWidth: 1,

                strokeOpacity: 1,

                distance: 2

              },

              fill: 'rgb(11,136,245)',

              fillOpacity: 0.05

            }

          },

          style: {

            fill: 'rgb(249,249,251)',

            fillOpacity: 0.1,

            width: 330,

            height: 100,

            x: 338,

            y: 370

          }

        },

        //多边形-朝上的半开矩形-第二个跨层指标指向线

        {

          type: 'polygon',

          dataId: 'funnel',

          style: {

            points: (datum, ctx, params, dataView) => {

              const rectanglePoints = [

                { x: 80, y: 340 },

                { x: 80, y: 360 },

                { x: 650, y: 360 },

                { x: 650, y: 340 }

              ];

              return rectanglePoints;

            },

            cornerRadius: 5,

            stroke: 'rgb(11,136,245)',

            lineWidth: 2,

            strokeOpacity: 0.2,

            closePath: false,

            pickable: false

          }

        },

        //第二个跨层指标指向线尾巴

        {

          type: 'line',

          dataId: 'funnel',

          style: {

            points: (datum, ctx, params, dataView) => {

              const lineX = 500;

              const lineStart = { x: lineX, y: 360 };

              const lineEnd = { x: lineX, y: 370 };

              return [lineStart, lineEnd];

            },

            stroke: 'rgb(11,136,245)',

            lineWidth: 2,

            pickable: false

          }

        },

        //矩形-跨层指标背景3

        {

          type: 'rect',

          dataId: 'funnel',

          zIndex: 0,

          state: {

            hover: {

              outerBorder: {

                stroke: 'rgb(11,136,245)',

                lineWidth: 1,

                strokeOpacity: 1,

                distance: 2

              },

              fill: 'rgb(11,136,245)',

              fillOpacity: 0.05

            }

          },

          style: {

            fill: 'rgb(249,249,251)',

            fillOpacity: 0.1,

            width: 330,

            height: 100,

            x: 670,

            y: 370

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: '跨层指标',

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'black',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 + 180;

            },

            y: 400

          }

        },

        {

          type: 'text',

          dataIndex: datum => {

            return datum.label === '商品曝光人数' || datum.label === '进入直播间人数' || datum.label === '商品点击人数';

          },

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              let ratio = '';

              if (datum.label === '商品曝光人数') {

                const current = data.find(d => d.label === '进入直播间人数').value;

                const target = data.find(d => d.label === '商品点击人数').value;

                ratio = `${((target / current) * 100).toFixed(2)}%`;

              } else if (datum.label === '进入直播间人数') {

                const current = data.find(d => d.label === '商品曝光人数').value;

                const target = data.find(d => d.label === '创建订单人数').value;

                ratio = `${((target / current) * 100).toFixed(2)}%`;

              } else if (datum.label === '商品点击人数') {

                const current = data.find(d => d.label === '商品点击人数').value;

                const target = data.find(d => d.label === '创建订单人数').value;

                ratio = `${((target / current) * 100).toFixed(2)}%`;

              }

              return ratio;

            },

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'green',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 + 180;

            },

            y: 430

          }

        },

        {

          type: 'text',

          dataIndex: datum => {

            return datum.label === '商品点击人数' || datum.label === '进入直播间人数' || datum.label === '商品曝光人数';

          },

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              const curIndex = data.findIndex(d => d.label === datum.label);

  

              let diffValue = '';

              if (datum.label === '商品点击人数') {

                diffValue = data[2].value - data[3].value;

              } else if (datum.label === '进入直播间人数') {

                diffValue = data[1].value - data[3].value;

              } else if (datum.label === '商品曝光人数') {

                diffValue = data[0].value - data[2].value;

              }

  

              return diffValue;

            },

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, tr] = getPoints(data);

              return (tl.x + tr.x) / 2 + 180;

            },

            y: 450

          }

        }

      ]

    }

  ]

};

  

const vchart = new VChart(spec, { dom: CONTAINER_ID });

vchart.renderSync();

  

// Just for the convenience of console debugging, DO NOT COPY!

window['vchart'] = vchart;

```

  

## 相关教程

  

[漏斗图](link)



,

        {

          "path": "business-funnel-template",

          "title": {

            "zh": "业务漏斗图模板",

            "en": "Business Funnel Template"

          }

        }











第二份改版：
---

category: examples

group: funnel chart

title: 业务漏斗图模版

keywords: funnelChart,composition,trend,custom,template,customMark

cover:

option: funnelChart

---

  

# 业务漏斗图

  

## 代码演示

  

```javascript livedemo

const spec = {

  type: 'common',

  padding: { bottom: 300, top: 0 },

  height: 600,

  color: {

    type: 'ordinal',

    range: ['#4E91FF', '#8FC7FF', '#AEE2FF']

  },

  interactions: [

    {

      type: 'element-highlight-by-key',

      highlightState: 'hover_measure',

      blurState: 'unHover_measure'

    }

  ],

  data: [

    {

      id: 'funnel',

      values: [

        { label: '进入直播间人数', value: 10000, attach: '万', average: 2000, percent: 1 },

        { label: '商品曝光人数', value: 9000, attach: '万', average: 1000, percent: 0.9 },

        { label: '商品点击人数', value: 5000, attach: '万', average: 500, percent: 0.5 },

        { label: '创建订单人数', value: 2000, attach: '万', average: 200, percent: 0.2 }

      ]

    }

  ],

  series: [

    {

      type: 'funnel',

      isTransform: true,

      heightRatio: 1,

      gap: 2,

      maxSize: '60%',

      shape: 'rect',

      categoryField: 'label',

      valueField: 'value',

      funnelOrient: 'left',

      funnelAlign: 'bottom',

      funnel: {

        style: {

          cornerRadius: 4,

          stroke: 'white',

          lineWidth: 2

        },

        state: {

          hover: {

            stroke: '#4e83fd',

            lineWidth: 1

          }

        }

      },

      transform: {

        style: {

          fill: '#A7C6ED',

          stroke: 'white',

          lineWidth: 6,

          fillOpacity: 0.5

        },

        state: {

          hover: {

            stroke: '#4e83fd',

            lineWidth: 1

          }

        },

        interactive: true,

        visible: true,

        zIndex: 1

      },

      transformLabel: {

        visible: true,

        style: {

          text: datum => {

            return `${(-(1 - datum.percent) * 100).toFixed(2)}%`;

          }

        }

      },

      outerLabel: {

        visible: true,

        fontWeight: 'bold',

        position: 'left',

        line: { visible: false },

        style: {

          wordWrap: true,

          wordBreak: 'break-word',

          overflow: 'hidden',

          textOverflow: 'ellipsis',

          maxWidth: '100%',

          fill: 'black',

          fontSize: 18,

          y: (data, ctx) => {

            const { getPoints } = ctx;

            const [tl] = getPoints(data);

            return tl.y + 20;

          }

        }

      },

      extensionMark: [

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              const curIndex = data.findIndex(d => d.label === datum.label);

              if (curIndex === -1) return '';

  

              const currentPercent = calculatePercent(curIndex, data);

              return `${currentPercent.toFixed(2)}%`;

            },

  

            fontSize: 18,

            fontWeight: 'bold',

            wordWrap: true,

            wordBreak: 'break-word',

            overflow: 'hidden',

            textOverflow: 'ellipsis',

            maxWidth: '100%',

            limit: 100,

            fill: 'black',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2;

            },

            y: 70

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              const curIndex = data.findIndex(d => d.label === datum.label);

              if (curIndex === -1) return '';

  

              const currentPercent = calculatePercent(curIndex, data);

              const prevPercent = calculatePercent(curIndex - 1, data);

              const percentDifference = prevPercent - currentPercent;

  

              return `-${percentDifference.toFixed(2)}%`;

            },

  

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'green',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              //这里实在不知道怎么定位了

              return tl.x - 70;

            },

            y: 70

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: data => data.value,

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2;

            },

            y: 100,

            wordWrap: true,

            wordBreak: 'break-word',

            overflow: 'hidden',

            textOverflow: 'ellipsis',

            maxWidth: '100%',

            limit: 50

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return;

              return ValueDifference(data, datum.label);

            },

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return tr.x + 70;

            },

            y: 100,

            wordWrap: true,

            wordBreak: 'break-word',

            overflow: 'hidden',

            textOverflow: 'ellipsis',

            maxWidth: '100%',

            limit: 50

          }

        },

        //箭头

        {

          type: 'symbol',

          dataId: 'funnel',

          style: {

            visible: true,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return tr.x + 80;

            },

            y: 325,

            size: 18,

            scaleX: 0.8,

            symbolType: 'arrow2Right',

            cornerRadius: 5,

            fill: 'rgb(200,200,200)'

          }

        },

        //箭头尾巴

        {

          type: 'symbol',

          dataId: 'funnel',

          style: {

            visible: true,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return tr.x + 70;

            },

            y: 325,

            size: 15,

            scaleX: 0.8,

            symbolType: 'roundLine',

            lineWidth: 3,

            cornerRadius: 0,

            stroke: 'rgb(200,200,200)'

          }

        },

        //矩形-转化层的背景

        {

          type: 'rect',

          // hover_measure: { visible: false },

          dataId: 'funnel',

          style: {

            fill: 'rgb(200,200,200)',

            fillOpacity: 0.1,

            width: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return tr.x - tl.x;

            },

            height: 300,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return tr.x;

            },

            y: 45

          }

        },

        //跨层指标背景

        {

          type: 'rect',

          dataId: 'funnel',

          zIndex: 0,

          state: {

            hover_measure: {

              fill: 'blue',

              stroke: 'red'

            },

            hover: {

              outerBorder: {

                stroke: 'rgb(11,136,245)',

                lineWidth: 1,

                strokeOpacity: 1,

                distance: 2

              },

              fill: 'rgb(11,136,245)',

              fillOpacity: 0.05

            }

          },

          style: {

            fill: 'rgb(200,200,200)',

            fillOpacity: 0.1,

            width: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx;

              const points = getPoints(datum);

              const index = dataView.latestData.findIndex(d => d.label === datum.label);

              if (index < 3 && points.length === 4) {

                const [tl, bl, tr, br] = points;

                return (tr.x - tl.x) * 2;

              }

              return 0; // 返回默认值或隐藏

            },

            height: 100,

            x: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx;

              const points = getPoints(datum);

              const index = dataView.latestData.findIndex(d => d.label === datum.label);

              if (index < 3 && points.length === 4) {

                const [tl, bl, tr, br] = points;

                return (tl.x + tr.x) / 2;

              }

              return 0; // 返回默认值或隐藏

            },

            y: 370

          }

        },

        {

          type: 'polygon',

          dataId: 'funnel',

          state: {

            unHover_measure: { visible: false }, // 非悬停时不可见

            hover_measure: { visible: true } // 悬停时可见

          },

          style: {

            visible: false, // 默认不可见

            points: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx;

              const points = getPoints(datum);

              renderCount++; // 更新渲染次数

  

              console.log('Render Count:', renderCount);

              if (renderCount > 3) {

                return []; // 或者 return null;

              }

              if (points.length === 4) {

                const [tl, bl, tr, br] = points;

                const middleX = (tr.x + tl.x) / 2;

                const width = (tr.x - tl.x) * 4;

  

                let adjustedX;

                if (renderCount === 1) {

                  adjustedX = middleX + width;

                } else if (renderCount === 2) {

                  adjustedX = middleX + width;

                } else {

                  adjustedX = middleX + (tr.x - tl.x) * 2;

                }

  

                return [

                  { x: middleX, y: tl.y + 40 },

                  { x: middleX, y: tl.y + 60 },

                  { x: adjustedX, y: tl.y + 60 },

                  { x: adjustedX, y: tl.y + 40 }

                ];

              }

              return [];

            },

  

            cornerRadius: 5,

            stroke: 'rgb(11,136,245)',

            lineWidth: 2,

            closePath: false,

            pickable: false

          }

        },

        {

          type: 'polygon',

          dataId: 'funnel',

          state: {

            hover_measure: { visible: true } // 悬停时可见

          },

          style: {

            visible: false, // 默认不可见

            points: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx; // 从 ctx 中获取 getPoints 方法

              const points = getPoints(datum); // 获取当前数据点的坐标

  

              if (points.length === 4) {

                // 确保有 4 个点（矩形）

                const [tl, bl, tr, br] = points; // 解构坐标点

                const middleX = (tr.x + tl.x) / 2;

                // console.log(middleX);

                const spacing = tr.x - tl.x;

                const adjustedX = middleX + spacing;

                return [

                  { x: adjustedX, y: br.y + 60 }, // 起点：中间点向上移动 20 单位

                  { x: adjustedX, y: br.y + 70 } // 终点：中间点向上移动 10 单位

                ];

              }

              return []; // 返回空数组以防出错

            },

            stroke: 'rgb(11,136,245)', // 描边颜色

            lineWidth: 2, // 描边宽度

            pickable: false // 不可拾取

          }

        },

  

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              const index = data.findIndex(d => d.label === datum.label);

              return index < 3 ? '跨层指标' : '';

            },

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'black',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2 + 140;

            },

            y: 400

          }

        },

        {

          type: 'text',

          dataIndex: 0, //索引下标不能写成函数

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              // 定义每个标签对应的计算关系

              const labelMap = {

                商品曝光人数: {

                  current: '商品曝光人数',

                  target: '创建订单人数'

                },

                进入直播间人数: {

                  current: '进入直播间人数',

                  target: '商品点击人数'

                },

                商品点击人数: {

                  current: '商品点击人数',

                  target: '创建订单人数'

                }

              };

  

              const currentLabel = datum.label;

              const mapping = labelMap[currentLabel];

  

              if (!mapping) return '';

  

              const currentData = data.find(d => d.label === mapping.current);

              const targetData = data.find(d => d.label === mapping.target);

  

              if (!currentData || !targetData) return '';

  

              const ratio = ((targetData.value / currentData.value) * 100).toFixed(2);

              return `${ratio}%`;

            },

  

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'green',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2 + 140;

            },

            y: 430

          }

        },

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              // 定义每个标签对应的计算关系

              const labelMap = {

                商品曝光人数: {

                  // current: '进入直播间人数',

                  // target: '商品点击人数'

                  current: '商品曝光人数',

                  target: '创建订单人数'

                },

                进入直播间人数: {

                  // current: '商品曝光人数',

                  // target: '创建订单人数',

                  current: '进入直播间人数',

                  target: '商品点击人数'

                },

                商品点击人数: {

                  current: '商品点击人数',

                  target: '创建订单人数'

                }

              };

  

              const currentLabel = datum.label;

              const mapping = labelMap[currentLabel];

  

              if (!mapping) return '';

  

              const currentData = data.find(d => d.label === mapping.current);

              const targetData = data.find(d => d.label === mapping.target);

  

              if (!currentData || !targetData) return '';

  

              const differentValue = currentData.value - targetData.value;

              return `${differentValue}`;

            },

  

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2 + 140;

            },

            y: 450

          }

        }

      ]

    }

  ]

};

  

let renderCount = 0;

  

//漏斗层百分比

function calculatePercent(currentIndex, data) {

  if (currentIndex === 0) return 100; // 第一个元素的百分比是 100%

  if (currentIndex < 0) return 0; // 处理负索引

  

  const prevValue = data[currentIndex - 1].value;

  const currentValue = data[currentIndex].value;

  

  const percent = (currentValue / prevValue) * 100;

  return percent;

}

  

//差值和差值百分比

function ValueDifference(data, label) {

  const curIndex = data.findIndex(d => d.label === label);

  

  if (curIndex === -1) {

    console.error('Label not found in data', label);

    return '';

  }

  const currentValue = data[curIndex].value;

  const nextValue = data[curIndex + 1]?.value ?? 0;

  

  return `${Math.trunc(currentValue - nextValue)}`;

}

  

const vchart = new VChart(spec, { dom: CONTAINER_ID });

vchart.renderSync();

  

// Just for the convenience of console debugging, do not copy

window['vchart'] = vchart;

```

  

## 相关教程

  

[漏斗图](link)



第三版本
---

category: examples

group: funnel chart

title: 业务漏斗图模版

keywords: funnelChart,composition,trend,custom,template,customMark

cover:![[Pasted image 20240719133932.png]]

option: funnelChart

---

  

# 业务漏斗图

  

## 代码演示

  

```javascript livedemo

// 计算百分比（漏斗层百分比）

function calculatePercent(currentIndex, data) {

  if (currentIndex === 0) return 100; // 第一个元素的百分比是 100%

  if (currentIndex < 0) return 0; // 处理负索引

  

  const prevValue = data[currentIndex - 1].value;

  const currentValue = data[currentIndex].value;

  

  return (currentValue / prevValue) * 100;

}

  

// 计算数值差异

function ValueDifference(data, label) {

  const curIndex = data.findIndex(d => d.label === label);

  

  if (curIndex === -1) {

    console.error('Label not found in data', label);

    return '';

  }

  const currentValue = data[curIndex].value;

  const nextValue = data[curIndex + 1]?.value ?? 0;

  

  return `${Math.trunc(currentValue - nextValue)}`;

}

  

//默认渲染次数为0

let renderCount = 0;

  

//漏斗图配置

const spec = {

  type: 'common',

  padding: { bottom: 300, top: 0 },

  height: 600,

  color: {

    type: 'ordinal',

    range: ['#4E91FF', '#8FC7FF', '#AEE2FF']

  },

  interactions: [

    {

      type: 'element-highlight-by-key',

      highlightState: 'hover_measure',

      blurState: 'unHover_measure'

    }

  ],

  data: [

    {

      id: 'funnel',

      values: [

        { label: '进入直播间人数', value: 10000, attach: '万', average: 2000, percent: 1 },

        { label: '商品曝光人数', value: 9000, attach: '万', average: 1000, percent: 0.9 },

        { label: '商品点击人数', value: 5000, attach: '万', average: 500, percent: 0.5 },

        { label: '创建订单人数', value: 2000, attach: '万', average: 200, percent: 0.2 }

      ]

    }

  ],

  series: [

    {

      type: 'funnel',

      isTransform: true,

      heightRatio: 1,

      gap: 2,

      maxSize: '60%',

      shape: 'rect',

      categoryField: 'label',

      valueField: 'value',

      funnelOrient: 'left',

      funnelAlign: 'bottom',

      funnel: {

        style: {

          cornerRadius: 4,

          stroke: 'white',

          lineWidth: 2

        },

        state: {

          hover: {

            stroke: '#4e83fd',

            lineWidth: 1

          }

        }

      },

      transform: {

        style: {

          fill: '#A7C6ED',

          stroke: 'white',

          lineWidth: 6,

          fillOpacity: 0.5

        },

        state: {

          hover: {

            stroke: '#4e83fd',

            lineWidth: 1

          }

        },

        interactive: true,

        visible: true,

        zIndex: 1

      },

      transformLabel: {

        visible: true,

        style: {

          text: datum => {

            return `${(-(1 - datum.percent) * 100).toFixed(2)}%`;

          }

        }

      },

      outerLabel: {

        visible: true,

        fontWeight: 'bold',

        position: 'left',

        line: { visible: false },

        style: {

          wordWrap: true,

          wordBreak: 'break-word',

          overflow: 'hidden',

          textOverflow: 'ellipsis',

          maxWidth: '100%',

          fill: 'black',

          fontSize: 18,

          y: (data, ctx) => {

            const { getPoints } = ctx;

            const [tl] = getPoints(data);

            return tl.y + 20;

          }

        }

      },

      extensionMark: [

        //漏斗层百分比

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              const curIndex = data.findIndex(d => d.label === datum.label);

              if (curIndex === -1) return '';

  

              const currentPercent = calculatePercent(curIndex, data);

              return `${currentPercent.toFixed(2)}%`;

            },

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'black',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2;

            },

            y: 70

          }

        },

        //转化层百分比

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              const curIndex = data.findIndex(d => d.label === datum.label);

              if (curIndex === 0) return '';

  

              const currentPercent = calculatePercent(curIndex, data);

              const prevPercent = calculatePercent(curIndex - 1, data);

              const percentDifference = prevPercent - currentPercent;

  

              return `-${percentDifference.toFixed(2)}%`;

            },

  

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'green',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              const middleX = (tr.x + tl.x) / 2;

              console.log(middleX);

              const spacing = tr.x - tl.x;

              const adjustedX = middleX - spacing;

              return adjustedX;

            },

            y: 70

          }

        },

        //漏斗层数值

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: data => data.value,

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2;

            },

            y: 100

          }

        },

        //转化层数值

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return;

              return ValueDifference(data, datum.label);

            },

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              const middleX = (tr.x + tl.x) / 2;

              console.log(middleX);

              const spacing = tr.x - tl.x;

              const adjustedX = middleX + spacing;

              return adjustedX;

            },

            y: 100

          }

        },

        //箭头

        {

          type: 'symbol',

          dataId: 'funnel',

          style: {

            visible: true,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              const middleX = (tr.x + tl.x) / 2;

              console.log(middleX);

              const spacing = tr.x - tl.x + 10;

              const adjustedX = middleX + spacing;

              return adjustedX;

            },

            y: 325,

            size: 18,

            scaleX: 0.8,

            symbolType: 'arrow2Right',

            cornerRadius: 5,

            fill: 'rgb(200,200,200)'

          }

        },

        //箭头尾巴

        {

          type: 'symbol',

          dataId: 'funnel',

          style: {

            visible: true,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              const middleX = (tr.x + tl.x) / 2;

              console.log(middleX);

              const spacing = tr.x - tl.x;

              const adjustedX = middleX + spacing;

              return adjustedX;

            },

            y: 325,

            size: 15,

            scaleX: 0.8,

            symbolType: 'roundLine',

            lineWidth: 3,

            cornerRadius: 0,

            stroke: 'rgb(200,200,200)'

          }

        },

        //矩形-转化层的背景

        {

          type: 'rect',

          dataId: 'funnel',

          style: {

            fill: 'rgb(200,200,200)',

            fillOpacity: 0.1,

            width: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return tr.x - tl.x;

            },

            height: 300,

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return tr.x;

            },

            y: 45

          }

        },

        //跨层指标背景

        {

          type: 'rect',

          dataId: 'funnel',

          zIndex: 0,

          state: {

            hover_measure: {

              fill: 'blue',

              stroke: 'red'

            },

            hover: {

              outerBorder: {

                stroke: 'rgb(11,136,245)',

                lineWidth: 1,

                strokeOpacity: 1,

                distance: 2

              },

              fill: 'rgb(11,136,245)',

              fillOpacity: 0.05

            }

          },

          style: {

            fill: 'rgb(200,200,200)',

            fillOpacity: 0.1,

            width: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx;

              const points = getPoints(datum);

              const index = dataView.latestData.findIndex(d => d.label === datum.label);

              if (index < 3 && points.length === 4) {

                const [tl, bl, tr, br] = points;

                return (tr.x - tl.x) * 2;

              }

              return 0; // 返回默认值或隐藏

            },

            height: 100,

            x: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx;

              const points = getPoints(datum);

              const index = dataView.latestData.findIndex(d => d.label === datum.label);

              if (index < 3 && points.length === 4) {

                const [tl, bl, tr, br] = points;

                return (tl.x + tr.x) / 2;

              }

              return 0; // 返回默认值或隐藏

            },

            y: 370

          }

        },

        //指向线-开口向上的矩形

        {

          type: 'polygon',

          dataId: 'funnel',

          state: {

            unHover_measure: { visible: false }, // 非悬停时不可见

            hover_measure: { visible: true } // 悬停时可见

          },

          style: {

            visible: false, // 默认不可见

            points: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx;

              const points = getPoints(datum);

              renderCount++; // 更新渲染次数

  

              // console.log('Render Count:', renderCount);

              if (renderCount > 3) {

                return []; // 或者 return null;

              }

              if (points.length === 4) {

                const [tl, bl, tr, br] = points;

                const middleX = (tr.x + tl.x) / 2;

                const width = (tr.x - tl.x) * 4;

  

                let adjustedX;

                if (renderCount === 1) {

                  adjustedX = middleX + width;

                } else if (renderCount === 2) {

                  adjustedX = middleX + width;

                } else {

                  adjustedX = middleX + (tr.x - tl.x) * 2;

                }

  

                return [

                  { x: middleX, y: tl.y + 40 },

                  { x: middleX, y: tl.y + 60 },

                  { x: adjustedX, y: tl.y + 60 },

                  { x: adjustedX, y: tl.y + 40 }

                ];

              }

              return [];

            },

  

            cornerRadius: 5,

            stroke: 'rgb(11,136,245)',

            lineWidth: 2,

            closePath: false,

            pickable: false

          }

        },

        //指向线尾巴

        {

          type: 'polygon',

          dataId: 'funnel',

          state: {

            hover_measure: { visible: true } // 悬停时可见

          },

          style: {

            visible: false, // 默认不可见

            points: (datum, ctx, params, dataView) => {

              const { getPoints } = ctx;

              const points = getPoints(datum);

  

              if (points.length === 4) {

                // 确保有 4 个点（矩形）

                const [tl, bl, tr, br] = points;

                const middleX = (tr.x + tl.x) / 2;

                // console.log(middleX);

                const spacing = tr.x - tl.x;

                const adjustedX = middleX + spacing;

                return [

                  { x: adjustedX, y: br.y + 60 },

                  { x: adjustedX, y: br.y + 70 }

                ];

              }

              return []; // 返回空数组以防出错

            },

            stroke: 'rgb(11,136,245)',

            lineWidth: 2,

            pickable: false

          }

        },

        //跨层指标

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              const index = data.findIndex(d => d.label === datum.label);

              return index < 3 ? '跨层指标' : '';

            },

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'black',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2 + 140;

            },

            y: 400

          }

        },

        //跨层指标百分比

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              // 定义每个标签对应的计算关系

              const labelMap = {

                商品曝光人数: {

                  current: '商品曝光人数',

                  target: '创建订单人数'

                },

                进入直播间人数: {

                  current: '进入直播间人数',

                  target: '商品点击人数'

                },

                商品点击人数: {

                  current: '商品点击人数',

                  target: '创建订单人数'

                }

              };

  

              const currentLabel = datum.label;

              const mapping = labelMap[currentLabel];

  

              if (!mapping) return '';

  

              const currentData = data.find(d => d.label === mapping.current);

              const targetData = data.find(d => d.label === mapping.target);

  

              if (!currentData || !targetData) return '';

  

              const ratio = ((targetData.value / currentData.value) * 100).toFixed(2);

              return `${ratio}%`;

            },

  

            fontSize: 18,

            fontWeight: 'bold',

            fill: 'green',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2 + 140;

            },

            y: 430

          }

        },

        //跨层指标数值

        {

          type: 'text',

          dataIndex: 0,

          style: {

            text: (datum, ctx, params, dataView) => {

              const data = dataView.latestData;

              if (!data) return '';

  

              // 定义每个标签对应的计算关系

              const labelMap = {

                商品曝光人数: {

                  current: '商品曝光人数',

                  target: '创建订单人数'

                },

                进入直播间人数: {

                  current: '进入直播间人数',

                  target: '商品点击人数'

                },

                商品点击人数: {

                  current: '商品点击人数',

                  target: '创建订单人数'

                }

              };

  

              const currentLabel = datum.label;

              const mapping = labelMap[currentLabel];

  

              if (!mapping) return '';

  

              const currentData = data.find(d => d.label === mapping.current);

              const targetData = data.find(d => d.label === mapping.target);

  

              if (!currentData || !targetData) return '';

  

              const differentValue = currentData.value - targetData.value;

              return `${differentValue}`;

            },

  

            fontSize: 15,

            fill: 'grey',

            textAlign: 'center',

            x: (data, ctx) => {

              const { getPoints } = ctx;

              const [tl, bl, tr, br] = getPoints(data);

              return (tl.x + tr.x) / 2 + 140;

            },

            y: 450

          }

        }

      ]

    }

  ]

};

  

const vchart = new VChart(spec, { dom: CONTAINER_ID });

vchart.renderSync();

  

// Just for the convenience of console debugging, do not copy

window['vchart'] = vchart;

```

  

## 相关教程

  

[漏斗图](link)

```js


  { label: 'VisitorstoLiveRoom', value: 10000, attach: 'k', average: 2000, percent: 1 },

        { label: 'ProductExposure', value: 9000, attach: 'k', average: 1000, percent: 0.9 },

        { label: 'ProductClicks', value: 5000, attach: 'k', average: 500, percent: 0.5 },

        { label: 'OrdersCreated', value: 2000, attach: 'k', average: 200, percent: 0.2 }
        
```