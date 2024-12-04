const input = await Deno.readTextFile("input.txt");

const rows = input.split("\n");

function getCharAt(x: number, y: number) {
  if (y < 0 || x < 0) {
    return "";
  }
  if (y >= rows.length) {
    return "";
  }
  const row = rows[y];
  if (x >= row.length) {
    return "";
  }
  return row[x];
}

function getWords(x: number, y: number) {
  const words: string[] = [];
  //* left to right
  words.push(
    getCharAt(x, y) +
      getCharAt(x + 1, y) +
      getCharAt(x + 2, y) +
      getCharAt(x + 3, y)
  );
  //* right to left
  words.push(
    getCharAt(x, y) +
      getCharAt(x - 1, y) +
      getCharAt(x - 2, y) +
      getCharAt(x - 3, y)
  );
  //* top to bottom
  words.push(
    getCharAt(x, y) +
      getCharAt(x, y + 1) +
      getCharAt(x, y + 2) +
      getCharAt(x, y + 3)
  );
  //* bottom to top
  words.push(
    getCharAt(x, y) +
      getCharAt(x, y - 1) +
      getCharAt(x, y - 2) +
      getCharAt(x, y - 3)
  );
  //* tl to br
  words.push(
    getCharAt(x, y) +
      getCharAt(x + 1, y + 1) +
      getCharAt(x + 2, y + 2) +
      getCharAt(x + 3, y + 3)
  );
  //* tr to bl
  words.push(
    getCharAt(x, y) +
      getCharAt(x - 1, y + 1) +
      getCharAt(x - 2, y + 2) +
      getCharAt(x - 3, y + 3)
  );
  //* bl to tr
  words.push(
    getCharAt(x, y) +
      getCharAt(x + 1, y - 1) +
      getCharAt(x + 2, y - 2) +
      getCharAt(x + 3, y - 3)
  );
  //* br to tl
  words.push(
    getCharAt(x, y) +
      getCharAt(x - 1, y - 1) +
      getCharAt(x - 2, y - 2) +
      getCharAt(x - 3, y - 3)
  );

  return words;
}

let result = 0;
for (let y = 0; y < rows.length; y++) {
  const row = rows[y];

  for (let x = 0; x < row.length; x++) {
    if (row[x] !== "X") {
      continue;
    }
    result += getWords(x, y).filter((word) => word === "XMAS").length;
  }
}
console.log(result);

function getXWords(x: number, y: number) {
  const words: string[] = [];
  //* tl - br
  words.push(
    getCharAt(x - 1, y - 1) + getCharAt(x, y) + getCharAt(x + 1, y + 1)
  );
  //* tr - bl
  words.push(
    getCharAt(x + 1, y - 1) + getCharAt(x, y) + getCharAt(x - 1, y + 1)
  );
  //* bl - tr
  words.push(
    getCharAt(x - 1, y + 1) + getCharAt(x, y) + getCharAt(x + 1, y - 1)
  );
  //* br - tl
  words.push(
    getCharAt(x + 1, y + 1) + getCharAt(x, y) + getCharAt(x - 1, y - 1)
  );

  return words;
}

result = 0;
for (let y = 0; y < rows.length; y++) {
  const row = rows[y];

  for (let x = 0; x < row.length; x++) {
    if (row[x] !== "A") {
      continue;
    }
    result +=
      getXWords(x, y).filter((word) => word === "MAS").length === 2 ? 1 : 0;
  }
}
console.log(result);
