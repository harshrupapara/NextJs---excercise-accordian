import React from "react";
import { FiLoader } from "react-icons/fi";
export default function AccordianShimmer() {
  const shimmerArr: { id: number }[] = new Array(10).fill(null).map((_, idx) => ({ id: idx + 1 }));
  console.log(shimmerArr);
  return (
    <>
      <div className='flex flex-col'>
        <div>
          <FiLoader className='text-gray-500 rotate-180 transition-transform duration-500' size={18} />{" "}
        </div>
        {shimmerArr?.map((e) => (
          <div key={e.id} className='flex items-center space-x-4 animate-pulse'>
            <div className='bg-gray-500 my-2 h-[8.5rem] w-[28rem] rounded-md p-4 flex flex-row'>
              <div className='flex flex-col justify-center'>
                <div className='bg-gray-300 my-2 h-[2.6rem] w-[16rem] rounded-lg'></div>
                <div className='bg-gray-300 my-2 h-[2.6rem] w-[16rem] rounded-lg'></div>
                <div className='bg-gray-300 my-2 h-[2.6rem] w-[16rem] rounded-lg'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
