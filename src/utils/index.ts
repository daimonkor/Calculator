export * from './pSBC';
export * from './shadowUtils.ts';
export * from './windowSize.tsx';
export * from './wrapCustomFont.ts';

export function cheapHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

export function deepEquals(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;

    return obj1.every((elem, index) => {
      return deepEquals(elem, obj2[index]);
    });
  }

  if (
    typeof obj1 === 'object' &&
    typeof obj2 === 'object' &&
    obj1 !== null &&
    obj2 !== null
  ) {
    if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (
      keys1.length !== keys2.length ||
      !keys1.every(key => keys2.includes(key))
    )
      return false;

    for (let key in obj1) {
      console.log(obj1[key], obj2[key]);
      let isEqual = deepEquals(obj1[key], obj2[key]);
      if (!isEqual) {
        return false;
      }
    }

    return true;
  }

  return false;
}
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const multiSignal = (
  ...inputSignals: AbortSignal[] | [AbortSignal[]]
) => {
  const signals = Array.isArray(inputSignals[0])
    ? inputSignals[0]
    : (inputSignals as AbortSignal[]);
  // if only one signal is provided, return it
  const len = signals.length;
  if (len === 1) return signals[0];
  // new signal setup
  const controller = new AbortController();
  const signal = controller.signal;
  // add event listener
  for (let i = 0; i < len; i++) {
    // if signal is already aborted, abort new signal
    if (signals[i].aborted) {
      controller.abort(signals[i]?.reason);
      break;
    }
    // else add on signal abort: abort new signal
    signals[i].addEventListener(
      'abort',
      () => {
        controller.abort(signals[i]?.reason);
      },
      { signal },
    );
  }
  return signal;
};

export function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 0) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      console.log('TIMEOUT VALUE', timeoutMs);
      setTimeout(
        () => reject(new Error('Timeout: ' + timeoutMs?.toString())),
        timeoutMs,
      );
    }),
  ]);
}

export const chunkArray: any = (arr: any, size: number) => {
  return arr?.length > size
    ? [arr?.slice(0, size), ...chunkArray(arr?.slice(size), size)]
    : [arr];
};

export function padArrayToDivideBy<T>(
  arr: T[],
  divide: number,
  fillValue: T | null = null,
): T[] {
  if (divide <= 0) {
    throw new Error('Divide value must be greater than 0');
  }

  const remainder = arr.length % divide;
  if (remainder === 0) {
    return arr; // Already divisible
  }

  const paddingNeeded = divide - remainder;
  return [...arr, ...Array(paddingNeeded).fill(fillValue)];
}

export function getRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error('The min value cannot be greater than the max value.');
  }
  return Math.floor(Math.random() * (max - min) + min);
}

type MatchMode = 'partial' | 'full';

export const arrayIncludes = (
  source?: string[],
  target?: string[],
  mode: MatchMode = 'partial',
): boolean =>
  source?.some(s =>
    target?.some(t => (mode === 'partial' ? t?.includes(s) : t === s)),
  ) ?? false;
