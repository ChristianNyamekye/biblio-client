import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  BackgroundImage,
  Anchor,
  Container,
  Box,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import bookshelf from '../assets/background.png';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isUserCreated, setIsUserCreated] = useState(false);

  const createUser = useStore(({ biblioSlice }) => biblioSlice.createUser);
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

  useEffect(() => {
    if (isUserCreated && currUser.id) {
      navigate(`/profile/${currUser.id}`);
    }
  }, [isUserCreated, currUser, navigate]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onClickRegister = async () => {
    await createUser({
      name, username, email, password,
    });
    setIsUserCreated(true);
  };

  return (
    <BackgroundImage
      src={bookshelf}
      radius="sm"
      style={{
        width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
      }}
    >
      <Box style={{ maxWidth: '100%', marginTop: '3%' }}>
        <Title order={1}
          style={{
            fontSize: '36px', marginBottom: '20px', textAlign: 'center', color: '#3F6BB4',
          }}
        >Swap stories, Share Worlds
        </Title>
      </Box>
      <Container size={1200}
        style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '50px', marginLeft: '40%',
        }}
      >
        <Box style={{ maxWidth: '45%', marginRight: '5%' }}>
          <Title order={1} style={{ fontSize: '26px', marginBottom: '10px' }}>Join Bibilio today!</Title>
          <Text style={{ marginBottom: '20px' }}>Build community, read more, and save money.</Text>
          <ul>
            <li>Thousands of books to choose from.</li>
            <li>Discover stories you never knew about.</li>
            <li>Do your part to be sustainable.</li>
          </ul>
        </Box>
        <Paper radius="md"
          p="xl"
          withBorder
          style={{
            flexGrow: 1,
            maxWidth: '90%',
            padding: '50px',
            backgroundColor: '#ffffff',
          }}
        >
          <Title order={2} align="center" style={{ marginBottom: '20px' }}>Sign up</Title>
          <Text size="sm" align="center" mb="lg">Already Have An Account? <Anchor href="/login" size="sm">Log In</Anchor></Text>
          <TextInput onChange={handleNameChange} label="Full name" required />
          <TextInput onChange={handleUsernameChange} label="Username" required />
          <TextInput onChange={handleEmailChange} label="Email address" required type="email" />
          <TextInput onChange={handlePasswordChange} label="Password" required type="password" description="Your password needs to be at least 8 characters." />
          <Button onClick={onClickRegister} fullWidth mt="lg" color="blue">Create an account</Button>
        </Paper>
      </Container>
    </BackgroundImage>
  );
}

export default Signup;
