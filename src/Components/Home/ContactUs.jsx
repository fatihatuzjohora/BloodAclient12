
const ContactUs = () => {
   
const handleSubmit = () => {
    console.log('jdwjh');
}

    return (
        <div className='hero h-full  rounded-lg md:mb-14 bg-[#7b0743d9] my-5 p-5'>
        <div className="hero-content w-full p-0 flex-col lg:flex-row">
        <div className=' flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2  rounded-lg '>
            <h1 className="text-5xl font-bold text-white pb-2">Contact Us!</h1>
            <p className="text-left text-white font-semibold">01956230265</p>
            <p className="text-white font-semibold">asfaqurrahman055@gmail.com</p>
           
          </div>
          <form  
             onSubmit={handleSubmit} className='w-full lg:w-1/2 space-y-6 bg-[#f58b2074] p-8 rounded-md'
          >
            <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>

            <div>
              <label htmlFor='massage' className='block mb-2 text-sm'>
                Your massage
              </label>
              {/* lg */}
<textarea placeholder="your massage" className="textarea textarea-bordered textarea-lg w-full " ></textarea>
            </div>
<button className="btn btn-info">Send Massage</button>
            </div> 
          </form>
          
        </div>
      </div>
    );
};

export default ContactUs;