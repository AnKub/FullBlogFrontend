import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount = 0,  // Значение по умолчанию
  commentsCount = 0,  // Значение по умолчанию
  tags = [],  // Значение по умолчанию
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  // Показ скелетона при загрузке
  if (isLoading) {
    return <PostSkeleton />;
  }

  // Функция для удаления поста
  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
        className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        src={imageUrl.startsWith('http') ? imageUrl : `http://localhost:4444/${imageUrl}`} 
        alt={title || 'Post image'}
      />
      )}
      <div className={styles.wrapper}>
        {user ? (
          <UserInfo {...user} additionalText={createdAt || 'Unknown date'} />
        ) : (
          <div>User info unavailable</div>  // Обработка отсутствия информации о пользователе
        )}
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title || 'Untitled'}</Link>}
          </h2>
          {tags.length > 0 ? (
            <ul className={styles.tags}>
              {tags.map((name) => (
                <li key={name}>
                  <Link to={`/tag/${name}`}>#{name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>No tags available</div>  // Обработка отсутствия тегов
          )}
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
