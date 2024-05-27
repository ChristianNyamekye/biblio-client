import React, { useState, useEffect, useCallback } from 'react';
import {
  Autocomplete,
  Select,
  Title,
  Container,
  Loader,
  Button,
  Group,
  Text,
  Card,
  Image,
  SimpleGrid,
} from '@mantine/core';
import axios, { all } from 'axios';
import debounce from 'lodash.debounce';
import { IconCirclePlus, IconHeart, IconTrash } from '@tabler/icons-react';
import useStore from '../store';
import BookModal from './bookModal';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchAllBooks = useStore(({ biblioSlice }) => biblioSlice.fetchAllBooks);
  const allBooks = useStore(({ biblioSlice }) => biblioSlice.allBooks);

  const sendTradeRequest = useStore(({ biblioSlice }) => biblioSlice.sendTradeRequest);
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

  // console.log('home', currUser.id);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  // console.log(allBooks);

  const filterUniqueBooks = (books) => {
    const seenTitles = new Set();
    return books.filter(({ volumeInfo: { title } }) => {
      if (seenTitles.has(title)) {
        return false;
      }
      seenTitles.add(title);
      return true;
    });
  };

  const fetchBooks = useCallback(
    debounce(async (query) => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get(
          'https://project-api-biblio.onrender.com/api/books/search',
          {
            params: { query },
          },
        );
        const uniqueBooks = filterUniqueBooks(response.data.items || []);
        setSearchResults(uniqueBooks);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://project-api-biblio.onrender.com/api/books/fetchBook',
        {
          params: { title: `intitle:${lastSearchTerm}` },
        },
      );
      const book = response.data;
      console.log(`RESULTS: ${JSON.stringify(book)}`);
    } finally {
      setLoading(false);
    }
  };

  const [bookDetailsOpened, setBookDetailsOpened] = useState(false);

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setBookDetailsOpened(true);
  };

  return (
    <div>
      <Container style={{ width: '75vw', margin: '0 auto', paddingTop: '5vh' }}>
        <Title order={2} align="center" style={{ marginBottom: '20px' }}>
          Explore a New Book Trade
        </Title>
        <Group style={{ display: 'flex', gap: '10px' }}>
          <Select
            label="Search By"
            placeholder="Filter"
            data={['Genre', 'Author', 'Condition', 'Length']}
            style={{ flex: 1 }}
          />
          <Autocomplete
            label="Find Book"
            placeholder="Enter Title or Author"
            data={searchResults.map((book) => ({
              value: book.volumeInfo.title,
              label: book.volumeInfo.title,
              description: book.volumeInfo.authors?.join(', '),
            }))}
            onChange={(value) => {
              setSearchTerm(value);
              setLastSearchTerm(value);
            }}
            rightSection={loading ? <Loader size="sm" /> : null}
            style={{ flex: 3 }}
          />
          <Button
            onClick={handleSubmit}
            color="indigo"
            disabled={loading}
            style={{ flex: 1, marginTop: '20px' }}
          >
            Submit
          </Button>
        </Group>
      </Container>

      <div className="library-card-holder">
        {allBooks.map((book) => (
          <Card
            key={book.id}
            shadow="sm"
            padding="lg"
            radius="md"
            className="post-card"
          >
            <Card.Section>
              <Image
                src={book.coverImage}
                height={300}
                width={0}
                alt={book.title}
              />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text fw={500}>{book.title}</Text>
            </Group>
            <Text size="sm" c="dimmed">
              {book.author}
            </Text>
            <SimpleGrid cols={1}>
              <Button
                color="indigo"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => handleViewBook(book)}
              >
                View Book
              </Button>
            </SimpleGrid>
          </Card>
        ))}
      </div>
      <BookModal
        opened={bookDetailsOpened}
        onClose={() => setBookDetailsOpened(false)}
        book={selectedBook}
      />
    </div>
  );
}

export default Home;
