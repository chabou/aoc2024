const input = await Deno.readTextFile("input.txt");

type Point = {
  x: number;
  y: number;
};

const rows = input.split("\n").map((row) => row.split(""));
const height = rows.length;
const width = rows[0].length;
let antinodes: Set<string> = new Set();
const antennas: Record<string, Point[]> = {};
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const content = rows[y][x];
    if (content === ".") {
      continue;
    }
    if (!antennas[content]) {
      antennas[content] = [];
    }
    antennas[content].push({ x, y });
  }
}

function addAntinode(first: Point, second: Point, limit?: number) {
  let count = 1;
  for (;;) {
    const antinode: Point = {
      x: 2 * first.x - second.x,
      y: 2 * first.y - second.y,
    };
    if (
      antinode.x >= 0 &&
      antinode.x < width &&
      antinode.y >= 0 &&
      antinode.y < height
    ) {
      antinodes.add(`${antinode.x}-${antinode.y}`);
      second = first;
      first = antinode;
    } else {
      break;
    }
    if (count++ === limit) {
      break;
    }
  }
}

for (const group of Object.values(antennas)) {
  for (let i = 0; i < group.length - 1; i++) {
    const first = group[i];
    for (let j = i + 1; j < group.length; j++) {
      const second = group[j];
      addAntinode(first, second, 1);
      addAntinode(second, first, 1);
    }
  }
}
console.log(antinodes.size);

antinodes = new Set();
for (const group of Object.values(antennas)) {
  for (let i = 0; i < group.length - 1; i++) {
    const first = group[i];
    for (let j = i + 1; j < group.length; j++) {
      const second = group[j];
      antinodes.add(`${first.x}-${first.y}`);
      antinodes.add(`${second.x}-${second.y}`);
      addAntinode(first, second);
      addAntinode(second, first);
    }
  }
}
console.log(antinodes.size);
