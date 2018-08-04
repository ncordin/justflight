export const stringToBuffer = string => {
  const buffer = new ArrayBuffer(string.length);
  const array = new Uint8Array(buffer);

  for (let index = 0; index < string.length; index++) {
    array[index] = string.charCodeAt(index);
  }

  return buffer;
};

export const uInt8ArrayToString = array => {
  return array.reduce((accumulator, current) => {
    return accumulator + String.fromCharCode(current);
  }, '');
};

export default {
  uInt8ArrayToString,
  stringToBuffer,
};
