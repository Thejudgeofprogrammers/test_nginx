import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert, List, ListItem, ListItemText } from '@mui/material';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [posts, setPosts] = useState<Array<{ content: string, date: string }>>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Создаем объект данных для отправки на сервер
    const postData = {
        message: {
          text: {
            date: Date.now(),
            data: {
              content: content
            }
          }
        }
      };

      try {
        const res: any = await axios.post('http://localhost:8080/api/post', postData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        console.log(res.data); // Проверьте структуру ответа
      
        const newPost = {
          content: res.data.data.message.text.data.content, // Убедитесь, что путь к данным корректен
          date: new Date(res.data.data.message.text.date).toLocaleString()
        };
      
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setResponse('Post submitted successfully!');
        setSnackbarSeverity('success');
      } catch (error) {
        setResponse('Error submitting post');
        setSnackbarSeverity('error');
        console.error(error);
      }
      

    setContent(''); // Очищаем поле ввода после отправки
    setOpenSnackbar(true); // Открываем Snackbar
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Submit a New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {response}
          </Alert>
        </Snackbar>
      </Box>

      {/* Список постов */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Posts
        </Typography>
        <List>
          {posts.map((post, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={post.content}
                secondary={`Posted on: ${post.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default PostForm;
