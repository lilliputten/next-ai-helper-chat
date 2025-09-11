/** Remove all falsy values from the object */
export function removeFalsyValues(obj: Record<string, unknown>) {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
}

/** Remove null or undefined values from the object */
export function removeNullUndefinedValues(obj: Record<string, unknown>) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

/** Only for debugging purposes */
export function getObjectDiff<T extends object>(obj1?: T, obj2?: T): Partial<T> {
  const diff: Partial<T> = {};

  if (!obj1 || !obj2) {
    return obj1 || obj2 || {};
  }

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (diff as any)[key] = undefined; // Key deleted
      } else if (
        typeof obj1[key] === 'object' &&
        obj1[key] !== null &&
        typeof obj2[key] === 'object' &&
        obj2[key] !== null
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nestedDiff = getObjectDiff(obj1[key] as any, obj2[key] as any);
        if (Object.keys(nestedDiff).length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (diff as any)[key] = nestedDiff;
        }
      } else if (obj1[key] !== obj2[key]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (diff as any)[key] = obj2[key]; // Value changed
      }
    }
  }

  for (const key in obj2) {
    if (
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      !Object.prototype.hasOwnProperty.call(obj1, key)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (diff as any)[key] = obj2[key]; // Key added
    }
  }

  return diff;
}
