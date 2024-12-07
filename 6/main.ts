const input = await Deno.readTextFile("input.txt");

let rows = input.split("\n").map((row) => row.split(""));

const height = rows.length;
const width = rows[0].length;

let curPos = { x: 0, y: 0 };
for (let y = 0; y < height; y++) {
  let x = 0;
  if (
    (x = rows[y].indexOf("^")) !== -1 ||
    (x = rows[y].indexOf(">")) !== -1 ||
    (x = rows[y].indexOf("v")) !== -1 ||
    (x = rows[y].indexOf(">")) !== -1
  ) {
    curPos = { x: Number(x), y };
    break;
  }
}
//console.log(`initial pos: ${curPos}`);

let posCount = 1;
const nextMoveByCursor = {
  "^": { x: 0, y: -1, turn: ">" },
  ">": { x: 1, y: 0, turn: "v" },
  v: { x: 0, y: 1, turn: "<" },
  "<": { x: -1, y: 0, turn: "^" },
};

for (;;) {
  //console.log(`cursor ${rows[curPos.y][curPos.x]}`);
  const nextMove =
    nextMoveByCursor[rows[curPos.y][curPos.x] as "^" | ">" | "v" | "<"];
  const nextPos = { x: curPos.x + nextMove.x, y: curPos.y + nextMove.y };
  if (
    nextPos.x < 0 ||
    nextPos.x >= width ||
    nextPos.y < 0 ||
    nextPos.y >= height
  ) {
    //finished
    console.log(posCount);
    break;
  }
  const nextContent = rows[nextPos.y][nextPos.x];
  if (nextContent === "#") {
    rows[curPos.y][curPos.x] = nextMove.turn;
    continue;
  }
  if (nextContent === ".") {
    posCount++;
  }
  rows[nextPos.y][nextPos.x] = rows[curPos.y][curPos.x];
  rows[curPos.y][curPos.x] = "X";
  curPos = nextPos;
}

//**************************************************************************** */

rows = input.split("\n").map((row) => row.split(""));
for (let y = 0; y < height; y++) {
  let x = 0;
  if (
    (x = rows[y].indexOf("^")) !== -1 ||
    (x = rows[y].indexOf(">")) !== -1 ||
    (x = rows[y].indexOf("v")) !== -1 ||
    (x = rows[y].indexOf(">")) !== -1
  ) {
    curPos = { x: Number(x), y };
    break;
  }
}
const initialPos = { ...curPos };

function hasLoop(simulated: string[][], curPos_: { x: number; y: number }) {
  const positions: any[] = [];
  let cursor = simulated[curPos_.y][curPos_.x] as "^" | ">" | "v" | "<";
  for (;;) {
    if (
      positions.some(
        (candidate) =>
          candidate.x === curPos_.x &&
          candidate.y === curPos_.y &&
          candidate.cursor === cursor
      )
    ) {
      return true;
    }
    positions.push({ x: curPos_.x, y: curPos_.y, cursor });
    const nextMove = nextMoveByCursor[cursor];
    const nextPos = { x: curPos_.x + nextMove.x, y: curPos_.y + nextMove.y };
    if (
      nextPos.x < 0 ||
      nextPos.x >= width ||
      nextPos.y < 0 ||
      nextPos.y >= height
    ) {
      //finished
      return false;
    }

    const nextContent = simulated[nextPos.y][nextPos.x];

    if (nextContent === "#") {
      cursor = nextMove.turn as "^" | ">" | "v" | "<";
      continue;
    }
    curPos_ = nextPos;
  }
}

const result: Record<string, boolean> = {};
posCount = 0;
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    if (x === initialPos.x && y === initialPos.y) {
      continue;
    }
    const simulatedGrid = [...rows.map((row) => [...row])];
    simulatedGrid[y][x] = "#";
    if (hasLoop(simulatedGrid, { ...initialPos })) {
      console.log(`hasloop ${x},${y}`);
      result[`${x},${y}`] = true;
      posCount++;
    }
  }
}
console.log(posCount);

// for (;;) {
//   //console.log(`cursor ${rows[curPos.y][curPos.x]}`);
//   const nextMove =
//     nextMoveByCursor[rows[curPos.y][curPos.x] as "^" | ">" | "v" | "<"];
//   const nextPos = { x: curPos.x + nextMove.x, y: curPos.y + nextMove.y };
//   if (
//     nextPos.x < 0 ||
//     nextPos.x >= width ||
//     nextPos.y < 0 ||
//     nextPos.y >= height
//   ) {
//     //finished
//     //console.log(posCount);
//     console.log(Object.keys(result).length);
//     console.log(initialPos);
//     if (result[initialPos]) {
//       console.log("-1");
//     }
//     break;
//   }
//   //try to loop
//   if (typeof result[`${nextPos.x},${nextPos.y}`] === "undefined") {
//     const simulation = [...rows.map((row) => [...row])];
//     simulation[nextPos.y][nextPos.x] = "#";
//     if (hasLoop(simulation, { ...curPos })) {
//       console.log(`hasloop ${nextPos.x},${nextPos.y}`);
//       result[`${nextPos.x},${nextPos.y}`] = true;
//       posCount++;
//     } else {
//       //console.log("noloop");
//       result[`${nextPos.x},${nextPos.y}`] = false;
//     }
//   }
//   const nextContent = rows[nextPos.y][nextPos.x];
//   if (nextContent === "#") {
//     rows[curPos.y][curPos.x] = nextMove.turn;
//     continue;
//   }
//   rows[nextPos.y][nextPos.x] = rows[curPos.y][curPos.x];
//   rows[curPos.y][curPos.x] = "X";
//   curPos = nextPos;
// }
