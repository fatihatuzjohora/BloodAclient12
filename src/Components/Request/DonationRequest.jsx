import { Link } from "react-router-dom";

import useAxiosPublic from "../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const DonationRequest = () => {

    const axiosPublic = useAxiosPublic();
    
    const { data: donate = [] } = useQuery({
        queryKey: ['donate'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/request`);
            return res.data;
        }
    })

    const filter = donate.filter(item => item.status === 'pending');

    return (
        <>
        <h1 className="text-center text-green-700 text-3xl font-semibold mb-6">All Donation Requests</h1>
        <div className="overflow-x-auto min-h-[46vh]">
            <table className="table rounded-none bg-[#c3b8cbc1]">
                {/* head */}
                <thead>
                    <tr>
                        
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Recipient Name</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Location</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Date</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Time</th>
                    
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                      filter.map(donate => 
                        <tr key={donate._id}>
                        
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.recipient}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.upazila},{donate.dictrict}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.date}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.time}</td>
                       
                        <td className="flex flex-col  gap-2 md:flex-row">
                          
                          <Link to={`/requests/${donate._id}`}>
                           <button
                                className="btn md:mr-2 btn-info">View Detail</button>
                        </Link>
                        
                          
                        </td>
                    </tr>
                      )
                  }
                </tbody>
            </table>
        </div>
        </> );
};

export default DonationRequest;