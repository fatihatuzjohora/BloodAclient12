import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hook/useRole";
import Swal from "sweetalert2";
import parse from "html-react-parser";

import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  let p = parse(content);

  //console.log(p.props.children);

  const [data] = useRole();
  const role = data.role;
  const [item, setItem] = useState(true);
  const [sort, setSort] = useState([]);
  const [remain, setRemain] = useState([]);
  // const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const axiospublic = useAxiosPublic();
  const { data: bloging = [], refetch } = useQuery({
    queryKey: ["bloging"],
    queryFn: async () => {
      const res = await axiospublic.get("/bloging");
      setRemain(bloging);
      return res.data;
    },
  });
  //console.log(bloging);
  setTimeout(() => {
    refetch();
  }, "300");
  // console.log(remain);
  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const description = p.props.children;
    const content = description[0];
    //console.log(description[0]);
    const status = "draft";

    const info = {
      image: image,
      title: title,
      content: content,

      status: status,
    };

    const blog = await axiospublic.post("/content", info);
    //  console.log(user.data)

    if (blog.data.insertedId) {
      toast.success("Added Blog Successfully");
    }
    e.target.reset();
    navigate("/");
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setItem(false);
    refetch();
    if (e.target.value == "draft") {
      const draft = remain.filter((item) => item.status == "draft");
      setSort(draft);
    }
    if (e.target.value == "published") {
      const published = remain.filter((item) => item.status == "published");
      setSort(published);
    }
  };

  const handleDraft = (id) => {
    if (role != "admin") {
      toast.error("Only admin has access");
      return;
    }
    const status = "published";
    const add = { status };
    console.log(id);
    // send data to the server
    fetch(`https://blood-theta.vercel.app/blogs/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(add),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
        refetch();
        console.log(data);
        toast.success("Published successfully");
      });
  };

  const handlePublish = (id) => {
    if (role != "admin") {
      toast.error("Only admin has access");
      return;
    }
    const status = "draft";
    const add = { status };
    console.log(id);
    // send data to the server
    fetch(`https://blood-theta.vercel.app/blogs/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(add),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        navigate("/");
        console.log(data);
        toast.success("Draft successfully");
      });
  };

  const handleDelete = (id) => {
    // console.log(id);
    // make sure user is confirmed to delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://blood-theta.vercel.app/blogs/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              //  console.log('deleted successfully');
              Swal.fire("Deleted!", "Blog has been deleted.", "success");

              // toast.success('deleted successfully');
              // remove the user from the UI
              const remainingUsers = remain.filter((spot) => spot._id !== id);
              setRemain(remainingUsers);
              setSort(remainingUsers);
            }
          });
      }
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col w-[95%] md:w-[80%] p-6 rounded-md sm:p-3 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Add Blog</h1>
            <p className="text-sm text-gray-400">Welcome to OneBlood</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  required
                  type="text"
                  id="image"
                  name="image"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Content :
                </label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  tabIndex={1} // tabIndex of textarea
                  onChange={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  // onChange={newContent => {}}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-900 w-full rounded-md py-3 text-white btn"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* blog section */}

      <h1 className="text-center text-green-700 text-3xl font-semibold mb-6">
        All Blogs
      </h1>
      <div className="overflow-x-auto min-h-[46vh]">
        <table className="table rounded-none bg-[#c3b8cbc1]">
          {/* head */}
          <thead>
            <tr>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Title
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Image
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Status
              </th>

              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Action
              </th>
              <th className="px-[5px] md:pl-3 text-stone-950 text-lg font-bold">
                <select
                  onChange={handleChange}
                  defaultValue="default"
                  className="select select-bordered w-32"
                >
                  <option value="default" disabled>
                    Filter
                  </option>
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </th>
            </tr>
          </thead>
          {item ? (
            <tbody>
              {remain.map((donate) => (
                <tr key={donate._id}>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.title}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    <img className="w-10 h-10" src={donate.image} alt="" />
                  </td>

                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.status}
                  </td>

                  <td className="flex gap-2 flex-row">
                    {donate.status == "draft" ? (
                      <button
                        onClick={() => handleDraft(donate?._id)}
                        className="btn md:mr-2 btn-primary"
                      >
                        Publish
                      </button>
                    ) : (
                      ""
                    )}

                    {donate.status == "published" ? (
                      <button
                        onClick={() => handlePublish(donate?._id)}
                        className="btn md:mr-2 btn-primary"
                      >
                        Unpublish
                      </button>
                    ) : (
                      ""
                    )}

                    {role == "admin" ? (
                      <button
                        onClick={() => handleDelete(donate._id)}
                        className="btn md:mr-2 btn-success"
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {sort.map((donate) => (
                <tr key={donate._id}>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.title}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    <img className="w-10 h-10" src={donate.image} alt="" />
                  </td>

                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.status}
                  </td>

                  <td className="flex gap-2 flex-row">
                    {donate.status == "draft" ? (
                      <button
                        onClick={() => handleDraft(donate?._id)}
                        className="btn md:mr-2 btn-primary"
                      >
                        Publish
                      </button>
                    ) : (
                      ""
                    )}

                    {donate.status == "published" ? (
                      <button
                        onClick={() => handlePublish(donate?._id)}
                        className="btn md:mr-2 btn-primary"
                      >
                        Unpublish
                      </button>
                    ) : (
                      ""
                    )}

                    {role == "admin" ? (
                      <button
                        onClick={() => handleDelete(donate._id)}
                        className="btn md:mr-2 btn-success"
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default AddBlog;
