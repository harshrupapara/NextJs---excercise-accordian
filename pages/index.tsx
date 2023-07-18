import React, { useState, ChangeEvent, useEffect } from "react";
import AccordianShimmer from "@/components/shimmer/shimmer";
import { GetServerSideProps } from "next";
import Users from "../interface/users";
import axios from "axios";

import { FiSearch } from "react-icons/fi";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import dynamic from "next/dynamic";
import DataNotFound from "@/components/data-not-found/data-not-found";

interface UserProps {
  data: Users[];
}

const DisplayAccordian = dynamic(() => import("../components/accordian/accordian"), {
  loading: () => <p className='text-yellow-600 bg-black text-2xl'>Loading...</p>,
});

export default function Home({ data }: UserProps): JSX.Element {
  //search functionality_______//
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Users[]>(data);
  //loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const shimmerArr: { id: number }[] = new Array(10).fill(null).map((_, idx) => ({ id: idx + 1 }));
  console.log(shimmerArr);

  //sorting functionality______//
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortData = (data: Users[]): Users[] => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.body.localeCompare(b.body);
      } else {
        return b.body.localeCompare(a.body);
      }
    });
    return sortedData;
  };

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
        const sorted = sortData(filtered);
        setFilteredData(sorted);
      } else {
        setIsLoading(true);
        const sorted = sortData(data);
        setFilteredData(sorted);
      }
    }, 600);
    setIsLoading(false);
    return () => clearTimeout(delayedSearch);
  }, [searchTerm, data, sortOrder]);

  return (
    <div className='bg-black min-h-screen h-full'>
      {/* Search Functinality */}
      <div className='flex flex-col items-start'>
        <div className='p-8 flex gap-6'>
          <div className='relative text-gray-600'>
            <input
              autoComplete='off'
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
          {/* Sorting Buttons */}
          <div className='flex justify-center items-center gap-3 bg-blue-400 rounded-full px-6'>
            <div>
              <p className='text-white text-sm underline underline-offset-2 font-light'>sort : </p>
            </div>
            <div className='flex flex-col justify-center'>
              <button onClick={() => setSortOrder("asc")}>
                <FaAngleUp size={16} className={`delay-100 ${sortOrder === "asc" ? "text-gray-500" : "text-white"}`} />
              </button>
              <button onClick={() => setSortOrder("desc")}>
                <FaAngleDown size={16} className={`delay-100 ${sortOrder === "desc" ? "text-gray-500" : "text-white"}`} />
              </button>
            </div>
          </div>
        </div>

        <div className='flex pb-8 px-8'>
          {!isLoading ? (
            <AccordianShimmer />
          ) : (
            <div className='w-full max-w-md'>
              <div className='space-y-2'>
                {filteredData.length === 0 || filteredData === null ? <DataNotFound /> : <DisplayAccordian data={filteredData} />}
              </div>
            </div>
          )}
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
