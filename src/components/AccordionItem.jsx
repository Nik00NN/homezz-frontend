import React from 'react';

const AccordionItem = ({ num, title, curOpen, onOpen, children }) => {
    const isOpen = num === curOpen;
    const handleToggle = () => {
        onOpen(isOpen ? null : num);
    };

    return (
        <div
            onClick={handleToggle}
            className={`bg-gray-700 text-white p-6 mb-4 rounded-lg shadow-lg  ease-in-out cursor-pointer transform hover:scale-105 transition duration-300 ${isOpen ? "border-l-4 border-teal-400" : ""}`}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <p className="text-xl font-bold text-teal-300 mr-4">
                        {num < 9 ? `0${num}` : num.toString()}
                    </p>
                    <p className="text-2xl font-semibold">{title}</p>
                </div>
                <p className="text-xl font-bold text-teal-400">{isOpen ? "-" : "+"}</p>
            </div>
            {isOpen && (
                <div className="mt-4 text-gray-300 leading-normal font-medium text-lg">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
