<template>
  <div>
    <div id="container"></div>
    <div id="toolControl">
      <div class="toolItem active" id="marker" title="点标记"></div>
      <div class="toolItem" id="polyline" title="折线"></div>
      <div class="toolItem" id="polygon" title="多边形"></div>
      <div class="toolItem" id="circle" title="圆形"></div>
    </div>
  </div>
</template>
<script>
import { TMap } from '../Tmap'
export default {
    data() {
        return {
        }
    },
    mounted() {
      var map, editor, activeType = 'marker';

      // 切换激活图层
      document.getElementById('toolControl').addEventListener('click', (e) => {
        let id = e.target.id;
        if (id !== 'toolControl') {
          document.getElementById(activeType).className = "toolItem";
          document.getElementById(id).className = "toolItem active";
          activeType = id;

          editor.setActiveOverlay(id);
          console.log(id);
        }
      });
      TMap('申请的key').then(qq => {
          map = new qq.maps.Map(document.getElementById("container"), {
              // 地图的中心地理坐标。
              center: new qq.maps.LatLng(30.73086, 114.220541),
              zoom: 16,
              rotation: 90,  // 这里旋转为什么不起作用？
          });
      });

      // 初始化几何图形及编辑器
			editor = new TMap.tools.GeometryEditor({
				map, // 编辑器绑定的地图对象
				overlayList: [ // 可编辑图层
					{
						overlay: new TMap.MultiMarker({
							map
						}),
						id: 'marker'
					},
					{
						overlay: new TMap.MultiPolyline({
							map
						}),
						id: 'polyline'
					},
					{
						overlay: new TMap.MultiPolygon({
							map
						}),
						id: 'polygon'
					},
					{
						overlay: new TMap.MultiCircle({
							map
						}),
						id: 'circle'
					}
				],
				actionMode: TMap.tools.constants.EDITOR_ACTION.DRAW, // 编辑器的工作模式
				activeOverlayId: 'marker', // 激活图层
				snappable: true // 开启吸附
      });

      // 监听绘制结束事件，获取绘制几何图形
			editor.on('draw_complete', (geometry) => { 
				console.log(geometry);
			});
    },
    methods: {

    },
    created: function () {

    }
}
</script>
<style>
  #container {
      min-width:600px;
      min-height:767px;
  }

	#toolControl {
		position: absolute;
		top: 10px;
		left: 0px;
		right: 0px;
		margin: auto;
		width: 168px;
		z-index: 1001;
	}

	.toolItem {
		width: 30px;
		height: 30px;
		float: left;
		margin: 1px;
		padding: 4px;
		border-radius: 3px;
		background-size: 30px 30px;
		background-position: 4px 4px;
		background-repeat: no-repeat;
		box-shadow: 0 1px 2px 0 #E4E7EF;
		background-color: #ffffff;
		border: 1px solid #ffffff;
	}

	.toolItem:hover {
		border-color: #789CFF;
	}

	.active {
		border-color: #D5DFF2;
		background-color: #D5DFF2;
	}

	#marker {
		background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker_editor.png');
	}
	#polyline {
		background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polyline.png');
	}
	#polygon {
		background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polygon.png');
	}
	#circle {
		background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/circle.png');
	}
</style>