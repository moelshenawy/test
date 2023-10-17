import React, { useContext, useEffect, useState } from 'react'
import Pagination from '../Pagination';
import { ContextStore } from '../../Context/StoreContext';

const Tasks = () => {
  // tasks variables
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskIdCounter, setTaskIdCounter] = useState(0);

  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [editTaskInput, setEditTaskInput] = useState('');

  const { activePage, setCurrentTasks } = useContext(ContextStore);

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilterSection, setActiveFilterSection] = useState(false)

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = (e) => {
    setActiveFilterSection(false)
    e.preventDefault();
    if (taskInput.trim() !== '') {
      const newTask = {
        id: taskIdCounter,
        name: taskInput.trim(),
        status: 'not-started',
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setTaskIdCounter(taskIdCounter + 1);


      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  const handleEditTask = (index) => {
    setEditTaskIndex(index);
    setEditTaskInput(tasks[index].name);
  };

  const handleSaveTask = () => {
    if (editTaskInput.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editTaskIndex].name = editTaskInput.trim();
      setTasks(updatedTasks);
      setEditTaskIndex(-1);
      setEditTaskInput('');

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };
  const handleCancelEdit = () => {
    setEditTaskIndex(-1);
    setEditTaskInput('');
  };

  const handleFinishTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          status: 'finished'
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleInProgressTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          status: 'in-progress'
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleGetTasks = () => {
    // Filter tasks based on the task name
    setActiveFilterSection(true)
    const filtered = tasks.filter(task => task.name.includes(taskInput.trim()));
    setFilteredTasks(filtered);
  };


  // Retrieve tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);



  useEffect(() => {
    setCurrentTasks(tasksPerPageResult)
  }, [])


  const tasksPerPage = 4;
  // Logic for displaying tasks
  const indexOfLastTask = activePage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const tasksPerPageResult = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const pageNumbers = Math.ceil(tasks.length / tasksPerPage);



  return (
    <div className='container'>
      <div className="tasks_container">
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-lg-9 col-xl-7">
                <div className="card rounded-3">
                  <div className="card-body p-4">
                    <h4 className="text-center my-3 pb-3">Tasks List</h4>

                    <form
                      className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                      onSubmit={handleAddTask}
                    >
                      <div className="col-12">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form1"
                            className="form-control"
                            value={taskInput}
                            onChange={handleTaskInputChange}
                          />
                          <label className="form-label" htmlFor="form1">
                            Enter a task here
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Save task
                        </button>
                      </div>

                      <div className="col-12">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={handleGetTasks}
                        >
                          Search task
                        </button>
                      </div>
                    </form>

                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Todo item</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          !activeFilterSection &&
                          tasksPerPageResult.map((task, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>

                              {editTaskIndex === index ?
                                <>
                                  <input
                                    type="text"
                                    id="form1"
                                    className="form-control"
                                    value={editTaskInput}
                                    onChange={(e) => setEditTaskInput(e.target.value)}
                                  /></>
                                :
                                <td>{task.name}</td>
                              }

                              {task.status === 'not-started' && <td className='text-danger'> Not Started   </td>}
                              {task.status === 'in-progress' && <td className='text-warning'> In Progresss   </td>}
                              {task.status === 'finished' && <td className='text-success'> Finished  </td>}
                              <td>
                                {task.status === 'in-progress' && (
                                  <button
                                    type="button"
                                    className="btn btn-success ms-1 m-2"
                                    onClick={() => handleFinishTask(index)}
                                  >
                                    Finished
                                  </button>
                                )}
                                {task.status === 'not-started' && (
                                  <button
                                    type="button"
                                    className="btn btn-warning ms-1 m-2"
                                    onClick={() => handleInProgressTask(index)}
                                  >
                                    In Progress
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteTask(index)}
                                >
                                  Delete
                                </button>

                                {editTaskIndex === index ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-primary ms-1 m-2"
                                      onClick={handleSaveTask}
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={handleCancelEdit}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-warning ms-1 m-2"
                                      onClick={() => handleEditTask(index)}
                                    >
                                      Edit
                                    </button>

                                  </>
                                )}

                              </td>
                            </tr>
                          ))}
                        {
                          activeFilterSection &&
                          filteredTasks.map((task, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>

                              <td>{task.name}</td>


                              {task.status === 'not-started' && <td className='text-danger'> Not Started   </td>}
                              {task.status === 'in-progress' && <td className='text-warning'> In Progresss   </td>}
                              {task.status === 'finished' && <td className='text-success'> Finished  </td>}
                              <td>
                                {task.status === 'in-progress' && (
                                  <button
                                    type="button"
                                    className="btn btn-success ms-1 m-2"
                                    onClick={() => handleFinishTask(index)}
                                  >
                                    Finished
                                  </button>
                                )}
                                {task.status === 'not-started' && (
                                  <button
                                    type="button"
                                    className="btn btn-warning ms-1 m-2"
                                    onClick={() => handleInProgressTask(index)}
                                  >
                                    In Progress
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteTask(index)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}

                        {
                          activeFilterSection &&

                          filteredTasks.length === 0 &&
                          <>
                            <h1 className='text-danger'>{taskInput} Not Found</h1>
                          </>
                        }

                      </tbody>
                    </table>

                    <Pagination pageNumbers={pageNumbers} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Tasks