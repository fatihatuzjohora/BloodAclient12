import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import toast from "react-hot-toast";

const MyRequest = () => {
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState(true);
  const [sort, setSort] = useState([]);
  const navigate = useNavigate();
  const email = user.email;
  const [remain, setRemain] = useState([]);

  // console.log(email);
  const axiosSecure = useAxiosSecure();
  // eslint-disable-next-line no-unused-vars
  const { data: donate = [], refetch } = useQuery({
    queryKey: ["donate"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/request/${email}`);
      setRemain(donate);
      return res.data;
    },
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    // setItem(false);

    if (e.target.value == "pending") {
      const pending = remain.filter((item) => item.status == "pending");
      setRemain(pending);
    }
    if (e.target.value == "done") {
      const done = remain.filter((item) => item.status == "done");
      setRemain(done);
    }
    if (e.target.value == "cancel") {
      const cancel = remain.filter((item) => item.status == "cancel");
      setRemain(cancel);
    }
    if (e.target.value == "inprogress") {
      const inprogress = remain.filter((item) => item.status == "inprogress");
      setRemain(inprogress);
    }
  };

  const handleCancel = (id) => {
    const status = "cancel";
    const add = { status };
    console.log(id);
    // send data to the server
    fetch(`https://blood-theta.vercel.app/request/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(add),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        navigate("/");
        toast.success("Canceled request successfully");
      });
  };

  const handleDone = (id) => {
    const status = "done";
    const add = { status };
    console.log(id);
    // send data to the server
    fetch(`https://blood-theta.vercel.app/request/${id}`, {
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
        toast.success("Request done successfully");
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
        fetch(`https://blood-theta.vercel.app/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              //  console.log('deleted successfully');
              Swal.fire(
                "Deleted!",
                "Your request has been deleted.",
                "success"
              );
              //  refetch();
              // toast.success('deleted successfully');
              // remove the user from the UI
              const remainingUsers = donate.filter((spot) => spot._id !== id);
              setSort(remainingUsers);
              setRemain(remainingUsers);
            }
          });
      }
    });
  };

  const handle = () => {
    navigate("all-blood-dontion-request/edit/:id");
  };
  // console.log(donate);
  return (
    <>
      <h1 className="text-center text-green-700 text-3xl font-semibold mb-6">
        My Added Requests
      </h1>
      <div className="overflow-x-auto min-h-[46vh]">
        <table className="table rounded-none bg-[#c3b8cbc1]">
          {/* head */}
          <thead>
            <tr>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Recipient Name
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Location
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Date
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Time
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                status
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Donor
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
                  <option value="pending">pending</option>
                  <option value="inprogress">inprogress</option>
                  <option value="done">done</option>
                  <option value="cancel">cancel</option>
                </select>
              </th>
            </tr>
          </thead>

          {item ? (
            <tbody>
              {remain.map((donate) => (
                <tr key={donate._id}>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.recipient}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.upazila},{donate.dictrict}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.date}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.time}
                  </td>

                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.status}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.status == "inprogress" ? (
                      <td className="px-[5px] md:px-1 font-bold text-lg">
                        {donate.donorName}
                      </td>
                    ) : (
                      ""
                    )}
                    {donate.status == "inprogress" ? (
                      <td className="px-[5px] md:px-1 font-bold text-lg">
                        {donate.donorEmail}
                      </td>
                    ) : (
                      ""
                    )}{" "}
                  </td>
                  <td className="flex flex-col  gap-2 md:flex-row">
                    <Link to={`/edit/${donate._id}`}>
                      <button
                        onClick={handle}
                        className="btn md:mr-2 btn-error"
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(donate._id)}
                      className="btn md:mr-2 btn-success"
                    >
                      Delete
                    </button>

                    <Link to={`detail/${donate._id}`}>
                      <button className="btn md:mr-2 btn-primary">
                        Detail
                      </button>
                    </Link>

                    {donate.status == "inprogress" ? (
                      <button
                        onClick={() => handleDone(donate?._id)}
                        className="btn md:mr-2 btn-info"
                      >
                        Done
                      </button>
                    ) : (
                      ""
                    )}
                    {donate.status == "inprogress" ? (
                      <button
                        onClick={() => handleCancel(donate?._id)}
                        className="btn md:mr-2 btn-accent"
                      >
                        Cancel
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
                    {donate.recipient}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.upazila},{donate.dictrict}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.date}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.time}
                  </td>

                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.status}
                  </td>
                  <td className="px-[5px] md:px-3 font-bold text-lg">
                    {donate.status == "inprogress" ? (
                      <td className="px-[5px] md:px-1 font-bold text-lg">
                        {donate.donorName}
                      </td>
                    ) : (
                      ""
                    )}
                    {donate.status == "inprogress" ? (
                      <td className="px-[5px] md:px-1 font-bold text-lg">
                        {donate.donorEmail}
                      </td>
                    ) : (
                      ""
                    )}{" "}
                  </td>
                  <td className="flex flex-col  gap-2 md:flex-row">
                    <Link to={`edit/${donate._id}`}>
                      <button className="btn md:mr-2 btn-error">Edit</button>
                    </Link>

                    <button
                      onClick={() => handleDelete(donate._id)}
                      className="btn md:mr-2 btn-success"
                    >
                      Delete
                    </button>

                    <Link to={`detail/${donate._id}`}>
                      <button className="btn md:mr-2 btn-primary">
                        Detail
                      </button>
                    </Link>

                    {donate.status == "inprogress" ? (
                      <button className="btn md:mr-2 btn-info">Done</button>
                    ) : (
                      ""
                    )}
                    {donate.status == "inprogress" ? (
                      <button className="btn md:mr-2 btn-accent">Cancel</button>
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

export default MyRequest;
