export const separateStories = (
  storyArray,
  storyDisplayedTime,
  filterName
) => {
  let formattedArray = [...storyArray];

  formattedArray.sort(
    (a, b) => new Date(b[storyDisplayedTime]) - new Date(a[storyDisplayedTime])
  );

  if (filterName) {
    if (filterName == "completionCount") {
      const filter = formattedArray.filter((task) => task.completionCount > 0);
      console.log('filter working',filter);
      return filter;
    }

    if (filterName === "deadline") {
      const today = new Date();
      const filter = formattedArray.filter((task) =>  today > new Date(task.deadline) );
      console.log('filter working', filter);
      return filter;
    }
  }
  return formattedArray;
};
