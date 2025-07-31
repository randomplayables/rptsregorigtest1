export function isPrime(num: number): boolean {
  if (num < 2) return false;
  const limit = Math.sqrt(num);
  for (let i = 2; i <= limit; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

export function getPrimesInRange(min: number, max: number): number[] {
  const primes: number[] = [];
  const start = Math.max(2, min);
  for (let i = start; i <= max; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

export function generateRandomPrime(min: number, max: number): number {
  const primes = getPrimesInRange(min, max);
  if (primes.length === 0) {
    throw new Error(`No prime numbers found in range ${min} to ${max}.`);
  }
  const index = Math.floor(Math.random() * primes.length);
  return primes[index];
}