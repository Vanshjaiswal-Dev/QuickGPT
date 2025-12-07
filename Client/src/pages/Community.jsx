import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets';
import Loading from './Loading';
import axios from '../store/axiosInstance';
import toast from 'react-hot-toast';

const Community = () => {
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const {data} = await axios.get('/api/user/published-images');
      if(data.success){
        setImages(data.images);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchImages();
  },[])

  if(loading) return <Loading/>
  return (
    <div className='p-4 md:p-6 pt-16 md:pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
  <h2 className='text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-800 dark:text-purple-100'>
    Community Images
  </h2>

  {images.length > 0 ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5'>
      {images.map((item, index) => (
        <a
          key={index}
          href={item.imageUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='relative group block rounded-lg overflow-hidden border 
                     border-gray-200 dark:border-purple-700 shadow-sm 
                     md:hover:shadow-md transition-shadow duration-300'
        >
          <img
            src={item.imageUrl}
            alt={`Image by ${item.userName}`}
            className='w-full h-48 sm:h-40 md:h-50 2xl:h-62 object-cover 
                       md:group-hover:scale-105 transition-transform 
                       duration-300 ease-in-out'
          />
          <p className='absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur 
             text-white px-3 py-1 rounded-tl-xl max-md:opacity-100
             md:opacity-0 md:group-hover:opacity-100 transition duration-300'>Created by {item.userName}</p>
        </a>
      ))}
    </div>
      ) : (
        <p className='text-center text-gray-600 dark:text-purple-200 mt-10'>no images found</p>
      )}
    </div>
  )
}

export default Community