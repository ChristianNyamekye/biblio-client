import React, { useState, useEffect } from 'react';
import {
  TextInput, Button, Paper, Title, Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

function Login() {
  const loginUser = useStore(({ biblioSlice }) => biblioSlice.loginUser);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);
  console.log('login', currUser);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = async () => {
    await loginUser({ email, password });
    setIsUserLoggedIn(true);
    console.log('logging in user');
  };

  useEffect(() => {
    if (isUserLoggedIn && currUser.user.id) {
      navigate(`/profile/${currUser.user.id}`);
    }
  }, [isUserLoggedIn, currUser, navigate]);

  return (
    <Paper radius="md"
      p="xl"
      withBorder
      style={{
        maxWidth: 800, margin: 'auto', marginTop: 100, minHeight: 300,
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
  );
}

export default Login;
