/* eslint-disable max-len */
import React from 'react';
import {
  Accordion, Container, Stack, Box, Text, Group, Image,
} from '@mantine/core';
import { Bs1Square, Bs2Square, Bs3Square } from 'react-icons/bs';
import aboutImage from '../assets/about.png';

const questions = [
  {
    value: 'What is Biblio?',
    description:
      'Biblio is a dynamic platform that allows users to trade, discover, and connect over books. It helps users save money, encourage more reading, reduce overconsumption, and build a community of book lovers.',
  },
  {
    value: 'How does Biblio work?',
    description:
      'Biblio lets users upload books they want to trade, browse a catalog of books available for trade, and request books from other users. All functionalities are available once users create a profile and log in.',
  },
  {
    value: 'Why should I use Biblio?',
    description:
      'Biblio is a great way to give new life to books that have been sitting around, discover new titles, and connect with fellow readers. It promotes sustainable reading habits and helps build a community.',
  },
  {
    value: 'How do I create an account on Biblio?',
    description:
      'Click on the "Sign Up" button at the top of this page, fill in your details, and follow the instructions to create your profile.',
  },
  {
    value: 'What information do I need to provide to create an account?',
    description:
      'You need to provide a valid email address, a username, and a six or more character password.',
  },
  {
    value: 'How do I log in to my account?',
    description:
      'Click on the "Login" button at the top of this page and enter your registered email and password.',
  },
  {
    value: 'How do I upload a book for trade?',
    description:
      'After logging in, go to your profile and click on "Upload a Book." Provide the book details, such as title, author, genre, and a brief description, then upload an image of the book.',
  },
  {
    value: 'How do I request a book from another user?',
    description:
      'Browse the catalog of available books. When you find a book you are interested in, click on it and select "Request to Trade." You can then propose a book from your collection to exchange.',
  },
  {
    value: 'Is there a limit to the number of books I can upload or trade?',
    description:
      'No, there is no limit to the number of books you can upload or trade on biblio.',
  },
  {
    value: 'How can I search for books on Biblio?',
    description:
      'Use the search bar at the top of the catalog page to filter books by title, author, or genre. You can also use advanced search filters to narrow down your results.',
  },
  {
    value: 'Can I save books I’m interested in?',
    description:
      'Yes, you can save books to your wishlist located in the profile section',
  },
  {
    value: 'What should I do if I encounter an issue with a trade?',
    description:
      'If you encounter any issues with a trade, you can contact our support team through the "Contact" section on your profile page. We will assist you in resolving the issue.',
  },
];

function About() {
  const items = questions.map((item) => (
    <Accordion.Item key={item.value} value={item.value} className="accordion-item">
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container size="lg" style={{ padding: '2rem 0' }}>
      <Box mb="md">
        <div className="how-it-works-title">
          Three Steps to Discovering New Books
        </div>
      </Box>
      <Box style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Image src={aboutImage} alt="Centered About Image" style={{ maxWidth: '40%', height: 'auto' }} />
      </Box>
      <Box style={{
        display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap',
      }}
      >
        <Stack
          align="center"
          justify="flex-start"
          spacing="md"
          style={{ maxWidth: '300px', textAlign: 'center' }}
        >
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Bs1Square size={65} color="#4C6EF5" />
            <Text fw={700} mt="xs">Sign Up and Access</Text>
          </Box>
          <Text size="md">
            Users need to create a profile and log in to access the book exchange features. This step ensures that all participants are genuine and helps in tracking book trades and user activities within the community.
          </Text>
        </Stack>
        <Stack
          align="center"
          justify="flex-start"
          spacing="md"
          style={{ maxWidth: '300px', textAlign: 'center' }}
        >
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Bs2Square size={65} color="#4C6EF5" />
            <Text fw={700} mt="xs">Explore and Discover</Text>
          </Box>
          <Text size="md">
            Once logged in, users can scroll through the extensive catalog of available books. They can use search filters such as genre, author, and title to find books they are interested in. This functionality helps users find specific books or discover new ones to read.
          </Text>
        </Stack>
        <Stack
          align="center"
          justify="flex-start"
          spacing="md"
          style={{ maxWidth: '300px', textAlign: 'center' }}
        >
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Bs3Square size={65} color="#4C6EF5" />
            <Text fw={700} mt="xs">Exchange and Share</Text>
          </Box>
          <Text size="md">
            Users can upload their own books to offer for trade, making them available to the community. When they find a book they like, they can propose a trade to the book owner. This system promotes book sharing and helps users find new reading material while building a sense of community.
          </Text>
        </Stack>
      </Box>
      <Box mt="xl" style={{ paddingBottom: '50px' }}>
        <div className="faq-title">
          Frequently Asked Questions
        </div>
        <Accordion variant="separated">
          {items}
        </Accordion>
      </Box>
    </Container>
  );
}

export default About;
