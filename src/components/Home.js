import userIcon from '../assets/icons/user.png';
import InfiniteScrollPosts from './InfiniteScrollPosts';

function Home() {

  return (
    <div className="container p-4">
      <div className='flex'>
        <img src={userIcon}/>
        <div>
          <p className='text-[12px]'>Welcome Back</p>
          <h4>Nikhil jha</h4>
        </div>
      </div>
      <div>
        <InfiniteScrollPosts />
      </div>
    </div>
  );
}

export default Home;