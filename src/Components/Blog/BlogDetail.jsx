import {  useParams } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const BlogDetail = () => {
    const id = useParams();

    const axiosPublic = useAxiosPublic();
    
   // console.log(id.id);
    const { data: blog = [] } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs/${id.id}`);
            return res.data;
        }
    })


    const { image, title, content, status} = blog;
    return (
        <div className="flex flex-col lg:flex-row gap-8 items-center w-[85%] mx-auto my-10 py-10 md:pl-5 bg-[#e9e9e9f3]">
        <div data-aos="flip-right" data-aos-duration="2000">
         <img className="h-[500px] w-[full] border-2 border-gray-500 rounded-lg" src={image} alt="" />
         </div> 
     <div data-aos="fade-left" data-aos-delay="500" data-aos-duration="1000" className="flex flex-col gap-4">
         <h2 className="text-3xl font-bold primary-font">{title}</h2>
         <p className="pb-5  text-xl font-bold  border-[#13131326]">Content : {content}</p>
         
         <p className="pb-3  text-xl font-medium border-[#13131326]">Status : {status}</p>
         
        </div> 
        </div>
    );
};

export default BlogDetail;