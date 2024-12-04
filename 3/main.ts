const input = await Deno.readTextFile("input.txt");

let result = 0;
const matches = input.matchAll(/mul\((\d\d?\d?),(\d\d?\d?)\)/g);
for (const match of matches) {
  result += Number(match[1]) * Number(match[2]);
}
console.log(result);

result = 0;
//* We inject a "do()"" to represent the first implicit one, making further matchings easier
const parts = `do()${input}`.split("don't()");
for (const part of parts) {
  //* disabledPart are parts between a don't() and a do()
  const [_disabledPart, ...validPart] = part.split("do()");
  const matches =
    validPart?.join().matchAll(/mul\((\d\d?\d?),(\d\d?\d?)\)/g) || [];
  for (const match of matches) {
    result += Number(match[1]) * Number(match[2]);
  }
}
console.log(result);
