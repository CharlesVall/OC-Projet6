function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

module.exports = calculateAverage