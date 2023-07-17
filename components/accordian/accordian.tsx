import { useState, useEffect } from "react";
import Users from "../../interface/users";

interface AccordionProps {
  data: Users[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // useEffect(() => {
  //   console.log(data);
  //   console.log("active Index: ", activeIndex);
  // }, [activeIndex]);

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className={`bg-gray-200 rounded-lg p-4 ${activeIndex === item.id ? "border-blue-500" : "border-transparent"}`}>
          <button
            className='flex items-start gap-5 justify-between w-full focus:outline-none'
            onClick={() => handleAccordionClick(item.id)}>
            <h3
              className={`text-2xl text-black text-start transition duration-100 font-semibold tracking-wide ${
                activeIndex === item.id ? "text-blue-400" : ""
              }`}>
              {item.body}
            </h3>
            <span className={`ml-8 text-lg transition duration-200 ${activeIndex === item.id ? "rotate-45 text-blue-400" : ""}`}>+</span>
          </button>
          <div>
            {activeIndex === item.id && (
              <p className='mt-6'>
                <em className='font-bold not-italic underline'>User: {item.user.id}</em>
                <br />
                <em className='font-light no-underline'>{item.user.username}</em>
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordion;
