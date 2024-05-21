import React from 'react';
import {
  TextInput, Button, Checkbox, Group, Paper, Title, Text,
} from '@mantine/core';
import {
  IconBrandApple, IconBrandFacebook, IconBrandSpotify, IconBrandGoogle,
} from '@tabler/icons-react';

function Login() {
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
        label="Email address"
        placeholder="Enter your email"
        required
        type="email"
        mb="md"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        required
        type="password"
        mb="md"
      />
      <Button fullWidth mt="md" mb="md">Log in</Button>
      {/* <Group position="center" mt="md" mb="xl">
        <Button variant="default" radius="xl"><IconBrandApple size={24} /></Button>
        <Button variant="default" radius="xl"><IconBrandFacebook size={24} /></Button>
        <Button variant="default" radius="xl"><IconBrandGoogle size={24} /></Button>
      </Group> */}
      <Text align="center" size="sm">
        New to Biblio? <Text component="a" href="/signup" size="sm" weight={500} color="yellow">Sign up here!</Text>
      </Text>
    </Paper>
  );
}

export default Login;
