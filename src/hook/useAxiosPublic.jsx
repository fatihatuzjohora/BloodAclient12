import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://blood-theta.vercel.app'
    // baseURL: 'https://blood-theta.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;