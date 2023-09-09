import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByTag } from '../redux/slices/posts';
import { Post } from '../components/Post';

function TagPosts({ match }) {
  const dispatch = useDispatch();
  const { tag } = match.params;
  const { posts } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPostsByTag(tag));
  }, [dispatch, tag]);

  return (
    <div>
      <h1>Посты с тегом "{tag}"</h1>
      {posts.items.map((obj, index) => (
        <Post
          key={index}
          id={obj._id}
          title={obj.title}
          imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
          user={obj.user}
          createdAt={obj.createdAt}
          viewsCount={obj.viewsCount}
          commentsCount={3}
          tags={obj.tags}
          // Другие свойства для отображения постов с тегами
        />
      ))}
    </div>
  );
}

export default TagPosts;
