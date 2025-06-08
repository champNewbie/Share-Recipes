'use client';
import * as React from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Navbar from '@/components/ui/navbar';
import MenuCard from '@/components/ui/menuCard';

interface menuList{
  menuName : string,
  describe : string,
  id : string,
  image : string
}

const Page =  () => {
  const [menuList , setMenuList] = React.useState<menuList[]>([])
  const params = useParams()
  const id  = Number(params.id)
  const fetchData = async () => {
    try {
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
      {menuList.length == 0 && (
          <div className="flex items-center justify-center h-225">
              <h1 className='text-3xl font-bold'>No recipes found</h1>
          </div>
            )
      }
      <div className="w-full p-4 ">
        <div className="grid gap-y-10 gap-x-10 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 "> 
          { menuList && (
           menuList.map((menu, index) => (
            <div key={index} className='mx-auto py-auto'>
              <MenuCard name={menu.menuName} description={menu.describe} id={menu.id} image={menu.image}/>
            </div>
            
            )))
          }
        </div>
      </div>
    </div>
  );
};

export default Page;