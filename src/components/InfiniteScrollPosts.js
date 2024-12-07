import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase.utils'; // Adjust to your Firebase config file
import InfiniteScroll from 'react-infinite-scroll-component';

function InfiniteScrollPosts() {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

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

      const newPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(prevPosts => (isInitial ? newPosts : [...prevPosts, ...newPosts]));
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Update lastVisible document
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(true); // Fetch initial 20 posts
  }, []);

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
                src="https://ca-times.brightspotcdn.com/dims4/default/48ac18e/2147483647/strip/true/crop/4718x3604+0+0/resize/1200x917!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffd%2F21%2F3491434e446c83711360a43f6978%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-09.jpg" />
              <div>
                <p>Nikhil</p>
                <p className='text-[10px] text-gray-500'>2 Hours ago</p>
              </div>
            </div>
            <h3 className='my-3'>{post.content}</h3>
            <div className='post-image-container'>
              {post.assets &&
                post.assets.map((url, index) => (
                  <img key={index} src={url} alt={`Post ${post.id}`} />
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
