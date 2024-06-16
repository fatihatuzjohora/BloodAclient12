import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const ContentManage = () => {
  const axiosPublic = useAxiosPublic();
  // const queryClient = useQueryClient();

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-blogs");
      return res.data;
    },
  });

  // const deleteMutation = useMutation(
  //     async (id) => {
  //         await axiosPublic.delete(`/blogs/${id}`);
  //     },
  //     {
  //         onSuccess: () => {
  //             queryClient.invalidateQueries("blogs");
  //         },
  //     }
  // );

  //

  const handleDelete = (id) => {
    // deleteMutation.mutate(id);
  };

  const handlePublish = async (data) => {
    const res = await axiosPublic.put(`/blogs/${data._id}`, {
      ...data,
      status: "published",
    });
    console.log({ res, data });
  };

  console.log(blogs);

  return (
    <div className="my-5">
      <div className="flex justify-end mb-5">
        <Link to={`add-blog`}>
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td>{blog.status}</td>
                <td>
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-error btn-sm"
                    >
                      <FaTrash />
                    </button>
                    {blog.status === "draft" && (
                      <button
                        onClick={() => handlePublish(blog)}
                        className="btn btn-success btn-sm"
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManage;
