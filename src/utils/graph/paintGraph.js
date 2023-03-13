import dateBuilder from "../dateBuilder";

const HEIGHT = 200;
const WIDTH = window.innerWidth < 700 ? 360 : 600;
const PADDING = 40;
const CIRCLE_RADIUS = 10;

let DPI_WIDTH = WIDTH * 2;
let DPI_HEIGHT = HEIGHT * 2;
let VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
let VIEW_WIDTH = DPI_WIDTH;

function isOver({ mouse }, x, length) {
  if (!mouse) return false;
  const width = DPI_WIDTH / length;
  return Math.abs(x - mouse.x) < width / 2;
}

function xAxis(ctx, xData, xRatio, mouse, tt, data) {
  ctx.beginPath();
  ctx.fillStyle = "#ccc";

  ctx.lineWidth = 1;
  for (let i = 0; i < xData.length; i++) {
    const text = dateBuilder(xData[i]);
    const x = i * xRatio;
    ctx.fillText(text.toString(), x, DPI_HEIGHT);

    if (isOver(mouse, x, xData.length)) {
      ctx.save();
      ctx.moveTo(x, PADDING);
      ctx.lineTo(x, DPI_HEIGHT - PADDING);
      ctx.restore();

      tt.show(mouse.mouse.tooltip, {
        title: dateBuilder(xData[i]),

        items: {
          averageTemp: data[i].averageTemp,
          weather: data[i].weather,
        },
      });
    }
  }
  ctx.stroke();
  ctx.closePath();
}

function yAxis(ctx, count, Y_min, Y_max) {
  const step = VIEW_HEIGHT / count;
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
    ctx.fillText(text.toFixed(1).toString(), 0, yPoint + PADDING - 10);
    ctx.moveTo(0, yPoint + PADDING);
    ctx.lineTo(DPI_WIDTH, yPoint + PADDING);
  }
  ctx.stroke();
  ctx.closePath();
}

function paintCircle(ctx, [x, y], color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = "#fff";
  ctx.arc(x, y, CIRCLE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function paintLines(ctx, coords) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#41A286";

  coords.forEach((arr) => {
    const [x, y] = arr;
    ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.closePath();
}

function computeBoundaries(data) {
  let min, max;

  data.forEach((num) => {
    if (typeof min !== "number") min = num;
    if (typeof max !== "number") max = num;

    if (min > num) min = num;
    if (max < num) max = num;
  });
  return [min, max];
}

function clearCtx(ctx) {
  ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
}

export function paint(ctx, COUNT_POINTS, data, TEMP_DATA, mouse, tt) {
  clearCtx(ctx);
  const [Y_min, Y_max] = computeBoundaries(TEMP_DATA);
  const yRatio = VIEW_HEIGHT / (Y_max - Y_min);
  const xRatio = VIEW_WIDTH / COUNT_POINTS;

  let coords = [];
  let xData = [];
  //   axis y
  yAxis(ctx, COUNT_POINTS, Y_min, Y_max);

  // Paint Graph Lines
  data.forEach((obj, idx) => {
    const { date, averageTemp } = obj;

    xData.push(date);
    coords.push([
      // idx * xRatio,
      Math.floor(idx * xRatio),
      Math.round(DPI_HEIGHT + PADDING - Math.round(averageTemp) * yRatio),
    ]);
    paintLines(ctx, coords);
  });
  xAxis(ctx, xData, xRatio, mouse.mouse, tt, data);
  for (const [x, y] of coords) {
    if (isOver(mouse.mouse, x, coords.length, "#ссс")) {
      paintCircle(ctx, [x, y]);
      break;
    }
  }
}

function css(el, styles = {}) {
  Object.assign(el.style, styles);
}

const template = ({ title, items }) => {
  return `
  <div class="tooltip-title">${title}</div>
  <ul class="tooltip-list">
        <li class="tooltip-list-item">
          <div class="tooltip-temp">${items.averageTemp}&#8451;</div>
          <div class="tooltip-weather"">${items.weather}</div>
        </li>
  </ul>
`;
};

export function tooltip(el) {
  const clear = () => (el.innerHTML = "");
  return {
    show({ left, top }, data) {
      const { height, width } = el.getBoundingClientRect();
      clear();
      css(el, {
        display: "block",
        top: top - height + "px",
        left: left + width / 2 + "px",
      });
      el.insertAdjacentHTML("afterbegin", template(data));
    },
    hide() {
      css(el, { display: "none" });
    },
  };
}
