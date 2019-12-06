const integersToBuffer = integers => {
  const buffer = new ArrayBuffer(integers.length);
  const bufferInt8 = new Uint8Array(buffer);

  integers.forEach((integer, index) => {
    bufferInt8[index] = integer;
  });

  return buffer;
};

export const stringToIntegers = string => {
  const integers = [];

  for (let index = 0; index < string.length; index++) {
    integers[index] = string.charCodeAt(index);
  }

  return integers;
};

export const integersToString = integers => {
  return integers.reduce((accumulator, integer) => {
    return accumulator + String.fromCharCode(integer);
  }, '');
};

export default {
  integersToBuffer,
  stringToIntegers,
  integersToString,
};
