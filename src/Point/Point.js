import Graph from '../Graph'
import Cesium from 'cesium/Source/Cesium.js'
import * as mu from '../mapUtil.js'

export default class Point extends Graph {
  maxPointNum = 1
  minPointNum = 1

  constructor (p) {
    super({
      type: '点',
      pixelSize: 12,
      color: '#00FF00',
      alpha: 0.8,
      ...p
    })
  }

  initProps (p) {
    super.initProps(p)
    this.props.pixelSize =  {
      value: p.pixelSize, title: '大小', type: 'number', min: 1, max: 256
    }
    this.props.color = {
      value: p.color, title: '颜色', type: 'color'
    }
    this.props.alpha = {
      value: p.alpha, title: '透明度', type: 'number', step: 0.05, max: 1, min: 0
    }
  }

  initShape() {
    this.ent = this.addShape({
      id: 'point_' + Graph.seq++,
      point: {
        pixelSize: new Cesium.CallbackProperty((time, result) => this.props.pixelSize.value, true),
        color: new Cesium.CallbackProperty((time, result) => {
          let c = Cesium.Color.fromCssColorString(this.props.color.value).withAlpha(this.props.alpha.value)
          return this.highLighted ? c.brighten(0.6, new Cesium.Color()) : c
        }, false),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    })
  }

  addHandler (ctlPoint, ctl) {
    this.ent.position = new Cesium.CallbackProperty((time, result) => {
      return this.calcuteShape(this.graph.ctl._children.concat(window.cursor), time)
    }, false)
  }

  calcuteShape (points, time) {
    if (points.length < this.minPointNum) {
      return []
    }
    return points[0].position.getValue(time)
  }

  toEdit () {
    super.toEdit()
    this.ent.position = new Cesium.CallbackProperty((time, result) => {
      return this.calcuteShape(this.graph.ctl._children, time)
    }, false)
  }

  finish () {
    if (this.ent) {
      super.finish()
      this.ent.position = this.calcuteShape(this.graph.ctl._children, mu.julianDate())
    }
  }
}
