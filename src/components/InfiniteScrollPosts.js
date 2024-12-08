import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs, getDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase.utils'; // Adjust to your Firebase config file
import InfiniteScroll from 'react-infinite-scroll-component';

function InfiniteScrollPosts() {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    console.log("posts", posts);
  }, [posts])

  const fetchPosts = async (isInitial = false) => {
    try {
      const postsRef = collection(firestore, 'posts');
      const postsQuery = isInitial
        ? query(postsRef, orderBy('timestamp', 'desc'), limit(20))
        : query(postsRef, orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(20));
  
      const querySnapshot = await getDocs(postsQuery);
  
      if (querySnapshot.empty) {
        setHasMore(false);
        return;
      }
  
      const newPosts = [];
  
      for (const postDoc of querySnapshot.docs) {
        const postData = {
          id: postDoc.id,
          ...postDoc.data(),
        };
  
        // Fetch user details using the user_id from the post
        const userRef = doc(firestore, 'users', postData.user_id);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          postData.userDetails = userDoc.data(); // Add user data to the post
        } else {
          console.warn(`User with ID ${postData.user_id} not found.`);
        }
  
        newPosts.push(postData);
      }
  
      setPosts(prevPosts => (isInitial ? newPosts : [...prevPosts, ...newPosts]));
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Update lastVisible document
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(true); // Fetch initial 20 posts
  }, []);

  function timeAgo(timestamp) {
    const current = Date.now();
    const diff = current - timestamp;
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  }

  return (
    <InfiniteScroll
      dataLength={posts.length} // Number of items already loaded
      next={() => fetchPosts(false)} // Function to load more items
      hasMore={hasMore} // Boolean to show loader or end message
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}>You have seen it all!</p>}
    >
      <div className="posts">
        {posts.map(post => (
          <div key={post.id} className="post my-2 p-3 rounded-[20px]">
            <div className='creator-info flex gap-x-[10px]'>
              <img className="w-[40px] h-[40px] object-cover rounded-full"
                src={post.userDetails.profile} />
              <div>
                <p>{post.userDetails.name}</p>
                <p className='text-[10px] text-gray-500'>{timeAgo(post.timestamp)}</p>
              </div>
            </div>
            <h3 className='my-3'>{post.content}</h3>
            <div className='post-image-container'>
              {post.assets &&
                post.assets.map((url, index) => (
                  <img key={index} src={process.env.REACT_APP_IMAGE_PREFIX+url} alt={`Post ${post.id}`} />
                ))}
            </div>
            <div className='mt-2 flex justify-between'>
              <button>67</button>
              <button className='bg-[#0000001A] h-[32px] w-[92px] rounded-[30px] font-bold'>Share</button>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteScrollPosts;
