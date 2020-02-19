<template>
  <div class="map">
    <v-icon class="map__marker" x-large>mdi-map-marker</v-icon>
    <l-map
      style="height: 15rem; width: 100%; borderRadius: 4px;"
      :zoomAnimation="true"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      ref="map"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import { latLng } from "leaflet";
export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer
  },
  props: ["coords", "zoomProp"],
  data() {
    return {
      url:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      zoom: 1,
      center: { lat: 42.032974332441405, lng: -0.3515625 }
    };
  },
  created() {
    if (this.coords) {
      this.center = this.coords;
    }

    if (this.zoomProp) {
      this.zoom = this.zoomProp;
    }
  },
  watch: {
    coords(coords) {
      this.$refs.map.mapObject.flyTo(
        latLng(parseFloat(coords.lat), parseFloat(coords.lng)),
        16
      );
    }
  },
  methods: {
    zoomUpdated(newZoom) {
      this.zoom = newZoom;
      this.$emit("new-zoom", newZoom);
    },
    centerUpdated(newCenter) {
      this.center = newCenter;
      this.$emit("new-center", { ...newCenter });
    }
  }
};

// === MAP DETAILS ===
// TODO: figure out how to add attribution!
// attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
</script>
<style lang="scss">
.map {
  width: 100%;
  height: 100%;
  position: relative;
  &__marker {
    transform: translate(-50%, -100%);
    position: absolute;
    z-index: 500;
    top: 50%;
    left: 50%;
  }
}
</style>
