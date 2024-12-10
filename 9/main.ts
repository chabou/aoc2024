const input = await Deno.readTextFile("input.txt");

const nums = input.split("").map(Number);

let spaced: number[] = [];
for (let i = 0; i < nums.length; i++) {
  const content = i % 2 === 0 ? i / 2 : -1;
  for (let j = nums[i]; j > 0; j--) {
    spaced.push(content);
  }
}

let lastValidContent = spaced.length - 1;
const length = spaced.filter((num) => num !== -1).length;
for (let i = 0; i < lastValidContent; i++) {
  if (spaced[i] !== -1) {
    continue;
  }
  while (spaced[lastValidContent] === -1 && lastValidContent > i + 2) {
    lastValidContent--;
  }
  if (spaced[lastValidContent] === -1) {
    break;
  }
  spaced[i] = spaced[lastValidContent--];
}
let checksum = 0;
for (let i = 0; i < length; i++) {
  checksum += i * spaced[i];
}
console.log(checksum);

spaced = [];
for (let i = 0; i < nums.length; i++) {
  const content = i % 2 === 0 ? i / 2 : -1;
  for (let j = nums[i]; j > 0; j--) {
    spaced.push(content);
  }
}

let retroCursor = spaced.length - 1;
while (retroCursor > 0) {
  const content = spaced[retroCursor];
  if (content === -1) {
    retroCursor--;
    continue;
  }
  let length = 1;

  while (retroCursor > 0 && spaced[retroCursor - 1] === content) {
    length++;
    retroCursor--;
  }
  let cursor = 0;
  let spaceLength = 0;
  while (cursor < retroCursor) {
    if (spaced[cursor] !== -1) {
      spaceLength = 0;
      cursor++;
    } else {
      spaceLength++;
      cursor++;
      if (spaceLength === length) {
        while (spaceLength > 0) {
          spaced[cursor - spaceLength--] = content;
        }
        while (length > 0) {
          spaced[retroCursor - 1 + length--] = -1;
        }
        break;
      }
    }
  }
  retroCursor--;
}
checksum = 0;
for (let i = 0; i < spaced.length; i++) {
  if (spaced[i] === -1) {
    continue;
  }
  checksum += i * spaced[i];
}
console.log(checksum);
