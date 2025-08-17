import UI_IMG from '../../assets/images/auth-image.jpg'

const AuthLayout = ({children, mode}) => {
  return (
    
    <div className='flex'>
      
        <div className={`w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 ${mode=='signup' ? 'absolute right-0' : 'relative'} `}>
            <h2 className='text-lg font-medium text-black'>Task Manager</h2>
            {children}
        </div>

        <div className={`hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-500 overflow-hidden p-8 ${mode=='signup' ? 'absolute left-0' : 'relative'} `}>
            <img src={UI_IMG} alt="auth-image" className='w-64 lg:w-[90%]' />
        </div>
    </div>
  )
}

export default AuthLayout