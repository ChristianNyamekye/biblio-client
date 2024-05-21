import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Group,
  Anchor,
  Container,
} from '@mantine/core';
import useStore from '../store';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = useStore(({ biblioSlice }) => biblioSlice.createUser);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onClickRegister = () => {
    createUser({
      name, username, email, password,
    });
    console.log('creating user');
  };

  return (
    <Container size={800} style={{ paddingTop: '5vh' }}>
      <Group position="apart" style={{ marginBottom: 50 }}>
        <div>
          <Title order={1}>Join Bibilio today!</Title>
          <Text>Build community, read more, and save money.</Text>
          <ul>
            <li>Thousands of books to choose from.</li>
            <li>Discover stories you never knew about.</li>
            <li>Do your part to be sustainable.</li>
          </ul>
        </div>
        <Paper radius="md" p="xl" withBorder style={{ minWidth: 360 }}>
          <Title order={2} align="center">
            Sign up
          </Title>
          <Text size="sm" align="center" mb="lg">
            Already Have An Account?{' '}
            <Anchor href="/login" size="sm">
              Log In
            </Anchor>
          </Text>
          <TextInput
            onChange={handleNameChange}
            label="Full name"
            required
          />
          <TextInput
            onChange={handleUsernameChange}
            label="Username"
            required
          />
          <TextInput
            onChange={handleEmailChange}
            label="Email address"
            required
            type="email"
          />
          <TextInput
            onChange={handlePasswordChange}
            label="Password"
            required
            type="password"
            description="Your password needs to be at least 8 characters."
          />
          <Button
            onClick={onClickRegister}
            fullWidth
            mt="lg"
            color="indigo"
          >
            Create an account
          </Button>
        </Paper>
      </Group>
    </Container>
  );
}

export default Signup;
