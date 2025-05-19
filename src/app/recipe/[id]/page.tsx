'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Navbar from '@/components/ui/navbar';
import Card from '@/components/ui/card';

const Page = () => {
  const [name, setName] = useState<string>('');
  const [describe, setDescribe] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      const id = Number(params.id);
      console.log("Fetching menu ID:", id);
      
      const response = await axios.get(`/api/menu/${id}`);
      console.log(response)
      if (response.data && response.data.data) {
        setName(response.data.data.menuName);
        setDescribe(response.data.data.describe);
        console.log("Fetched data:", response.data.data);
      } else {
        console.log("Direct response structure:", response.data);
        // Try to extract data directly from response
        if (response.data) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            // If it's an array (like from findMany), take the first item
            const menuData = response.data[0];
            if (menuData.menuName) setName(menuData.menuName);
            if (menuData.describe) setDescribe(menuData.describe);
          } else {
            // If it's a single object
            const menuData = response.data;
            if (menuData.menuName) setName(menuData.menuName);
            if (menuData.describe) setDescribe(menuData.describe);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching menu data:", err);
      setError("Failed to load menu data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]); // Add params.id as dependency

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p>Loading menu details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4">
        <div className="mx-auto"> 
          <Card name={name} description={describe} />
          <div className="mt-4 p-2 border rounded">
            <h2 className="font-bold">Debug Info:</h2>
            <p>Name: {name}</p>
            <p>Description: {describe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;