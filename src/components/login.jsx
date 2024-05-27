import React, { useState, useEffect } from 'react';
import {
  TextInput, Button, Paper, Title, Text, BackgroundImage,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import loginPic from '../assets/log-in.png';

function Login() {
  const loginUser = useStore(({ biblioSlice }) => biblioSlice.loginUser);
  const authenticated = useStore(({ biblioSlice }) => biblioSlice.authenticated);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);
  console.log('login', currUser);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const onClickLogin = async () => {
    const userInfo = { email, password };
    try {
      await loginUser(userInfo);
      navigate(`/profile/${currUser.id}`);
    } catch {
      setErrorMessage('Failed to login into account. Please try again.');
    }
  };

  return (
    <BackgroundImage
      src={loginPic}
      radius="sm"
      style={{
        width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
      }}
    >

      <Paper radius="md"
        p="xl"
        withBorder
        style={{
          minWidth: 700, maxWidth: 800, margin: 'auto', marginTop: 200, minHeight: 300,
        }}
      >
        <Title order={2} align="center" mb="xl" style={{ fontSize: '32px' }}>
          Log in
        </Title>
        <TextInput
          onChange={handleEmailChange}
          label="Email address"
          placeholder="Enter your email"
          required
          type="email"
          mb="md"
        />
        <TextInput
          onChange={handlePasswordChange}
          label="Password"
          placeholder="Enter your password"
          required
          type="password"
          mb="md"
        />
        {errorMessage && (
        <Text color="red" mb="md" align="center">
          {errorMessage}
        </Text>
        )}
        <Button
          fullWidth
          mt="md"
          mb="md"
          color="indigo"
          onClick={onClickLogin}
        >
          Log in
        </Button>

        <Text align="center" size="sm">
          New to Biblio? <Text component="a" href="/signup" size="sm" weight={500} color="indigo">Sign up here!</Text>
        </Text>
      </Paper>
    </BackgroundImage>
  );
}

export default Login;
