export const separateStoriesByFilterType = (storysArray,filterType,filterParameters,createdAtShown) => {
    let separatedstories = []

    for (let param of filterParameters){
        const filterstorys =  storysArray.filter(story => story[filterType] === param);

        if (createdAtShown) {
            filterstorys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            filterstorys.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }

        separatedstories.push(filterstorys)
    }
  return separatedstories
      };