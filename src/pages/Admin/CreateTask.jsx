import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuTrash } from 'react-icons/lu'
import { PRIORITY_DATA } from '../../utils/data'
import SelectDropDown from '../../components/Inputs/SelectDropDown'
import SelectUsers from '../../components/Inputs/SelectUsers'
import TodoListInput from '../../components/Inputs/TodoListInput'
import { AddAttachmentsInput } from '../../components/layouts/AddAttachmentsInput'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import Model from '../../components/Model'
import DeleteAlert from '../../components/DeleteAlert'


const CreateTask = () => {

  const location = useLocation()
  const {taskId} = location.state || {}
  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: '',
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState(null)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(null)

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({...prevData, [key]:value}))
  }

  const clearData = () => {
    // Reset Form
    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: '',
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  // Create Task
  const createTask = async () => {
    setLoading(true)

    try {
      console.log(taskData.dueDate)
      const todolist = taskData.todoChecklist?.map((item) => (
        { text: item,
          completed: false,
        }
      ))

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })

      toast.success('Task Created Successfully')

      clearData()

    } catch (error) {
      console.log('Error creating task', error)
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }

  // Update Task
  const updateTask = async () => {
    setLoading(true)
    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || []
        const matchedTask = prevTodoChecklist.find((task) => task.text == item)

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        }
      })

      const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })

      toast.success("Task Updated Successfully")

    } catch (error) {
      console.log("Error Updating Task", error)
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  }

  // Handle Submit
  const handleSubmit = async () => {
    setError(null)

    // Input Validation
    if (!taskData.title.trim()) {
      setError('Title is required')
      return
    }
    if (!taskData.description.trim()) {
      setError('Description is required')
      return
    }
    if (!taskData.dueDate) {
      setError('Due date is required')
      return
    }
    if (taskData.assignedTo?.length === 0) {
      setError('Task not assigned to any member')
      return
    }
    if (taskData.todoChecklist?.length === 0) {
      setError('Add atleast on todo task')
      return
    }

    if (taskId) {
      updateTask()
      return
    }

    createTask()
  }

  // Get Task Info By Id
  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId))


      if (response.data) {
        const taskInfo = response.data
        setCurrentTask(taskInfo)

        setTaskData((prevState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate.split('T')[0], // 2025-08-01T00:00:00.000Z -> 2025-08-12
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoChecklist: taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }))
      }
    } catch (error) {
      console.error("Error fetching task by id", error)
    }
  }

  // Delete Task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId))

      setOpenDeleteAlert(false)
      toast.success("Task Deleted Successfully")
      navigate('/admin/tasks')
    } catch (error) {
      console.error("Error deleting task", error.response?.data?.message || error.message)
    }
  }

  useEffect(()=>{
    if (taskId) {
      getTaskDetailsById(taskId)

      return () => {}
    }
  }, [taskId])

  return (
    <DashboardLayout activeMenu="Create Task">

      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>
                  {taskId ? 'Update Task' : 'Create Task'}
              </h2>

              {taskId && (
                <button className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer' 
                onClick={()=> setOpenDeleteAlert(true)}>
                  <LuTrash className='text-base'/>
                </button>
              )}
            </div>

            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>
                Task Title
              </label>
              <input placeholder='Create App UI' className='form-input' value={taskData.title} onChange={({target}) => handleValueChange('title', target.value)} />
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                Task Description
              </label>
              <textarea placeholder='Describe Task' className='form-input' rows={4} value={taskData.description} onChange={({target}) => handleValueChange('description', target.value)} >
              </textarea>
            </div>

            <div className='grid grid-cols-12 gap-4 mt-2'>
              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600'>
                 Priority
              </label>

              <SelectDropDown options={PRIORITY_DATA} value={taskData.priority} placeholder="Select Priority" onChange={(value) => handleValueChange('priority', value)}/>

              </div>

              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600'>
                  Due Date
                </label>

                <input className='form-input' placeholder='Due Date' value={taskData.dueDate} onChange={({target})=> handleValueChange('dueDate', target.value)} type='date'/>
              </div>

              <div className='col-span-6 md:col-span-3'>
                <label className='text-xs font-medium text-slate-600'>
                  Assign To
                </label>
                <SelectUsers selectedUsers={taskData.assignedTo} setSelectedUsers={(value) => handleValueChange('assignedTo', value)} />
              </div>


            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                ToDo Checklist
              </label>
              <TodoListInput todoList={taskData?.todoChecklist} setTodoList={(value) => handleValueChange('todoChecklist', value)} />
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600 '>
                Add Attachments
              </label>

              <AddAttachmentsInput attachments={taskData?.attachments} setAttachments={(value) => handleValueChange('attachments', value)} />
            </div>

              {error && (
                <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
              )}

              <div className='flec justify-end mt-7'>
                <button className='add-btn' onClick={handleSubmit}>
                  {taskId ? 'Update Task' : 'Create Task'}
                </button>
              </div>
          </div>
        </div>
      </div>

      <Model 
      isOpen={openDeleteAlert}
      onClose={()=> setOpenDeleteAlert(false)}
      title={"Delete Task"}
      >
        <DeleteAlert content="Are you sure you want to delete this task?" onDelete={() => deleteTask()} />
      </Model>

    </DashboardLayout>
  )
}

export default CreateTask