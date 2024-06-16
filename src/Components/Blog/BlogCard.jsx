/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const BlogCard = ({ pending }) => {

    const  { _id, title,  image } = pending;
    return (
        <div className="card card-compact border-2 rounded-sm  bg-[#e9e9e9f3] shadow-2xl p-1">
        <div className="flex flex-col gap-3">
            <div className='w-full border rounded-lg'>
            <img className='bg-slate-600 h-60 w-full mx-auto rounded-sm' src={image} alt="" />
            </div>
            
           
            <h2 className='text-2xl font-bold primary-font'>{title}</h2>
            
        
            <div className="w-full h-full">
            <Link to={`/blog/${_id}`}>
             <button className="btn hover:bg-blue-500  w-full bg-[#0abe34a9] text-white rounded-sm">View Details</button>
             </Link>
            </div>
            
        </div>
    </div>
    );
};

export default BlogCard;