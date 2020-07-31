<template>
    <div id="container"></div>
</template>
<script>
import { TMap } from '../TMap'
export default {
    data() {
        return {
        }
    },
    mounted() {
        TMap('申请的key').then(qq => {
            var map = new qq.maps.Map(document.getElementById("container"), {
                // 地图的中心地理坐标。
                center: new qq.maps.LatLng(39.916527, 116.397128),
                 zoom: 8
            });
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
</style>