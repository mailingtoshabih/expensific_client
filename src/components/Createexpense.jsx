import React, { useState } from 'react';
import axios from 'axios'







export const Createexpense = ({ setCreateModal, expenseUpdated, setExpenseUpdated, setToast }) => {

  const backend = import.meta.env.VITE_BACKEND;
  const [error, setError] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user')).email;
  
    
 
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    category: '',
    description: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount' && parseFloat(value) < 0) {
      setError("Onlypositive")
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;

    console.log(formData);

    const res = await axios.post(`${backend}/expenses/create/${userId}`, formData);
    res && console.log(res?.data);
    setExpenseUpdated(!expenseUpdated);
    setCreateModal(false);
    res && setToast("Expense Added Succesfully");
  };










  return (
    <div className="min-w-screen w-screen md:w-[600px] min-h-fit bg-white shadow-sm sm:rounded-3xl p-6 border border-blue-100" onClick={(e) => e.stopPropagation()}>

      <div className="text-2xl font-bold mb-4 flex items-center justify-between">Create Expense
        <svg onClick={() => setCreateModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500 bg-red-100 rounded-full p-1 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>


      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={140}
            required
            className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full"
            required
          />
        </div>



        <div className='flex items-center justify-between gap-2'>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Expense</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border border-white px-3 py-2 mt-1 rounded-md w-full"
            >
              <option value="">Select Category</option>
              <option value="Health">Health</option>
              <option value="Electronics">Electronics</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Books">Books</option>
              <option value="Others">Others</option>
            </select>
          </div>

        </div>


        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full"
            required
            min="0"
          />
        </div>




        <button type="submit" className="flex justify-center items-center bg-[#0d034e] text-white px-4 py-2 rounded-full hover:font-semibold duration-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Create Expense
        </button>

      </form>
    </div>
  );
};

