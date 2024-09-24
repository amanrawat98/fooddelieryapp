import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryHeader = ({value}) => {
 const navigate = useNavigate();
  return (
    <div className="flex justify-between mb-6 mx-3 ">
    <h2 className="text-2xl font-sans">{value?.name}</h2>
    <button
      className="text-2xl  font-sans text-orange-600"
      onClick={() => {
        console.log('1')
        navigate(`/category/${value.menuCategoryId}`);
      }}
    >
      Explore All
    </button>
  </div>  )
}

export default CategoryHeader