import React, { useState, useEffect } from 'react';
import {
  Autocomplete, Select, Text, Group, Title, Container,
} from '@mantine/core';
import axios from 'axios';
import useStore from '../store';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
          onChange={(value) => setSearchTerm(value)}
        />
      </Group>
    </Container>
  );
}

export default Home;
