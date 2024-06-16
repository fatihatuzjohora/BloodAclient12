import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
const useRole = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: data = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`)
     console.log(data);
      return data
    },
  })

  //   Fetch user info using logged in user email

  return [data, isLoading]
}

export default useRole