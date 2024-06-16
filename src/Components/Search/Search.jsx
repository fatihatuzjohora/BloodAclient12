import { useState } from "react";

const Search = () => {
  const [blood, setBlood] = useState("");
  const [dictrict, setDictrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "blood":
        setBlood(value);

        break;
      case "upazila":
        setUpazila(value);
        break;
      case "dictrict":
        setDictrict(value);
        break;
      default:
        break;
    }
  };
  //  console.log(blood);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/filter?dictrict=${dictrict}&upazila=${upazila}&blood=${blood}`
      );
      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-[60vh] mt-4">
        <div className="flex flex-col w-[80%] p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-3xl font-bold">Search Donor</h1>
            <p className="text-sm text-gray-400">Welcome to My Blood</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label>Blood Group :</label>
                <select
                  id="blood"
                  name="blood"
                  value={blood}
                  onChange={handleInputChange}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="">enter blood group</option>
                  <option value="A  +">A+</option>
                  <option value="A-">A-</option>
                  <option value="B  +">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB  +">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O  +">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label>District :</label>
                <select
                  id="dictrict"
                  name="dictrict"
                  value={dictrict}
                  onChange={handleInputChange}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="">enter District</option>
                  <option value="Comilla">Comilla</option>
                  <option value="Feni">Feni</option>
                  <option value="Brahmanbaria">Brahmanbaria</option>
                  <option value="Rangamati">Rangamati</option>
                  <option value="Noakhali">Noakhali</option>
                  <option value="Chandpur">Chandpur</option>
                  <option value="Lakshmipur">Lakshmipur</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Coxsbazar">Coxsbazar</option>
                  <option value="Khagrachhari">Khagrachhari</option>
                  <option value="Bandarban">Bandarban</option>
                  <option value="Sirajganj">Sirajganj</option>
                  <option value="Pabna">Pabna</option>
                  <option value="Bogura">Bogura</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Natore">Natore</option>
                  <option value="Joypurhat">Joypurhat</option>
                  <option value="Chapainawabganj">Chapainawabganj</option>
                  <option value="Naogaon">Naogaon</option>
                  <option value="Jashore">Jashore</option>
                  <option value="Satkhira">Satkhira</option>
                  <option value="Meherpur">Meherpur</option>
                  <option value="Narail">Narail</option>
                  <option value="Chuadanga">Chuadanga</option>
                  <option value="Kushtia">Kushtia</option>
                  <option value="Magura">Magura</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Bagerhat">Bagerhat</option>
                  <option value="Jhenaidah">Jhenaidah</option>
                  <option value="Jhalakathi">Jhalakathi</option>
                  <option value="Patuakhali">Patuakhali</option>
                  <option value="Pirojpur">Pirojpur</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Bhola">Bhola</option>
                  <option value="Barguna">Barguna</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Moulvibazar">Moulvibazar</option>
                  <option value="Habiganj">Habiganj</option>
                  <option value="Sunamganj">Sunamganj</option>
                  <option value="Narsingdi">Narsingdi</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="Shariatpur">Shariatpur</option>
                  <option value="Narayanganj">Narayanganj</option>
                  <option value="Tangail">Tangail</option>
                  <option value="Kishoreganj">Kishoreganj</option>
                  <option value="Manikganj">Manikganj</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Munshiganj">Munshiganj</option>
                  <option value="Rajbari">Rajbari</option>
                  <option value="Madaripur">Madaripur</option>
                  <option value="Gopalganj">Gopalganj</option>
                  <option value="Faridpur">Faridpur</option>
                  <option value="Panchagarh">Panchagarh</option>
                  <option value="Dinajpur">Dinajpur</option>
                  <option value="Lalmonirhat">Lalmonirhat</option>
                  <option value="Nilphamari">Nilphamari</option>
                  <option value="Gaibandha">Gaibandha</option>
                  <option value="Thakurgaon">Thakurgaon</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Kurigram">Kurigram</option>
                  <option value="Sherpur">Sherpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Jamalpur">Jamalpur</option>
                  <option value="Netrokona">Netrokona</option>
                </select>
              </div>

              <div>
                <label>Upazila :</label>
                <select
                  id="upazila"
                  name="upazila"
                  value={upazila}
                  onChange={handleInputChange}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="">enter Upazila</option>
                  <option value="Debidwar">Debidwar</option>
                  <option value="Barura">Barura</option>
                  <option value="Brahmanpara">Brahmanpara</option>
                  <option value="Chandina">Chandina</option>
                  <option value="Chauddagram">Chauddagram</option>
                  <option value="Daudkandi">Daudkandi</option>
                  <option value="Homna">Homna</option>
                  <option value="Laksam">Laksam</option>
                  <option value="Muradnagar">Muradnagar</option>
                  <option value="Nangalkot">Nangalkot</option>
                  <option value="Comilla Sadar">Comilla Sadar</option>
                  <option value="Meghna">Meghna</option>
                  <option value="Monohargonj">Monohargonj</option>
                  <option value="Sadarsouth">Sadarsouth</option>
                  <option value="Titas">Titas</option>
                  <option value="Burichang">Burichang</option>
                  <option value="Lalmai">Lalmai</option>
                  <option value="Chhagalnaiya">Chhagalnaiya</option>
                  <option value="Feni Sadar">Feni Sadar</option>
                  <option value="Sonagazi">Sonagazi</option>
                  <option value="Fulgazi">Fulgazi</option>
                  <option value="Parshuram">Parshuram</option>
                  <option value="Daganbhuiyan">Daganbhuiyan</option>
                  <option value="Brahmanbaria Sadar">Brahmanbaria Sadar</option>
                  <option value="Kasba">Kasba</option>
                  <option value="Nasirnagar">Nasirnagar</option>
                  <option value="Sarail">Sarail</option>
                  <option value="Ashuganj">Ashuganj</option>
                  <option value="Akhaura">Akhaura</option>
                  <option value="Nabinagar">Nabinagar</option>
                  <option value="Bancharampur">Bancharampur</option>
                  <option value="Bijoynagar">Bijoynagar</option>
                  <option value="Rangamati Sadar">Rangamati Sadar</option>
                  <option value="Kaptai">Kaptai</option>
                  <option value="Kawkhali">Kawkhali</option>
                  <option value="Baghaichari">Baghaichari</option>
                  <option value="Barkal">Barkal</option>
                  <option value="Langadu">Langadu</option>
                  <option value="Rajasthali">Rajasthali</option>
                  <option value="Belaichari">Belaichari</option>
                  <option value="Juraichari">Juraichari</option>
                  <option value="Naniarchar">Naniarchar</option>
                  <option value="Noakhali Sadar">Noakhali Sadar</option>
                  <option value="Companiganj">Companiganj</option>
                  <option value="Begumganj">Begumganj</option>
                  <option value="Hatia">Hatia</option>
                  <option value="Subarnachar">Subarnachar</option>
                  <option value="Kabirhat">Kabirhat</option>
                  <option value="Senbug">Senbug</option>
                  <option value="Chatkhil">Chatkhil</option>
                  <option value="Sonaimori">Sonaimori</option>
                  <option value="Haimchar">Haimchar</option>
                  <option value="Kachua">Kachua</option>
                  <option value="Shahrasti">Shahrasti</option>
                  <option value="Chandpur Sadar">Chandpur Sadar</option>
                  <option value="Matlab South">Matlab South</option>
                  <option value="Hajiganj">Hajiganj</option>
                  <option value="Matlab North">Matlab North</option>
                  <option value="Faridgonj">Faridgonj</option>
                  <option value="Lakshmipur Sadar">Lakshmipur Sadar</option>
                  <option value="Kamalnagar">Kamalnagar</option>
                  <option value="Raipur">Raipur</option>
                  <option value="Ramgati">Ramgati</option>
                  <option value="Ramganj">Ramganj</option>
                  <option value="Rangunia">Rangunia</option>
                  <option value="Sitakunda">Sitakunda</option>
                  <option value="Mirsharai">Mirsharai</option>
                  <option value="Patiya">Patiya</option>
                  <option value="Sandwip">Sandwip</option>
                  <option value="Banshkhali">Banshkhali</option>
                  <option value="Boalkhali">Boalkhali</option>
                  <option value="Anwara">Anwara</option>
                  <option value="Chandanaish">Chandanaish</option>
                  <option value="Satkania">Satkania</option>
                  <option value="Lohagara">Lohagara</option>
                  <option value="Hathazari">Hathazari</option>
                  <option value="Fatikchhari">Fatikchhari</option>
                  <option value="Raozan">Raozan</option>
                  <option value="Karnafuli">Karnafuli</option>
                  <option value="Coxsbazar Sadar">Coxsbazar Sadar</option>
                  <option value="Chakaria">Chakaria</option>
                  <option value="Kutubdia">Kutubdia</option>
                  <option value="Ukhiya">Ukhiya</option>
                  <option value="Moheshkhali">Moheshkhali</option>
                  <option value="Pekua">Pekua</option>
                  <option value="Ramu">Ramu</option>
                  <option value="Teknaf">Teknaf</option>
                  <option value="Khagrachhari Sadar">Khagrachhari Sadar</option>
                  <option value="Dighinala">Dighinala</option>
                  <option value="Panchari">Panchari</option>
                  <option value="Laxmichhari">Laxmichhari</option>
                  <option value="Mohalchari">Mohalchari</option>
                  <option value="Manikchari">Manikchari</option>
                  <option value="Ramgarh">Ramgarh</option>
                  <option value="Matiranga">Matiranga</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-900 w-full rounded-md py-3 text-white btn"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* user */}

      <h1 className="text-center text-green-700 text-3xl font-semibold mb-6">
        Result
      </h1>
      <div className="overflow-x-auto min-h-[46vh]">
        <table className="table rounded-none bg-[#c3b8cbc1]">
          {/* head */}
          <thead>
            <tr>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Name
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Email
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Blood
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                Upazila
              </th>
              <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">
                District
              </th>
            </tr>
          </thead>

          <tbody>
            {results.map((user) => (
              <tr key={user._id}>
                <td className="px-[5px] md:px-3 font-bold text-lg">
                  {user.name}
                </td>
                <td className="px-[5px] md:px-3 font-bold text-lg">
                  {user.email}
                </td>
                <td className="px-[5px] md:px-3 font-bold text-lg">
                  {user.blood}
                </td>
                <td className="px-[5px] md:px-3 font-bold text-lg">
                  {user.upazila}
                </td>
                <td className="px-[5px] md:px-3 font-bold text-lg">
                  {user.dictrict}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Search;
