<template>
  <div class="temperature-graph-container">
    <canvas id="graphTemp"></canvas>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TemperatureGraph",

  data() {
    return {
      TEMP_ARR: [],
      HEIGHT: 200,
      WIDTH: 800,
      PADDING: 40,
    };
  },

  computed: {
    ...mapGetters(["GET_CURRENT_FORECAST_DATA"]),

    CURRENT_DAY_FORECAST() {
      return this.GET_CURRENT_FORECAST_DATA?.slice(0, 8);
    },

    DPI_WIDTH() {
      return this.WIDTH * 2;
    },
    DPI_HEIGHT() {
      return this.HEIGHT * 2;
    },

    VIEW_HEIGHT() {
      return this.DPI_HEIGHT - this.PADDING * 2;
    },
    VIEW_WIDTH() {
      return this.DPI_WIDTH;
    },
  },

  methods: {
    init(canvas, data = []) {
      const ctx = canvas.getContext("2d");

      canvas.style.width = this.WIDTH + "px";
      canvas.style.height = this.HEIGHT + "px";

      canvas.width = this.DPI_WIDTH;
      canvas.height = this.DPI_HEIGHT;
      const COUNT_POINTS = data?.length;

      let TEMP_DATA = [];
      [...data]?.map((obj) => {
        TEMP_DATA.push(Math.round(obj.main.temp));
      });

      const [Y_min, Y_max] = this.computeBoundaries(TEMP_DATA);
      const yRatio = this.VIEW_HEIGHT / (Y_max - Y_min);
      const xRatio = this.VIEW_WIDTH / COUNT_POINTS;

      //   console.log("max: ", Y_min, Y_max);

      let coords = [];
      let xData = [];
      //   axis y

      //   console.log(COUNT_POINTS, Y_min, Y_max);
      this.yAxis(ctx, COUNT_POINTS, Y_min, Y_max);
      this.xAxis(ctx, xData, xRatio);

      // Paint Graph Lines
      data.forEach((obj, idx) => {
        const {
          dt,
          main: { temp },
        } = obj;

        // console.log("temp: ", Math.round(temp));

        xData.push(dt);
        coords.push([
          idx * xRatio,
          //   Math.floor(idx * xRatio),
          Math.round(
            this.VIEW_HEIGHT - this.PADDING - Math.round(temp) * yRatio
          ),
        ]);
        // console.log(xData);
        this.paintLines(ctx, coords);
      });
    },

    xAxis(ctx, data, xRatio) {
      ctx.beginPath();
      //   console.log(data);
      for (let i = 1; i < data.length; i++) {
        const text = this.dateBuilder(data[i - 1]);
        const x = i * xRatio;
        ctx.fillText(text.toString(), x, this.DPI_HEIGHT - 10);
        // console.log("tr");
      }
      ctx.closePath();
    },

    yAxis(ctx, count, Y_min, Y_max) {
      const step = this.VIEW_HEIGHT / count;
      const textStep = (Y_max - Y_min) / count;

      //   console.log("///////// y axis");
      //   console.log("step: ", textStep);

      ctx.beginPath();
      ctx.strokeStyle = "#bbb";
      ctx.font = "normal 30px Helvetica, sans-serif";
      ctx.fillStyle = "#96a2aa";
      for (let i = 1; i <= count; i++) {
        const yPoint = step * i;
        // const text = Math.round(Y_max - textStep * i);
        const text = Y_max - textStep * i;
        // console.log(text);
        ctx.fillText(text.toString(), 0, yPoint + this.PADDING - 10);
        ctx.moveTo(0, yPoint + this.PADDING);
        ctx.lineTo(this.DPI_WIDTH, yPoint + this.PADDING);
      }
      ctx.stroke();

      //   console.log("///////// y axis");
      ctx.closePath();
    },

    paintLines(ctx, coords) {
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#ff0000";

      coords.forEach((arr) => {
        const [x, y] = arr;
        ctx.lineTo(x, y);
      });

      ctx.stroke();
      ctx.closePath();
    },

    computeBoundaries(data) {
      let min, max;

      data.forEach((num) => {
        if (typeof min !== "number") min = num;
        if (typeof max !== "number") max = num;

        if (min > num) min = num;
        if (max < num) max = num;
      });
      return [min, max];
    },

    dateBuilder(timestamp) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      //   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const date = new Date(timestamp);
      //   if (withDay) {
      //     return `${days[date.getDay()]}, ${
      //       months[date.getMonth()]
      //     } ${date.getDate()}`;
      //   }
      return `${months[date.getMonth()]} ${date.getDate()}`;
    },
  },

  mounted() {
    this.init(document.querySelector("#graphTemp"), this.CURRENT_DAY_FORECAST);
  },
};
</script>

<style lang="sass" scoped>
.temperature-graph-container

    width: 60%
    display: flex
    height: 60vh
    margin: 0 auto

#graphTemp
    width: 100%
    height: 100%
    border: 1px solid white
</style>
