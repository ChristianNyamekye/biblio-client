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
} from '@mantine/core';
import axios from 'axios';
import debounce from 'lodash.debounce';
import useStore from '../store/biblio-store_slice';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
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
  );
}

export default Home;
