const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n");
const firstList: number[] = [];
const secondList: number[] = [];
for (const line of lines) {
  const [first, second] = line.split("   ");
  firstList.push(parseInt(first));
  secondList.push(parseInt(second));
}
const sortedFirstList = firstList.sort((a: number, b: number) => a - b);
const sortedSecondList = secondList.sort((a: number, b: number) => a - b);

let result = 0;
for (let i = 0; i < sortedFirstList.length; i++) {
  result += Math.abs(sortedFirstList[i] - sortedSecondList[i]);
}
console.log(result);

result = 0;
let i = 0;
let j = 0;
while (i < sortedFirstList.length && j < sortedSecondList.length) {
  while (
    sortedSecondList[j] < sortedFirstList[i] &&
    j < sortedSecondList.length
  ) {
    j++;
  }
  for (
    let k = 0;
    j + k < sortedSecondList.length &&
    sortedFirstList[i] === sortedSecondList[j + k];
    k++
  ) {
    result += sortedFirstList[i];
  }
  i++;
}
console.log(result);
