

const Model = ({children, isOpen, onClose, title}) => {
    if (!isOpen) return

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full overflow-x-hidden overflow-y-auto bg-black/20 bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Model Content */}
        
            <div className="relative bg-white rounded-lg shadow-sm">
                {/* Model Header */}
            
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center cursor-pointer">
                        <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1l12 12M13 1L1 13"
                        />
                        </svg>

                        
                    </button>
                </div>


                {/* Model Body */}
                <div className="p-4 md:p-5 space-y-4">
                    {children}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Model