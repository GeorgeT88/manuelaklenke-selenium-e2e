// allure-js-commons@2.x has no standalone step() export; this shim preserves
// the call pattern so it can be swapped for a real implementation later.
export async function step<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
  return fn();
}
