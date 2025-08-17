import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'

import PrivateRoute from './Routes/PrivateRoute'

import DashBoard from './pages/Admin/Dashboard'
import CreateTask from './pages/Admin/CreateTask'
import ManageTasks from './pages/Admin/ManageTasks'
import ManageUsers from './pages/Admin/ManageUsers'

import UserDashboard from './pages/User/UserDashboard'
import MyTasks from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import UserProvider, { UserContext } from './context/userContext'
import { Toaster } from 'react-hot-toast'
import PublicRoute from './Routes/PublicRoute'

const App = () => {
  return (
    <UserProvider>
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path='/login' element = {<Login />}/>
            <Route path='/signup' element = {<SignUp />}/>
          </Route>

          {/* AdminRoutes */}
          <Route element = {<PrivateRoute allowedRoles = {'admin'} />}>
            <Route path='/admin/dashboard' element = {<DashBoard />} />
            <Route path='/admin/create-task' element = {<CreateTask />} />
            <Route path='/admin/tasks' element = {<ManageTasks />} />
            <Route path='/admin/users' element = {<ManageUsers />} />
          </Route>

          {/* UserRoutes */}
          <Route element = {<PrivateRoute allowedRoles = {'member'} />}>
            <Route path='/user/dashboard' element = {<UserDashboard />} />
            <Route path='/user/tasks' element = {<MyTasks />} />
            <Route path='/user/task-details/:id' element = {<ViewTaskDetails />} />
          </Route>

          {/* Default Route */}
          <Route path='/' element={<Root />}/>

          {/* Page Not Found */}
          <Route path='*' element={<PageNotFound />} />


        </Routes>
      </BrowserRouter>

    </div>

    <Toaster 
      toastOptions={{
        className: '',
        style: {
          fontSize: '13px',
        },
      }}
    />

    </UserProvider>
  )
}

export default App


const Root = () => {
  const {user, loading} = useContext(UserContext)

  if (loading) {
    return <Outlet />
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  return user.role === 'admin' ? <Navigate to='/admin/dashboard'/> : <Navigate to='/user/dashboard'/>
}


const PageNotFound = () => {
  return(
    <div className='flex items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
    </div>
  )
}