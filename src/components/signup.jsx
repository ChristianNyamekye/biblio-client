import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Anchor,
  Container,
  Box,
  Image,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import signImage from '../assets/sign-up.png';

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
    <Container size="lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '84vh',
      }}
    >
      <Box style={{ textAlign: 'center', marginTop: '40px' }}>
        <Title order={1} style={{ fontSize: '30px', marginBottom: '10px' }}>Join bibilio today!</Title>
        <Text>Build community, read more, and save money.</Text>
      </Box>
      <Container size={1200}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px',
        }}
      >
        <Box style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40%',
          marginRight: '100px',
        }}
        >
          <Image src={signImage} alt="Centered About Image" style={{ maxWidth: '100%', height: 'auto' }} />
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
          <Button onClick={onClickRegister} fullWidth mt="lg" color="indigo">Create an account</Button>
        </Paper>
      </Container>
    </Container>
  );
}

export default Signup;
