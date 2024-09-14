// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Typography, TextField, Button, Box, Snackbar, Alert, List, ListItem, ListItemText } from '@mui/material';

// interface PostData {
//   message: {
//     text: {
//       date: number;
//       data: {
//         content: string;
//       };
//     };
//   };
// }

// interface IApiResponse {
//   data: PostData[];
//   map: any
// };


// const PostForm = () => {
//   const [content, setContent] = useState('');
//   const [response, setResponse] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const [posts, setPosts] = useState<Array<{ content: string, date: string }>>([]);

//   // Функция для загрузки постов с сервера
//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get<IApiResponse>('http://localhost:8080/api/posts');
//       const fetchedPosts = res.data.map((post: PostData) => ({
//         content: post.message.text.data.content,
//         date: new Date(post.message.text.date).toLocaleString(),
//       }));
  
//       setPosts(fetchedPosts);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(); // Загружаем посты при монтировании компонента
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const postData = {
//       message: {
//         text: {
//           date: Date.now(),
//           data: {
//             content: content
//           }
//         }
//       }
//     };

//     try {
//       const res: any = await axios.post('http://localhost:8080/api/post', postData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const newPost = {
//         content: res.data.data.message.text.data.content,
//         date: new Date(res.data.data.message.text.date).toLocaleString(),
//       };

//       setPosts((prevPosts) => [...prevPosts, newPost]);
//       setResponse('Post submitted successfully!');
//       setSnackbarSeverity('success');
//     } catch (error) {
//       setResponse('Error submitting post');
//       setSnackbarSeverity('error');
//       console.error(error);
//     }

//     setContent('');
//     setOpenSnackbar(true);
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ marginTop: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Submit a New Post
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ marginBottom: 2 }}>
//             <TextField
//               label="Content"
//               variant="outlined"
//               multiline
//               rows={4}
//               fullWidth
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               required
//             />
//           </Box>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//         >
//           <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//             {response}
//           </Alert>
//         </Snackbar>
//       </Box>

//       {/* Список постов */}
//       <Box sx={{ marginTop: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Posts
//         </Typography>
//         <List>
//           {posts.map((post, index) => (
//             <ListItem key={index}>
//               <ListItemText
//                 primary={post.content}
//                 secondary={`Posted on: ${post.date}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Container>
//   );
// };

// export default PostForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface MessageDTO {
  text: {
    date: number;
    data: {
      content: string;
    };
  };
}

interface IMessageDTO {
  message: MessageDTO
}

const PostComponent: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [posts, setPosts] = useState<IMessageDTO[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: IMessageDTO = {
      message: {
        text: {
          date: Date.now(),
          data: {
            content
          }
        }
      }
    };

    try {
      const response = await axios.post('http://localhost:8080/api/post', { message: postData });
      console.log('POST response:', response.data);
      fetchPosts(); // После отправки данных обновляем список постов
    } catch (error) {
      console.error('Ошибка при отправке данных', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get<IMessageDTO[]>('http://localhost:8080/api/post');
      console.log('GET response:', response.data); // Логируем полученные данные
      setPosts(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных', error);
    }
  };

  const deleteAllPosts = async () => {
    await axios.delete('http://localhost:8080/api/post');
    setPosts([]);
  };

  useEffect(() => {
    fetchPosts(); // Загружаем посты при первом рендере
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Введите сообщение" 
        />
        <button type="submit">Отправить</button>
      </form>
      <button onClick={deleteAllPosts}>Удалить все посты</button>
      <div>
        <h2>Полученные посты:</h2>
          <ul>
            {posts.map((post, index) => (
            <li key={index}>
              {post?.message?.text?.date ? (
                <>
                  <p>Дата: {new Date(post.message.text.date).toLocaleString()}</p>
                  <p>Сообщение: {post.message.text.data.content}</p>
                </>
              ) : (
                <p>Некорректные данные</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostComponent;
