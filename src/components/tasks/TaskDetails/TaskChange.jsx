/* eslint-disable react/prop-types */
import { useState } from 'react'

const TaskChange = ({currentTask}) => {

    // lock the task

    // make changes

    // updatedoc to firestore [which will create a cloud function trigger]

    // add to local redux

    // unlock the task

      // State to manage form values
      const [formData, setFormData] = useState({
        title: currentTask.title,
        content: currentTask.content,
        createdAt: currentTask.createdAt,
        assignedTo: currentTask.assignedTo,
        priority: currentTask.priority,
        taskStatus: currentTask.taskStatus
      });
    
      // Function to handle form changes
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
    
      // Function to handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onSubmit prop with the updated formData
        
      };
    
      return (
        <form onSubmit={handleSubmit}>
        <h2>{currentTask.title}</h2>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required />
    
          <label htmlFor="content">Task Content</label>
          <textarea id="content" value={formData.content} onChange={handleChange} required />
    
          <label htmlFor="createdAt">Created At</label>
          <input type="text" id="createdAt" value={formData.createdAt} onChange={handleChange} readOnly />
    
          <label htmlFor="assignedTo">Assigned To</label>
          <input type="text" id="assignedTo" value={formData.assignedTo} onChange={handleChange} />
    
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
    
          <label htmlFor="taskStatus">Task Status</label>
          <select id="taskStatus" value={formData.taskStatus} onChange={handleChange}>
            <option value="new">New</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
    
          <button type="submit">Submit</button>
        </form>
      );
    };
    

    


export default TaskChange