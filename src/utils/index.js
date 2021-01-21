export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.activeCases > b.activeCases ? -1 : 1));
};
