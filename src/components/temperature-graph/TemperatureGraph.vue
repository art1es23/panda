<template>
  <div class="temperature-graph-container">
    <canvas id="graphTemp"></canvas>
  </div>
</template>

<script>
export default {
  name: "TemperatureGraph",
  props: {
    forecastData: Array,
  },

  data() {
    return {
      TEMP_ARR: [],
      HEIGHT: 200,
      WIDTH: 800,
      PADDING: 40,
      CIRCLE_RADIUS: 10,
    };
  },

  computed: {
    // ...mapGetters(["GET_5_DAYS_FORECAST_DATA"]),

    localForecastData() {
      return this.forecastData;
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
    initGraph(canvas, data = []) {
      let mouse = {
        paint: this.paint,
      };
      console.log("sss: ", data);
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
            mouse.paint(ctx, COUNT_POINTS, data, TEMP_DATA, { mouse });
          });
          return result;
        },
      };
      const proxy = new Proxy(mouse, handler);

      // Mouse events
      function mousemove({ clientX }) {
        const { left } = canvas.getBoundingClientRect();
        proxy.mouse = {
          x: (clientX - left) * 2,
        };
      }

      function mouseleave() {
        proxy.mouse = null;
      }

      canvas.addEventListener("mousemove", mousemove);
      canvas.addEventListener("mouseleave", mouseleave);

      return {
        init() {
          mouse.paint(ctx, COUNT_POINTS, data, TEMP_DATA);
        },
        destroy() {
          cancelAnimationFrame(reqAnimFrame);
          canvas.removeEventListener("mousemove", mousemove);
          canvas.removeEventListener("mouseleave", mouseleave);
        },
      };
    },

    clear(ctx) {
      ctx.clearRect(0, 0, this.DPI_WIDTH, this.DPI_HEIGHT);
    },

    paint(ctx, COUNT_POINTS, data, TEMP_DATA, mouse) {
      // Find min max value of temp
      this.clear(ctx);
      // console.log("paint");
      const [Y_min, Y_max] = this.computeBoundaries(TEMP_DATA);
      const yRatio = this.VIEW_HEIGHT / (Y_max - Y_min);
      const xRatio = this.VIEW_WIDTH / COUNT_POINTS;

      // console.log(proxy.mouse);

      let coords = [];
      let xData = [];
      //   axis y
      this.yAxis(ctx, COUNT_POINTS, Y_min, Y_max);

      // Paint Graph Lines
      data.forEach((obj, idx) => {
        const { date, averageTemp } = obj;

        xData.push(date);
        coords.push([
          // idx * xRatio,
          Math.floor(idx * xRatio),
          Math.round(
            this.DPI_HEIGHT - this.PADDING - Math.round(averageTemp) * yRatio
          ),
        ]);
        this.paintLines(ctx, coords);
      });
      this.xAxis(ctx, xData, xRatio, mouse.mouse);
      for (const [x, y] of coords) {
        console.log("ssss: ", this.isOver(mouse, x, coords.length));
        if (this.isOver(mouse.mouse, x, coords.length, "#ссс")) {
          console.log(x);
          this.paintCircle(ctx, [x, y]);
          break;
        }
      }

      // console.log("mouse", mouse);
    },

    isOver({ mouse }, x, length) {
      if (!mouse) return false;
      const width = this.DPI_WIDTH / length;
      return Math.abs(x - mouse.x) < width / 2;
    },

    xAxis(ctx, data, xRatio, mouse) {
      // console.log(mouse);
      ctx.beginPath();
      ctx.fillStyle = "#ccc";

      ctx.lineWidth = 1;
      // ctx.fillStyle = "#96a2aa";
      for (let i = 0; i < data.length; i++) {
        const text = this.dateBuilder(data[i]);
        const x = i * xRatio;
        ctx.fillText(text.toString(), x, this.DPI_HEIGHT);

        if (this.isOver(mouse, x, data.length)) {
          ctx.save();
          console.log("over");
          ctx.moveTo(x, this.PADDING);

          ctx.lineTo(x, this.DPI_HEIGHT - this.PADDING);

          ctx.restore();
        }
        // console.log(this.isOver(mouse, x, data.length));
      }
      ctx.stroke();
      ctx.closePath();
    },

    yAxis(ctx, count, Y_min, Y_max) {
      const step = this.VIEW_HEIGHT / count;
      const textStep = (Y_max - Y_min) / count;

      ctx.beginPath();
      ctx.strokeStyle = "#bbb";
      ctx.font = "normal 30px Helvetica, sans-serif";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#96a2aa";
      for (let i = 0; i <= count; i++) {
        const yPoint = step * i;
        // const text = Math.round(Y_max - textStep * i);
        const text = Y_max - textStep * i;
        // const text = Y_max - textStep * i;
        // console.log(text);
        ctx.fillText(text.toFixed(1).toString(), 0, yPoint + this.PADDING - 10);
        ctx.moveTo(0, yPoint + this.PADDING);
        ctx.lineTo(this.DPI_WIDTH, yPoint + this.PADDING);
      }
      ctx.stroke();
      ctx.closePath();
    },

    paintCircle(ctx, [x, y], color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.fillStyle = "#fff";
      ctx.arc(x, y, this.CIRCLE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    },

    paintLines(ctx, coords) {
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#41A286";

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

      const date = new Date(timestamp);
      return `${months[date.getMonth()]} ${date.getDate()}`;
    },
  },

  mounted() {
    console.log(this.localForecastData);
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

#graphTemp
    width: 100%
    height: 100%
    // border: 1px solid white
</style>
