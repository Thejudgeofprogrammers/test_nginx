import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText } from '@mui/material';


import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export interface MessageDTO {
  text: {
    date: number;
    data: {
      content: string;
    };
  };
}

interface IMessageDTO {
  message: MessageDTO;
}

// Стили для контейнера сообщений и поля ввода
const ChatContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
  width: '100%',
  padding: '16px',
  border: '1px solid #cccccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
});

const MessageList = styled(List)({
  flexGrow: 1,
  overflowY: 'auto',
  marginBottom: '16px',
  paddingRight: '16px',
});

const InputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderTop: '1px solid #ccc',
  backgroundColor: '#fff',
});

const CustomTextField = styled(TextField)({
  flexGrow: 1,
  marginRight: '8px',
});

const MessageBubble = styled(Paper)({
  padding: '8px 12px',
  borderRadius: '16px',
  maxWidth: '60%',
  wordWrap: 'break-word',
  backgroundColor: '#e1ffc7',
});

const DateText = styled(Typography)({
  fontSize: '0.75rem',
  color: '#888',
  marginTop: '4px',
});

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
      fetchPosts();
      setContent('');
    } catch (error) {
      console.error('Ошибка при отправке данных', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get<IMessageDTO[]>('http://localhost:8080/api/post');
      console.log('GET response:', response.data);
      setPosts(response.data || []);
    } catch (error) {
      console.error('Ошибка при получении данных', error);
    }
  };

  const deleteAllPosts = async () => {
    try {
      await axios.delete('http://localhost:8080/api/post');
      setPosts([]);
    } catch (error) {
      console.error('Ошибка при удалении данных', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ChatContainer>
      <MessageList>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <ListItem key={index}>
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <MessageBubble elevation={2}>
                  <Typography>{post?.message?.text?.data?.content || 'Нет содержимого'}</Typography>
                </MessageBubble>
                <DateText>{new Date(post?.message?.text?.date).toLocaleString()}</DateText>
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Посты не найдены" />
          </ListItem>
        )}
      </MessageList>
      <InputContainer>
        <CustomTextField
          variant="outlined"
          placeholder="Введите сообщение"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Отправить
        </Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default PostComponent;