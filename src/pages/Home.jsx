import React, { useState, useEffect } from 'react'
import { Login } from './Login'
import { Delete } from '../components/Delete';
import ViewExpenses from '../components/Viewexpenses';







export const Home = () => {




  // const [isModalOpen, setIsModalOpen] = useState(false);


  // const handleDelete = () => {
  //   // Implement your delete logic here
  //   console.log('Item deleted');
  //   setIsModalOpen(!isModalOpen); // Close the modal after deletion
  // };


  // const handleCancel = () => {
  //   setIsModalOpen(false); // Close the modal when cancel is clicked
  // };

  const handlelogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }



return (
  <div className='bg-white h-screen '>

    <div className='p-2 px-4 text-xl sm:text-2xl tracking-wide  font-bold text-[#0d034e] flex justify-between items-center'>
      Expensific
      <button className='text-xs bg-red-500 text-white font-semibold tracking-normal hover:bg-red-200 rounded-lg p-1 px-4 duration-700' onClick={handlelogout}>
        Logout
      </button>
    </div>

    <div className='bg-white rounded-t-3xl h-full px-2 md:px-4'>

      <ViewExpenses />

    </div>









    {/* <div>
        <Delete
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      </div> */}


  </div>
)
}
