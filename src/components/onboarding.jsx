/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Text, Group, Title, Container, Stack, Button, List, ThemeIcon, rem, Box, Image,
} from '@mantine/core';
import {
  IconArrowRight, IconUserSearch, IconUserCircle, IconCheck,
} from '@tabler/icons-react';
import onboardImage from '../assets/onboarding.png';

function Onboarding() {
  return (
    <Container size="lg"
      style={{
        paddingTop: '15vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Group
        align="center"
        noWrap
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        }}
      >
        <Stack
          align="stretch"
          justify="center"
          spacing="lg"
          style={{ width: '55%' }}
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
              <ThemeIcon color="indigo" size={20} radius="xl">
                <IconCheck style={{ width: '12px', height: '12px' }} stroke={1.5} />
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
              <Button
                color="indigo"
                leftIcon={<IconUserSearch size={18} />}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="light"
                leftIcon={<IconUserCircle size={18} />}
                rightIcon={<IconArrowRight size={18} />}
                color="indigo"
              >
                Sign Up
              </Button>
            </Link>
          </Group>
        </Stack>
        <Box style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40%',
        }}
        >
          <Image src={onboardImage} alt="Centered About Image" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Group>
    </Container>
  );
}

export default Onboarding;
