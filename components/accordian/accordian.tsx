import { useState } from "react";

import Users from "../../interface/users";

interface AccordionProps {
  data: Users[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className={`bg-gray-200 rounded-lg p-4 ${activeIndex === item.id ? "border-blue-500" : "border-transparent"}`}>
          <button className='flex items-start justify-between w-full focus:outline-none' onClick={() => handleAccordionClick(item.id)}>
            <h3
              className={`text-2xl text-start transition duration-100 font-semibold tracking-wide ${
                activeIndex === item.id ? "text-blue-400" : "text-black"
              }`}>
              {item.body}
            </h3>
            <span className={`pl-24 text-md transition duration-200 ${activeIndex === item.id ? "rotate-45 text-blue-400" : ""}`}>+</span>
          </button>
          <div className={`overflow-hidden transition-all duration-200  ${activeIndex === item.id ? "max-h-[999px]" : "max-h-0 "}`}>
            <p className='mt-6'>
              <em className='font-extrabold tracking-wider text-xs not-italic underline-offset-2'>USER [ {item.user.id} ]</em>
              <br />
              <em className='font-light text-xl leading-10 no-underline'>{item.user.username}</em>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordion;
