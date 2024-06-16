import useAxiosPublic from "../../hook/useAxiosPublic";

import BlogDetail from "./BlogCard";
import { useQuery } from "@tanstack/react-query";

const Blog = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-blogs");
      return res.data;
    },
  });

  const pending = blogs.filter((item) => item.status == "published");

  //console.log(blog);
  return (
    <div className=" m-2 md:m-20">
      <div className='w-full mb-5 h-32 bg-slate-600 bg-cover bg-center bg-no-repeat bg-[url("https://i.ibb.co/0j6mW6M/chinatown-bangkok.jpg")] rounded-sm'>
        <h1 className="text-6xl flex justify-center items-center w-full bg-[#1111119c] h-full text-center my-10 text-white font-bold">
          Home / Blogs
        </h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pending?.map((pending) => (
          <BlogDetail key={pending._id} pending={pending}></BlogDetail>
        ))}
      </div>
    </div>
  );
};

export default Blog;
