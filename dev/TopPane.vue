<template>
  <div>
    <div class="topbar">
      <div v-for="(v, k, i) in funcs1" :key="i" >
        <a-button ghost class="topbtn" v-for="c in v" :key="c.name" @click="c.func">{{c.name}}</a-button>
        <br/>
      </div>
    </div>
    <file-upload />
  </div>
</template>

<script>
import gx from '../src/index.js'
import fs from 'file-saver'
import FileUpload from 'vue-upload-component/src'

export default {
  components: {
    FileUpload
  },
  data () {
    return {
      message: '',
      graphList: [],
      funcs1: [
        [
          {name: '多边形', func: () => gx.start(new gx.Polygon({color: '#0000FF'})) },
          {name: '矩形', func: () => gx.start(new gx.Rectangle({color: '#0000FF'})) },
          {name: '单箭头', func: () => gx.start(new gx.Arrow1({color: '#0000FF'})) },
          {name: '椭圆', func: () => gx.start(new gx.Ellipse({color: '#0000FF'})) },
          {name: '圆', func: () => gx.start(new gx.Circle({color: '#0000FF'})) },
        ],
        [
          {name: '直线', func: () => gx.start(new gx.Polyline({color: '#f00'})) },
          {name: 'bezier1', func: () => gx.start(new gx.Bezier1({color: '#f00'})) },
          {name: 'bezier2', func: () => gx.start(new gx.Bezier2({color: '#f00'})) },
          {name: 'bezierN', func: () => gx.start(new gx.BezierN({color: '#f00'})) },
          {name: '平滑线', func: () => gx.start(new gx.BezierSpline({color: '#f00'})) },
          {name: '圆弧线', func: () => gx.start(new gx.CircleArc({color: '#f00'})) },
        ],
        [
          {name: '点', func: () => gx.start(new gx.Point({color: '#0f0'})) },
          {name: '船', func: () => gx.start(new gx.Boat({color: '#0f0'})) },
          {name: '车', func: () => gx.start(new gx.Vehicle({color: '#0f0'})) },
          {name: '地面站', func: () => gx.start(new gx.Station({color: '#0f0'})) },
          {name: '卫星', func: () => gx.start(new gx.Satellite({color: '#0f0'})) },
        ],
        [
          {name: '图', func: () => gx.start(new gx.Image({color: '#ff0'})) },
          {name: '红旗', func: () => gx.start(new gx.RedFlag({color: '#ff0'})) },
        ],
        [
          {name: '删除', func: () => gx.deleteGraph() },
          {name: '清空', func: () => gx.deleteAllGraph() },
          {name: '自动', func: this.createByJson }
        ], [
          {name: '保存', func: this.saveGraphs },
          {name: '上传', func: this.loadGraphs }
        ]
      ]
    }
  },
  methods: {
    createByJson () {
      gx.create(new gx.Point({color: '#f00', ctls: [[98, 37]]}))
      gx.create(new gx.Point({color: '#f50', ctls: [{lon: 98, lat: 39}]}))
      gx.create(new gx.Point({color: '#f80', ctls: [{lon: 100, lat: 39}]}))
      gx.create(new gx.Point({color: '#fc0', ctls: [[100, 37]]}))
      gx.create(new gx.Polygon({color: '#f08', ctls: [
        {lon: 102, lat: 40},
        [110, 43, 10000],
        {lon: 110, lat: 43},
        {lon: 102, lat: 46, hei: 10000},
      ]}))
      gx.create(new gx.Polyline({color: '#0ff', ctls: [
        {lon: 112, lat: 40, hei: 0},
        {lon: 120, lat: 43, hei: 10000},
        {lon: 112, lat: 46},
      ]}))
    },
    loadGraphs () {

    },
    saveGraphs () {
      let data = gx.GraphManager.getInstance().getAll().map(g => {
        return g.getProperties()
      })
      console.log('currentGraphs: ', data)
      let blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"})
      fs.saveAs(blob, "graphs.json")
    }
  }
}
</script>

<style scoped>
.topbar {
  top: 4px;
  position: absolute;
}

.topbtn {
  width: 80px;
  height: 32px;
  margin: 1px 5px;
  color: white;
}
</style>
