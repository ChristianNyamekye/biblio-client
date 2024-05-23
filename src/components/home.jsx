<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 900a7c6
import {
  Autocomplete, Select, Title, Container, Loader, Button,
} from '@mantine/core';
import axios from 'axios';
<<<<<<< HEAD
import debounce from 'lodash.debounce';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
=======
import useStore from '../store';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
>>>>>>> 900a7c6

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

<<<<<<< HEAD
  const fetchBooks = useCallback(
    debounce(async (query) => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get('https://project-api-biblio.onrender.com/api/books/search', {
          params: { query },
        });
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
      const response = await axios.get('https://project-api-biblio.onrender.com/api/books/fetchBook', {
        params: { title: `intitle:${lastSearchTerm}` },
      });
      const book = response.data;
      console.log(`RESULTS: ${JSON.stringify(book)}`);
    } finally {
      setLoading(false);
    }
  };

=======
  useEffect(() => {
    if (searchTerm) {
      console.log('Fetching books for:', searchTerm);
      const fetchBooks = async () => {
        try {
          const response = await axios.get('https://project-api-biblio.onrender.com/api/books/search', {
            params: { query: searchTerm },
          });
          const uniqueBooks = filterUniqueBooks(response.data.items || []);
          setSearchResults(uniqueBooks); // Ensure searchResults is always an array
        } catch (error) {
          setSearchResults([]); // Set to empty array on error
        }
      };
      fetchBooks();
    } else {
      setSearchResults([]); // Reset when search term is empty
    }
  }, [searchTerm]);

>>>>>>> 900a7c6
  return (
    <Container style={{ width: '75vw', margin: '0 auto', paddingTop: '5vh' }}>
      <Title order={2} align="center" style={{ marginBottom: '20px' }}>
        Explore a New Book Trade
      </Title>
<<<<<<< HEAD
      <Select
        label="Search By"
        placeholder="Filter"
        data={['Genre', 'Author', 'Condition', 'Length']}
        style={{ marginBottom: '20px' }}
      />
      <Autocomplete
        label="Find Book"
        placeholder="Enter Title"
        data={searchResults.map((book) => ({
          value: book.volumeInfo.title,
          label: book.volumeInfo.title,
          description: book.volumeInfo.authors?.join(', '),
        }))}
        onChange={(value) => { setSearchTerm(value); setLastSearchTerm(value); }}
        rightSection={loading ? <Loader size="sm" /> : null}
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>
=======
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
          onChange={(value) => setSearchTerm(value)}
        />
      </Group>
>>>>>>> 900a7c6
    </Container>
  );
}

export default Home;
