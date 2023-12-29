export const separateTasksByPriority = (tasksArray,filterType,filterParameters) => {
    let separatedTasks = []

    for (let param of filterParameters){
        const filterTasks =  tasksArray.filter(task => task[filterType] === param);
        separatedTasks.push(filterTasks)
    }
  return separatedTasks
      };