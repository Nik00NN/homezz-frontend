const AccordionItem = ({ num, title, curOpen, onOpen, children }) => { // Adjust the props destructuring
    const isOpen = num === curOpen;
    const handleToggle = () => {
        onOpen(isOpen ? null : num);
    };

    return (
        <div onClick={handleToggle} className={`shadow-lg p-5 pr-5 cursor-pointer border-b-4 border-t-4 border-gray-700  grid grid-cols-1 gap-7 items-center bg-slate-600 ${isOpen ? "border-teal-300" : ""}`}>
            <p className="text-xl text-bold text-[#fcb48d]">
                {num < 9 ? `0${num}` : num.toString()}
            </p>
            <p className="text-2xl font-sans font-medium">{title}</p>
            <p className="text-2xl text-[#fcb48d]">{isOpen ? "-" : "+"}</p>
            {isOpen && <div className="grid-cols-2 pb-4 leading-normal">{children}</div>}
        </div>
    );
}

export default AccordionItem;
