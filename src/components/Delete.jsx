import React from 'react';
import axios from "axios";





export const Delete = ({ deleteId, onClose, expenseUpdated, setExpenseUpdated, setToast }) => {

    if (!deleteId) return null;
    const backend = import.meta.env.VITE_BACKEND;

    const handleModalClick = (e) => {
        e.stopPropagation();
        onClose();
    }

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const res = await axios.delete(`${backend}/expenses/delete/${deleteId}`);
            setExpenseUpdated(!expenseUpdated);
            res && setToast("Expense Deleted Succesfully");
            onClose();
        } catch (e) {
            console.log(e.message);
        }
    };


    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">

            <div className="flex items-center justify-center min-h-screen" >

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="bg-white w-80 rounded-3xl p-8 max-w-md mx-auto z-20 relative">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 text-slate-800">Delete this expense ?</h3>
                    <div className="text-xs">
                        <button
                            onClick={onClose}
                            className="w-full bg-blue-100 text-gray-800 px-4 py-2 rounded-full hover:bg-blue-200 duration-500  border-blue-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full  mt-2 bg-red-100 border border-red-300 text-red-600 duration-500 px-4 py-2 rounded-full mr-2 hover:bg-red-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>

    );
};


