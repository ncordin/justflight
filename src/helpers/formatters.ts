export const integersToBuffer = (integers: number[]) => {
  const buffer = new ArrayBuffer(integers.length);
  const bufferInt8 = new Uint8Array(buffer);

  integers.forEach((integer, index) => {
    bufferInt8[index] = integer;
  });

  return buffer;
};

export const stringToIntegers = (string: string) => {
  const integers: number[] = [];

  for (let index = 0; index < string.length; index++) {
    integers[index] = string.charCodeAt(index);
  }

  return integers;
};

export const integersToString = (integers: number[]) => {
  return integers.reduce<string>((accumulator, integer) => {
    return accumulator + String.fromCharCode(integer);
  }, '');
};
