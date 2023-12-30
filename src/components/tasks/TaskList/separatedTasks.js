export const separateTasksByPriority = (tasksArray,filterType,filterParameters,createdAtShown) => {
    let separatedTasks = []

    for (let param of filterParameters){
        const filterTasks =  tasksArray.filter(task => task[filterType] === param);

        if (createdAtShown) {
            filterTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            console.log('sort')
        } else {
            filterTasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
        if (filterType == 'priority' && param == 'Medium Priority'){

            console.log(filterTasks)
        }

        separatedTasks.push(filterTasks)
    }
  return separatedTasks
      };