const stringToBuffer = string => {
  const buffer = new ArrayBuffer(string.length);
  const array = new Uint8Array(buffer);

  for (let index = 0; index < string.length; index++) {
    array[index] = string.charCodeAt(index);
  }

  return buffer;
};

const uInt8ArrayToString = array => {
  return array.reduce((accumulator, current) => {
    return accumulator + String.fromCharCode(current);
  }, '');
};

module.exports = {
  uInt8ArrayToString,
  stringToBuffer,
};
