<template>
  <div class="temperature-graph-container" id="graphTemp">
    <div class="tooltip" data-el="tooltip"></div>
    <canvas></canvas>
  </div>
</template>

<script>
import { paint, tooltip } from "@/utils/graph/paintGraph.js";
export default {
  name: "TemperatureGraph",
  props: {
    forecastData: Array,
  },

  data() {
    return {
      TEMP_ARR: [],
      HEIGHT: 200,
      WIDTH: window.innerWidth < 800 ? 360 : 600,
    };
  },

  computed: {
    localForecastData() {
      return this.forecastData;
    },

    DPI_WIDTH() {
      return this.WIDTH * 2;
    },
    DPI_HEIGHT() {
      return this.HEIGHT * 2;
    },
  },

  methods: {
    initGraph(root, data = []) {
      console.log(data);
      const canvas = root.querySelector("canvas");
      const tt = tooltip(root.querySelector('[data-el="tooltip"]'));
      let mouse = {
        paint,
      };
      const ctx = canvas.getContext("2d");

      let reqAnimFrame;
      canvas.style.width = this.WIDTH + "px";
      canvas.style.height = this.HEIGHT + "px";

      canvas.width = this.DPI_WIDTH;
      canvas.height = this.DPI_HEIGHT;
      const COUNT_POINTS = data?.length;

      let TEMP_DATA = [];

      data?.map((obj) => {
        TEMP_DATA.push(Math.round(obj.averageTemp));
      });

      let handler = {
        set(...args) {
          const result = Reflect.set(...args);
          reqAnimFrame = requestAnimationFrame(function () {
            mouse.paint(ctx, COUNT_POINTS, data, TEMP_DATA, { mouse }, tt);
          });
          return result;
        },
      };
      const proxy = new Proxy(mouse, handler);

      // Mouse events
      function mousemove({ clientX, clientY }) {
        const { left, top } = canvas.getBoundingClientRect();
        proxy.mouse = {
          x: (clientX - left) * 2,
          tooltip: {
            left: clientX - left,
            top: clientY - top,
          },
        };
      }

      function mouseleave() {
        proxy.mouse = null;
        root.querySelector('[data-el="tooltip"]').style.display = "none";
      }

      canvas.addEventListener("mousemove", mousemove);
      canvas.addEventListener("mouseleave", mouseleave);

      return {
        init() {
          mouse.paint(ctx, COUNT_POINTS, data, TEMP_DATA, { mouse }, tt);
        },
        destroy() {
          cancelAnimationFrame(reqAnimFrame);
          canvas.removeEventListener("mousemove", mousemove);
          canvas.removeEventListener("mouseleave", mouseleave);
        },
      };
    },
  },

  mounted() {
    const graph = this.initGraph(
      document.querySelector("#graphTemp"),
      this.localForecastData
    );

    graph.init();
  },
};
</script>

<style lang="sass" scoped>
.temperature-graph-container
  width: 90%
  display: flex
  height: 60vh
  margin: 0 auto
  position: relative

#graphTemp
  width: 100%
  height: 100%
  display: flex
  justify-content: center
</style>
