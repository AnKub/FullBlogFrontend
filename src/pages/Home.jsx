import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Tabs
        value={0}
        aria-label="basic tabs example"
        sx={{
          marginBottom: 15,
          '& .MuiTab-root': {
            color: '#d1e8e2',
          },
          '& .Mui-selected': {
            color: '#D9B08C',
          },
        }}
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {(isPostsLoading ? [...Array(5)] : posts.items || []).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              obj && obj._id ? (
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.commentsCount || 0}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              ) : (
                <div key={index}>Invalid post data</div>
              )
            )
          )}
        </Grid>
        <Grid item xs={4}>
          {tags.items && tags.items.length > 0 ? (
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          ) : (
            <TagsBlock items={[]} isLoading={isTagsLoading} />
          )}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Carrot Power',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Some comment HOHo',
              },
              {
                user: {
                  fullName: 'Altos Dream',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
