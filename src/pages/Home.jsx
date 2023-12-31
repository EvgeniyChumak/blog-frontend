import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPopularPosts, fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const [activeTab, setActiveTab] = useState('new');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    if (activeTab === 'new') {
      dispatch(fetchPosts());
    } else if (activeTab === 'popular') {
      dispatch(fetchPopularPosts());
    }
    dispatch(fetchTags());
  }, [activeTab]);

  console.log(posts);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} aria-label="basic tabs example">
        <Tab label="Новые" value="new" />
        <Tab label="Популярные" value="popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          {/* <TagsBlock items={tags.items} isLoading={isTagsLoading} /> */}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Yevhen CHumak',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Chumak Yevhen',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};