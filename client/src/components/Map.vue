<template>
  <div class="map">
    <v-icon class="map__marker" x-large>mdi-map-marker</v-icon>
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer } from "vue2-leaflet";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      url:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      zoom: 18,
      // TODO: eventually we'll want to dynamically set the lat and long below.
      // store lat,long in our database?
      // try to get real time lat,long via GPS here
      center: [43.64515353395524, -79.41002994775774]
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
      this.$emit("update-center", { lat: center.lat, long: center.lng });
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
