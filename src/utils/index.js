export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.activeCases > b.activeCases ? -1 : 1));
};

export const nFormat = (num) => {
  return Math.abs(num) > 999999999
    ? Math.sign(num) * (Math.abs(num) / 1000000000).toFixed(1) + "B"
    : Math.abs(num) > 999999
    ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M"
    : Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};
