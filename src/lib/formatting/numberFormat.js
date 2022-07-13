const zero = 0;

const returnDefault = (decimalPlaces, defaultIsZero = true) => {
  if (defaultIsZero) return zero.toFixed(decimalPlaces);
  return null;
};

export const toFixed = (
  candidateNumber,
  decimalPlaces,
  defaultIsZero = true
) => {
  if (!candidateNumber) {
    return returnDefault(decimalPlaces, defaultIsZero);
  }

  try {
    const convertedNumber = parseInt(candidateNumber);
    const output = convertedNumber.toFixed(decimalPlaces);

    console.log({ candidateNumber, convertedNumber, output });
    return output;
  } catch {
    return returnDefault(decimalPlaces, defaultIsZero);
  }
};

export const formatRoyalties = (royalties) => {
    if (!royalties) return returnDefault(2);
    if (!royalties.slice) return returnDefault(2);

    const integerPart = royalties.slice(0, royalties.length - 2);
    const decimalPart = royalties.slice(royalties.length - 2, royalties.length);
    const output = [integerPart.toString(), ".", decimalPart.toString()].join("");

    return output;
}