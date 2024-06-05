import {useState} from "react";
import AccordionItem from "./AccordionItem.jsx";

const Accordion = ({data}) => { // Destructure the data prop
    const [curOpen, setCurOpen] = useState(null);

    return (
        <div className="w-[800px] m-32 flex flex-col gap-6 ">
            {data.map((element, index) => (
                <AccordionItem
                    curOpen={curOpen}
                    onOpen={setCurOpen}
                    title={element.title}
                    num={element.num}
                    key={index}
                >
                    {element.text}
                </AccordionItem>
            ))}
        </div>
    )
}

export default Accordion;
