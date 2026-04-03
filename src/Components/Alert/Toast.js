import React from 'react'
import { ToastContainer, toast } from "react-toastify";



const Toast = ({times}) => {
  return (
    <div>
        <ToastContainer
        position="top-right"
        autoClose={times}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
    </div>
  )
}

export default Toast
