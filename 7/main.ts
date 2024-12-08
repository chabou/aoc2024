const input = await Deno.readTextFile("input.txt");

const rows = input.split("\n");

for (const ops of [
  ["+", "*"],
  ["+", "*", "||"],
]) {
  let calibration = 0;
  for (const row of rows) {
    const total = Number(row.split(": ")[0]);
    const numbers = row.split(": ")[1]?.split(" ");
    calibration += (() => {
      for (let i = 0; i < Math.pow(ops.length, numbers.length - 1); i++) {
        let mask = i;
        let computedTotal = Number(numbers[0]);
        let opLog = `${computedTotal}`;
        for (let j = 1; j < numbers.length; j++) {
          opLog += ` ${ops[mask % ops.length]} ${numbers[j]}`;
          if (ops[mask % ops.length] === "||") {
            computedTotal = Number(`${computedTotal}${numbers[j]}`);
          } else {
            computedTotal = Number(
              eval(`${computedTotal} ${ops[mask % ops.length]} ${numbers[j]}`)
            );
          }
          if (computedTotal === total) {
            return computedTotal;
          } else if (computedTotal > total) {
            break;
          }
          mask = Math.floor(mask / ops.length);
        }
      }
      return 0;
    })();
  }
  console.log(calibration);
}
