import InfiniteScrollPosts from './InfiniteScrollPosts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUserData(storedUser);
  };

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div className="container p-4">
      {userData &&
      <div className='flex' onClick={() => navigate('/profile')}>
        <img class="w-[50px] h-[50px] object-cover rounded-full" src={userData.profile}/>
        <div className='ml-3 mt-1'>
          <p className='text-[12.4px] text-gray-500'>Welcome Back,</p>
          <h4>{userData.name}</h4>
        </div>
      </div>}

      <h1 className='font-extrabold text-[24px] leading-[28.06px] mt-6 mb-4'>Feeds</h1>

      <div>
        <InfiniteScrollPosts />
      </div>
    </div>
  );
}

export default Home;