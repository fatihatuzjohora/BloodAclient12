import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Fund = () => {
const navigate = useNavigate();

const handle = ()=> {
  navigate('/form')

}

const axiosPublic = useAxiosPublic();
    
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-payments`);
            return res.data;
        }
    })


    return (
      <>
        <div className="flex justify-end my-10 mr-8">
           
           <button onClick={handle} className="btn btn-success text-3xl text-white">Give Fund</button>

        </div>


{/* pyments */}

     <div>
     <h1 className="text-center text-green-700 text-3xl font-semibold mb-6">All Fundings</h1>
        <div className="overflow-x-auto min-h-[46vh]">
            <table className="table rounded-none bg-[#c3b8cbc1]">
                {/* head */}
                <thead>
                    <tr>
                        
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Name</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Amount</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Date</th>
                       
                        
                    </tr>
                </thead>
                <tbody>
                    {
                      payments.map(donate => 
                        <tr key={donate._id}>
                        
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.name}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">${donate.price}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.date}</td>
                        
                    </tr>
                      )
                  }
                </tbody>
            </table>
        </div>
     </div>

        </>
    );
};

export default Fund;
