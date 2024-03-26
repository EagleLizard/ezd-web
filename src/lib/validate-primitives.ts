
export function isObject(val: unknown): val is Record<string, unknown> {
  return (
    ((typeof val) === 'object')
    && (val !== null)
    && !Array.isArray(val)
  );
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isString(val: unknown): val is string {
  return (typeof val) === 'string';
}

export function isNumber(val: unknown): val is number {
  return (typeof val) === 'number';
}

export function isPromise(val: unknown): boolean {
  if (!isObject(val)) {
    return false;
  }
  if (val instanceof Promise) {
    return true;
  }
  return typeof (val as any)?.then === 'function';
}

export function isBoolean(val: unknown): val is boolean {
  return (typeof val) === 'boolean';
}
