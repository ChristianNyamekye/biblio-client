/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Autocomplete, Select, Image, Text, Group, Title, Container, Stack, Button, List, ThemeIcon, rem,
} from '@mantine/core';
import {
  IconCircleCheck, IconCircleDashed, IconDownload, IconArrowRight, IconUserSearch, IconUserCircle, IconCheck,
} from '@tabler/icons-react';

function Onboarding() {
  return (
    <Container style={{ width: '100vw', margin: '0 auto', paddingTop: '25vh' }}>
      <Group align="center" style={{ justifyContent: 'space-between' }}>
        <Stack
          align="stretch"
          justify="center"
          gap="lg"
          style={{ width: '60%' }}
        >
          <Title>
            Trade, Discover, and Connect over books with ease
          </Title>
          <Text>
            Biblio offers a dynamic platform for users to give new life to books that have been sitting around for a while. Manage your personal book collections, search for and request titles from others, and engage in a vibrant literary community.
          </Text>
          <List
            spacing="sm"
            size="sm"
            icon={(
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            )}
          >
            <List.Item><b>Upload and Trade</b> - List your books for others to discover and trade</List.Item>
            <List.Item><b>Search and Discover</b> - Find and request books from other users</List.Item>
            <List.Item><b>Save and Explore</b> - Receive recommendations, save money, and try a wide range of books</List.Item>
            <List.Item><b>Community Collection</b> - Connect with fellow readers for discussions and meet-ups</List.Item>
          </List>
          <Group justify="left">
            <Link to="/login">
              <Button leftSection={<IconUserSearch size={14} />}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="light"
                leftSection={<IconUserCircle size={14} />}
                rightSection={<IconArrowRight size={14} />}
              >
                Sign Up
              </Button>
            </Link>
          </Group>
        </Stack>
      </Group>
    </Container>
  );
}

export default Onboarding;
