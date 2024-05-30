import React, { useState, useEffect } from 'react';
import {
  TextInput, Button, Paper, Title, Text, BackgroundImage, Anchor,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import loginPic from '../assets/log-in.png';

function Login() {
  const loginUser = useStore(({ biblioSlice }) => biblioSlice.loginUser);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = async () => {
    await loginUser({ email, password });
    setIsUserLoggedIn(true);
  };

  useEffect(() => {
    if (isUserLoggedIn && currUser.user.id) {
      navigate(`/profile/${currUser.user.id}`);
    }
  }, [isUserLoggedIn, currUser, navigate]);

  return (
    <BackgroundImage
      src={loginPic}
      radius="sm"
      style={{
        width: 'auto',
        height: '84vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Paper
        radius="md"
        p="xl"
        withBorder
        style={{ minWidth: 700, maxWidth: 800, minHeight: 300 }}
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
        <Button fullWidth mt="md" mb="md" color="indigo" onClick={onClickLogin}>
          Log in
        </Button>

        <Text align="center" size="sm">
          New to Biblio?  <Anchor href="/signup" size="sm">Sign up here!</Anchor>
        </Text>
      </Paper>
    </BackgroundImage>
  );
}

export default Login;
