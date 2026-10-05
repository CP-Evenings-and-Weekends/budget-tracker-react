export function monthsToPayoff(balance, apr, payment) {
  if (balance <= 0) return 0;
  const r = apr / 100 / 12;
  if (r === 0) return Math.ceil(balance / payment);
  if (payment <= balance * r) return Infinity; // payment doesn't cover interest
  return Math.ceil(-Math.log(1 - (balance * r) / payment) / Math.log(1 + r));
}