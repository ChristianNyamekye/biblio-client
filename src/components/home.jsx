import React, { useState, useEffect, useCallback } from 'react';
import {
  Autocomplete, Select, Text, Group, Title, Container, Loader, Button,
} from '@mantine/core';
import axios from 'axios';
import debounce from 'lodash.debounce';
import useStore from '../store';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError(null);
      try {
        const response = await axios.get('https://project-api-biblio.onrender.com/api/books/search', {
          params: { query },
        });
        const uniqueBooks = filterUniqueBooks(response.data.items || []);
        setSearchResults(uniqueBooks);
      } catch (err) {
        setError('Error fetching books as user searches');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm, fetchBooks]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: { q: `intitle:${lastSearchTerm}` }, // use the last search after clicking submit
      });
      const book = response.data.items[0]; // fetch first in the list
      console.log(`RESULTS: ${JSON.stringify(book)}`);
    } catch (err) {
      setError('Error fetching book');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    console.log(`last search term ${value}`);
    setLastSearchTerm(value);
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
          style={{ flex: 3 }}
          onChange={handleSearchTermChange}
          rightSection={loading ? <Loader size="sm" /> : null}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </Group>
    </Container>
  );
}

export default Home;
