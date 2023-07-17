import React, { Suspense, useState, ChangeEvent, useEffect } from "react";
import Accordion from "../components/accordian/accordian";
import { GetServerSideProps } from "next";
import Users from "../interface/users";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import dynamic from "next/dynamic";

interface UserProps {
  data: Users[];
}

// const DisplayAccordian = dynamic(() => import("../components/accordian/accordian"), {
//   loading: () => <p className='text-yellow-600 bg-black text-2xl'>Loading...</p>,
// });

export default function Home({ data }: UserProps): JSX.Element {
  //search functionality_______//
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Users[]>(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //handling input change________//
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };
  // Filter the data based on the search term_________________//
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.length >= 3) {
        setIsLoading(true);
        const filtered = data.filter((user) => user.body.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredData(filtered);
      } else {
        setIsLoading(true);
        setFilteredData(data);
      }
    }, 500);
    setIsLoading(false);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, data]);

  return (
    <div className='bg-black min-h-screen h-full'>
      {/* Search Functinality */}
      <div className='flex flex-col items-start'>
        <div className='p-8'>
          <div className='relative text-gray-600'>
            <input
              type='search'
              name='search'
              placeholder='Search in Comments 💬'
              value={searchTerm}
              onChange={handleInputChange}
              className='bg-gray-200 pl-12 h-12 px-5 tracking-wide leading-6 rounded-full text-sm focus:outline-none'
            />
            <button className='absolute left-0 top-0 bottom-0 ml-4'>
              <FiSearch className='text-gray-800 drop-shadow-2xl' size={20} />
            </button>
          </div>
        </div>

        <div className='p-8'>{!isLoading ? <div className='text-white'>Loading...</div> : <div className='text-white'>done</div>}</div>

        <div className='flex pb-8 px-8'>
          <div className='w-full max-w-md'>
            <div className='space-y-2'>
              {filteredData.length === 0 || filteredData === null ? (
                <div className=' h-screen flex justify-center'>
                  <p className='text-[#FAAB5B] leading-10 font-light not-italic text-2xl'>
                    No <span className='font-bold underline-offset-4 underline'>Data</span> Found
                    <br /> Just the <span className='font-bold underline-offset-4 underline'>Desert</span> 🐪
                  </p>
                </div>
              ) : (
                <Accordion data={filteredData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<UserProps> = async (): Promise<{ props: UserProps }> => {
  const response = await axios.get(`https://dummyjson.com/comments`);
  const data = await response.data.comments;
  return { props: { data } };
};
