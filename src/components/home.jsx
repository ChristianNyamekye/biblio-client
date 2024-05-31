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
import debounce from 'lodash.debounce';
import useStore from '../store';
import BookModal from './bookModal';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchAllBooks = useStore(({ biblioSlice }) => biblioSlice.fetchAllBooks);
  const allBooks = useStore(({ biblioSlice }) => biblioSlice.allBooks);

  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);
  const filteredBooks = allBooks.filter((book) => book.owner !== currUser.id);

  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);

  const filterUniqueBooks = useCallback(
    debounce((query) => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const results = filteredBooks.filter(
          (book) => book.title.toLowerCase().includes(query.toLowerCase())
            || book.author.toLowerCase().includes(query.toLowerCase()),
        );
        const uniqueResults = Array.from(
          new Set(results.map((book) => book.title)),
        ).map((title) => results.find((book) => book.title === title));
        setSearchResults(uniqueResults);
      } finally {
        setLoading(false);
      }
    }, 300),
    [allBooks],
  );

  useEffect(() => {
    filterUniqueBooks(searchTerm);
  }, [searchTerm, filterUniqueBooks]);

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
              value: book.title || 'Unknown Title',
              label: book.title || 'Unknown Title',
              description: book.author || 'No authors listed',
            }))}
            onChange={(value) => setSearchTerm(value)}
            rightSection={loading ? <Loader size="sm" /> : null}
            style={{ flex: 3 }}
          />
        </Group>
      </Container>

      <div className="library-card-holder">
        {(searchResults.length > 0 ? searchResults : filteredBooks).map((book) => (
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
        tradable
      />
    </div>
  );
}

export default Home;
