import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Trouble with download');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    // Проверка длины текста
    if (text.length < 10) {
      alert('Text must be at least 10 characters long.');
      return;
    }

    try {
      setLoading(true);

      // Разделение строки тегов на массив
      const tagsArray = tags.split(',').map(tag => tag.trim());

      const fields = {
        title,
        imageUrl: imageUrl || null, // Убедитесь, что imageUrl либо строка, либо null
        tags: tagsArray, // Убедитесь, что это массив
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err.response ? err.response.data : err);
      alert('Trouble with creating');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch(err => {
          console.warn(err);
          alert('Error trying to get');
        });
    }
  }, [id]);

  const options = React.useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autofocus: true,
    placeholder: 'Enter text...',
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
      uniqueId: "post-content", // Добавлено уникальное значение
    },
  }), []);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Download preview...
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <form onSubmit={onSubmit}>
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Tags"
          fullWidth
        />
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button type="submit" disabled={isLoading} size="large" variant="contained">
            {isLoading ? 'Save...' : 'Publish'}
          </Button>
          <a href="/">
            <Button size="large">Cancel</Button>
          </a>
        </div>
      </form>
    </Paper>
  );
};
