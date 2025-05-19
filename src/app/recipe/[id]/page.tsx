'use client';
import * as React from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Navbar from '@/components/ui/navbar';
import Card from '@/components/ui/menuCard';
import { describe } from 'node:test';


const Page = () => {
  const [menuList , setMenuList] = React.useState<any[]>([])
  const params = useParams()

  const fetchData = async () => {
    try {
      const id  = Number(params.id)
      
      const response = await axios.get(`/api/menu/${id}`);
      if (response.data) {
         if (Array.isArray(response.data)) {
          setMenuList(response.data);
        } else {
          setMenuList([response.data])
        }
      } else {
        setMenuList([])
      }
      console.log(menuList)
    } catch (err) {
      console.error("Error fetching menu data:", err);
    } 
  };

  React.useEffect(() => {
    fetchData()
  }, [params.id]); // Add params.id as dependency

  return (
    <div>
      <Navbar />
      <div className="w-full p-4 ">
        <div className="grid gap-y-10 gap-x-10 grid-rows-3 md:grid-cols-3 "> 
          { menuList.length === 0 ? (
            <p>No menu</p>
          ) : (
           menuList.map((menu, index) => (
            <div className='mx-auto py-auto'>
              <Card key={index} name={menu.menuName} description={menu.describe} id={menu.id}/>
            </div>
            
            )))
          }
        </div>
      </div>
    </div>
  );
};

export default Page;