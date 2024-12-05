const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n");

const previousValidNumbersByNumber: Record<number, Record<number, true>> = {};

let i = 0;
while (lines[i].length > 0) {
  const [prev, num] = lines[i].split("|").map(Number);
  if (!previousValidNumbersByNumber[num]) {
    previousValidNumbersByNumber[num] = {};
  }
  previousValidNumbersByNumber[num][prev] = true;
  i++;
}

function isUpdateOrdered(updateToTest: number[]) {
  //* copy because we mutate
  const update = [...updateToTest];
  while (update.length > 0) {
    const num = update.pop();
    if (!num) {
      return false;
    }
    const previousValidNumbers = previousValidNumbersByNumber[num];
    if (update.some((num) => !previousValidNumbers[num])) {
      return false;
    }
  }
  return true;
}
const firstLineToCheck = i;

let result = 0;
while (i < lines.length) {
  const update = lines[i].split(",").map(Number);
  if (isUpdateOrdered(update)) {
    result += update[Math.floor(update.length / 2)];
  }
  i++;
}
console.log(result);

result = 0;
i = firstLineToCheck;
while (i < lines.length) {
  const update = lines[i].split(",").map(Number);
  if (!isUpdateOrdered(update)) {
    update.sort((a, b) => {
      if (previousValidNumbersByNumber[a][b]) {
        return 1;
      }
      if (previousValidNumbersByNumber[b][a]) {
        return -1;
      }
      return 0;
    });
    result += update[Math.floor(update.length / 2)];
  }
  i++;
}
console.log(result);
