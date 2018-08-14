export const closest = (list, value) => {
  return list.reduce((closest, actual) => {
    const distance = Math.abs(actual - value);
    const distanceWithClosest = Math.abs(closest - value);

    return distance < distanceWithClosest ? actual : closest;
  }, list[0]);
};
