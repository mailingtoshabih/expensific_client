import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons for Edit and Delete buttons
import { Createexpense } from './Createexpense';
import { Editexpense } from './Editexpense';
import axios from 'axios';
import { Delete } from './Delete';
import { Preview } from './Preview';





const ViewExpenses = () => {

    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const [expenseUpdated, setExpenseUpdated] = useState(false);
    const [deleteId, setDeleteId] = useState(false);
    const [editExpense, setEditExpense] = useState(false);
    const [preview, setPreview] = useState(false);
    const [toast, setToast] = useState("");

    const userId = JSON.parse(localStorage.getItem('user')).email;
    console.log(userId)

    const backend = import.meta.env.VITE_BACKEND;
    console.log(expenses)

    useEffect(() => {
        let timeoutId;
        if (toast) {
            timeoutId = setTimeout(() => setToast(""), 3000)
        }
        return () => clearTimeout(timeoutId);
    }, [toast]);

    // Filter expenses as the user types
    const handleSearchChange = (e) => {
        if (!searchQuery) setFilteredExpenses(expenses);

        const { value } = e.target;
        setSearchQuery(value);

        const filtered = expenses.filter(expense =>
            expense.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredExpenses(filtered);
    };

    // Filter expenses by date
    const handleDateChange = (e) => {
        const { value } = e.target;
        setSelectedDate(value);

        if (value === '') {
            setFilteredExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.date === value);
            setFilteredExpenses(filtered);
        }
    };


    const handleCloseCreateModal = (e) => {
        setCreateModal(false);
        e.stopPropagation();
    }



    const handleDelete = () => {
        // Implement your delete logic here
        console.log('Item deleted');
        console.log(deleteId)
        setDeleteId(false); // Close the modal after deletion
    };


    const handleCancel = () => {
        setDeleteId(false); // Close the modal when cancel is clicked
        // e.stopPropagation();
    };




    useEffect(() => {
        const getExpenses = async () => {
            const res = await axios.get(`${backend}/expenses/getall/${userId}`);
            setExpenses(res.data);
        }
        getExpenses();
    }, [expenseUpdated]);


    const filteredExpense = expenses.filter((expense) => {
        const searchTrimmed = searchQuery.trim().toLowerCase();
        const nameTrimmed = expense.name.trim().toLowerCase();
        const dateMatch = selectedDate ? expense.date.substring(0, 10) === selectedDate : true;

        return nameTrimmed.includes(searchTrimmed) && dateMatch;
    });


    const handleExpenseClick = (e, expense) => {
        setPreview(expense);
        e.stopPropagation();
    }

    const handleExpenseEdit = (e, expense) => {
        e.stopPropagation();
        setEditExpense(expense);
    }

    const handleExpenseDelete = (e, expense) => {
        e.stopPropagation();
        setDeleteId(expense._id);
    }




    return (
        <div className=''>

            <div className='p-2'></div>

            <div className="py-2 px-2 md:pr-4 md:flex items-center justify-end md:mb-4 rounded-t-3xl bg-[#EEF2F5] space-y-2 md:space-y-0">

                <input
                    type="text"
                    placeholder="Search by Expense Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full md:w-fit border text-xs border-gray-300 px-3 h-8 mr-2 rounded-full md:rounded-r-none md:rounded-l-full border-none outline-none block"
                />
                <div className='flex justify-between'>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="bg-white h-8 px-3 py-2 mr-2  text-xs rounded-xl md:rounded-none"
                    />

                    <button
                        className=" text-white h-8 px-4 py-2 bg-[#0d034e] text-xs rounded-xl md:rounded-r-full flex justify-end md:justify-center items-center text-nowrap"
                        onClick={() => setCreateModal(!createModal)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        Create Expense
                    </button>
                </div>

            </div>

            {expenses?.length > 0 ?
                <div className=' min-w-screen max-w-screen overflow-x-auto  text-xs'>

                    <table className="w-full">

                        <thead className=" bg-[#EEF2F5]">
                            <tr>

                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Expense</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated at</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created by</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>


                        <tbody className="bg-white rounded-b-3xl">
                            {filteredExpense.length > 0 ?
                                filteredExpense?.map((expense) => (
                                    <tr key={expense._id} className='border hover:bg-[#EEF2F5]' onClick={(e) => handleExpenseClick(e, expense)}>
                                        <td className="px-3 py-4 whitespace-nowrap">{expense.name}</td>
                                        <td className="px-3 py-4 whitespace-nowrap">{expense.category}</td>
                                        <td className="px-3 py-4 whitespace-nowrap">{expense.date.substring(0, 10)}</td>
                                        <td className="px-3 py-4 whitespace-nowrap">{expense.amount}</td>
                                        <td className="px-3 py-4 whitespace-nowrap">{expense.updatedAt.substring(0, 10)}</td>
                                        <td className="px-3 py-4 whitespace-nowrap">{expense.user === userId ? 'Me' : expense.user}</td>
                                        <td className="px-3 py-2 whitespace-nowrap  flex justify-start items-center">

                                            <button className="text-blue-500 border border-blue-200 bg-blue-100 px-3 p-2 rounded-l-full hover:bg-blue-200" title="Edit" onClick={(e) => handleExpenseEdit(e, expense)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>

                                            <button className="text-red-500 px-3 p-2 border bg-red-100 border-red-200 rounded-r-full hover:bg-red-200" title="Delete" onClick={(e) => handleExpenseDelete(e, expense)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>

                                        </td>
                                    </tr>
                                )) :
                                (
                                    <tr>
                                        <td colSpan="7" className=' text-center py-10 text-lg font-semibold text-slate-500'>No expenses found with this name</td>
                                    </tr>
                                )}

                        </tbody>
                    </table>

                    <div className='p-5 rounded-b-3xl bg-[#EEF2F5]'>
                    </div>

                </div>
                :
                <div className='bg-[#EEF2F5] rounded-b-3xl text-slate-600 font-xs font-semibold flex h-60 justify-center items-center'>
                    No Expenses Added Yet
                </div>
            }


            {/* create modal */}
            {
                createModal &&
                <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-sm'
                    onClick={handleCloseCreateModal}>
                    <Createexpense setCreateModal={setCreateModal}
                        expenseUpdated={expenseUpdated}
                        setExpenseUpdated={setExpenseUpdated}
                        setToast={setToast} />
                </div>
            }

            {/* edit */}
            {
                editExpense &&
                <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-sm'
                    onClick={handleCloseCreateModal}>
                    <Editexpense
                        setEditExpense={setEditExpense}
                        editExpense={editExpense}
                        expenseUpdated={expenseUpdated}
                        setExpenseUpdated={setExpenseUpdated}
                        setToast={setToast} />
                </div>
            }


            {
                preview &&
                <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-sm'
                    onClick={handleExpenseClick}>
                    <Preview
                        setPreview={setPreview}
                        preview={preview}
                    />
                </div>
            }




            {/* delete */}
            {
                deleteId &&
                <div>
                    <Delete
                        expenseUpdated={expenseUpdated}
                        setExpenseUpdated={setExpenseUpdated}
                        deleteId={deleteId}
                        onClose={handleCancel}
                        setToast={setToast}
                    />
                </div>
            }

            {
                toast &&
                <div className='p-2 text-xs px-3 absolute top-5 right-5 min-w-36 max-w-fit  bg-cyan-50 border-2 border-cyan-100 text-slate-900 rounded-full font-semibold  capitalize flex justify-center items-center'>{toast}</div>
            }


        </div>
    );
};

export default ViewExpenses;
