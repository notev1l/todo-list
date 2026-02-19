console.log('factorial')

function zeros(n) {
  const kMax = Math.log(n) / Math.log(5);
  let result = 0n;
  for (let k = 1n; k <= kMax; k++) {
    result += (BigInt(n) / 5n ** k)
    console.log(result);
  }
  console.log(parseInt(result));
}
zeros(0)
// 5 * 4 * 3 * 2 * 1
// n * (n-1) * (n-1)