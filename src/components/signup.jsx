import React from 'react';
import {
  TextInput, Button, Checkbox, Paper, Title, Text, Group, Anchor, Container,
} from '@mantine/core';
import {
  IconBrandFacebook, IconBrandGoogle, IconBrandApple,
} from '@tabler/icons-react';

function Signup() {
  return (
    <Container size={800} style={{ paddingTop: '5vh' }}>
      <Group position="apart" style={{ marginBottom: 50 }}>
        <div>
          <Title order={1}>
            Join Bibilio today!
          </Title>
          <Text>
            Build community, read more, and save money.
          </Text>
          <ul>
            <li>
              Thousands of books to choose from.
            </li>
            <li>
              Discover stories you never knew about.
            </li>
            <li>
              Do your part to be sustainable.
            </li>
          </ul>
        </div>
        <Paper radius="md" p="xl" withBorder style={{ minWidth: 360 }}>
          <Title order={2} align="center">
            Sign up
          </Title>
          <Text size="sm" align="center" mb="lg">
            Already Have An Account? <Anchor href="/login" size="sm">Log In</Anchor>
          </Text>
          <TextInput label="First name" required />
          <TextInput label="Last name" required />
          <TextInput label="Email address" required type="email" />
          <TextInput label="Password" required type="password" description="Your password needs to be at least 8 characters." />
          <Button fullWidth mt="lg">
            Create an account
          </Button>
        </Paper>
      </Group>
    </Container>
  );
}

export default Signup;
