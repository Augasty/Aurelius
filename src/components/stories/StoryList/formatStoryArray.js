export const separateStories = (storyArray, storyDisplayedTime, filterName) => {
  let formattedArray = [...storyArray];
  formattedArray = formattedArray.filter((story) => story?.dummy != true);

  if (storyDisplayedTime == 'deadline') {
    formattedArray.sort((a, b) => new Date(b[storyDisplayedTime]) - new Date(a[storyDisplayedTime]));
  } else {
    formattedArray.sort((a, b) => new Date(a[storyDisplayedTime]) - new Date(b[storyDisplayedTime]));
  }

  if (filterName) {
    if (filterName == 'completionCount') {
      const filteredStories = formattedArray.filter((story) => story.completionCount > 0);
      return filteredStories;
    }

    if (filterName === 'deadline') {
      const today = new Date();
      const filteredStories = formattedArray.filter(
        (story) => today > new Date(story.deadline) && story.completionCount > 0
      );
      return filteredStories;
    }
  }

  return formattedArray;
};
