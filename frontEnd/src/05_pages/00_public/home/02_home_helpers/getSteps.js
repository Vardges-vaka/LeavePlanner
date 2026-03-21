export const getSteps = (t) =>
  Array.from({ length: 3 }, (_, i) => ({
    title: t(`how${i + 1}Title`),
    desc: t(`how${i + 1}Desc`),
  }));
