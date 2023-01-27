const sliceString = (string, times = 3) => {
  const sliceIndex = Math.round(string.length / times);
  return new Array(sliceIndex + (string.length % times == 0 ? 0 : 1))
    .fill(null)
    .map((_, index) => string.slice(index * 3, (index + 1) * 3));
};

const mashStrings = (strings, times = 3) => {
  const slicedStrings = [
    ...strings.map((string) => sliceString(string, times)),
  ].sort((a, b) => b.length - a.length);
  const meshStrings = [];
  for (let i = 0; i < slicedStrings[0].length; i++) {
    for (let u = 0; u < slicedStrings.length; u++) {
      meshStrings.push(slicedStrings[u][i]);
    }
  }

  return meshStrings.filter((exists) => !!exists).join("");
};

const CHARSET = "qwertuioplkjhgdsazxcvbnm1257890QWETUOPASGJKLZXCBNM";
const generateRandomString = (length) =>
  new Array(length)
    .fill(null)
    .map(
      () => CHARSET[Math.round(Math.random() * (CHARSET.length - 1))]
    )
    .join("");

module.exports = {
  mashStrings,
  generateRandomString
};
