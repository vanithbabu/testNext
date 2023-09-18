"use client";
import toast, { ToastBar, Toaster } from 'react-hot-toast';

const ToasterWrapper = () => {
  return (
    <Toaster
position="top-right"
gutter={8}
reverseOrder
containerClassName="custom-toast"
containerStyle={{ right: '40px', bottom: '50px' }}
>
{(t) => (
  <ToastBar toast={t} style={{ padding: 0, overflow: 'hidden' }}>
    {({ icon, message }) => {
      return (
        <div
          className={`custom-toast-${t.type} flex items-center custom-toast-item`}
        >
          <span className='cursor-pointer' onClick={() => toast.dismiss(t.id)}>{icon}</span>
          <span>{message}</span>
        </div>
      );
    }}
  </ToastBar>
)}
</Toaster>
  )
}

export default ToasterWrapper;
