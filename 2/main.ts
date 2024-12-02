const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n");

function isValidReport(levels: number[], tolerance = 0) {
  let prev = levels[0];
  let orderCoef = 0;
  for (let i = 1; i < levels.length; i++) {
    const curr = levels[i];
    const diff = curr - prev;

    //* Only the first time to check/ensure ASC/DESC continuity
    if (!orderCoef) {
      if (!diff) {
        //* levels are identical
        if (tolerance-- > 0) {
          continue;
        }
        return false;
      }
      orderCoef = diff / Math.abs(diff);
    }
    const absDiff = diff * orderCoef;
    if (absDiff < 1 || absDiff > 3) {
      if (tolerance-- > 0) {
        continue;
      }
      return false;
    }
    prev = curr;
  }
  return true;
}

let validReports = 0;
for (const line of lines) {
  const levels = line.split(" ").map(Number);
  if (isValidReport(levels)) {
    validReports++;
  }
}
console.log(validReports);

validReports = 0;
for (const line of lines) {
  const levels = line.split(" ").map(Number);
  if (isValidReport(levels, 1)) {
    validReports++;
  } else if (isValidReport(levels.reverse(), 1)) {
    //* reverse() allows a tolerance for the first 2 levels
    validReports++;
  }
}
console.log(validReports);
