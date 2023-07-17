import Accordion from "../components/accordian/accordian";
import { GetServerSideProps } from "next";
import Users from "../interface/users";
import axios from "axios";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

interface UserProps {
  data: Users[];
}

// const DisplayAccordian = dynamic(() => import("../components/accordian/accordian"), {
//   loading: () => <p className='text-yellow-600 bg-black text-2xl'>Loading...</p>,
// });

export default function Home({ data }: UserProps): JSX.Element {
  console.log(data);
  return (
    <div className='bg-black'>
      <div className='flex items-center justify-center'>
        <div className='w-full max-w-md'>
          <div className='space-y-2'>
            <Accordion data={data} />
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
