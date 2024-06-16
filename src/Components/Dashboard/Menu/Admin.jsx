
import MenuItem from './MenuItem'

const Admin = () => {
    return (
        <>
      <MenuItem label='User Management' address='all-users' />
      <MenuItem label='All Donation Request' address='all-blood-dontion-request' />
      <MenuItem label='Content Management' address='content-management' />
      
      <MenuItem  label='Create Request' address='create-dontion-request' />
      
      
      

    </>
    );
};

export default Admin;