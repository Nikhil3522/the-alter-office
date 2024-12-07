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
          <div key={post.id} className="post">
            <h3>{post.content}</h3>
            {post.images &&
              post.images.map((url, index) => (
                <img key={index} src={url} alt={`Post ${post.id}`} />
              ))}
            <p>User ID: {post.user_id}</p>
            <p>
              Timestamp:{' '}
              {new Date(post.timestamp.seconds * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteScrollPosts;
