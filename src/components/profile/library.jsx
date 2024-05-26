/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Text,
  Button,
  Modal,
  Select,
  Card,
  Image,
  SimpleGrid,
  Autocomplete,
  Group,
} from '@mantine/core';
import { IconCirclePlus, IconHeart, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import BookModal from '../bookModal';
import useStore from '../../store';

function Library({ userId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchUserBooks = useStore(
    ({ biblioSlice }) => biblioSlice.fetchUserBooks,
  );
  const currUserBooks = useStore(
    ({ biblioSlice }) => biblioSlice.currUserBooks,
  );

  console.log('books in lib', currUserBooks);

  // const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
  const ROOT_URL = 'http://localhost:9090/api';

  useEffect(() => {
    fetchUserBooks(userId);
  }, []);

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
          const response = await axios.get(
            'https://project-api-biblio.onrender.com/api/books/search',
            {
              params: { query: searchTerm },
            },
          );
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

  const handleAddBook = async () => {
    if (selectedBook) {
      console.log('selectedBook', selectedBook);
      try {
        const bookDetails = {
          title: selectedBook.volumeInfo.title,
          author: selectedBook.volumeInfo.authors.join(', '),
          genre: selectedBook.volumeInfo.categories?.[0] || 'Unknown',
          description: selectedBook.volumeInfo.description,
          rating: selectedBook.volumeInfo.averageRating || 0,
          readingTime: `${selectedBook.volumeInfo.pageCount} pages`,
          condition: 'New',
          datePublished: selectedBook.volumeInfo.publishedDate,
          coverImage:
            selectedBook.volumeInfo.imageLinks?.thumbnail
            || 'No Image Available',
          owner: userId,
          ISBN:
            selectedBook.volumeInfo.industryIdentifiers?.[0]?.identifier
            || 'Unknown',
          tradeStatus: 'available',
        };
        console.log('userid:', userId);
        console.log('details:', bookDetails);
        const response = await axios.post(
          'https://project-api-biblio.onrender.com/api/books',
          // 'http://localhost:9090/api/books',
          {
            userId,
            bookDetails,
          },
        );
        console.log('Book added:', response.data);
        fetchUserBooks(userId);
        close();
      } catch (error) {
        console.error('Error adding book:', error);
      }
    } else {
      alert('Please select a book to add.');
    }
  };

  const [bookDetailsOpened, setBookDetailsOpened] = useState(false);

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${ROOT_URL}/books/${bookId}`);
      fetchUserBooks(userId); // Re-fetch user's books after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setBookDetailsOpened(true);
  };

  return (
    <div className="center-dash">
      <Modal opened={opened} onClose={close} title="Search for a Book" centered>
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
            onChange={(value) => {
              setSearchTerm(value);
              const selected = searchResults.find(
                (book) => book.volumeInfo.title === value,
              );
              setSelectedBook(selected);
            }}
          />
        </Group>
        <Button color="indigo" mt="md" onClick={handleAddBook}>
          Add Book
        </Button>
      </Modal>

      <div className="center-dash-header">
        <Text size="xl" fw={700} color="indigo">
          My Library
        </Text>
        <Button
          color="indigo"
          onClick={open}
          rightSection={<IconCirclePlus size={18} />}
        >
          Add Book
        </Button>
      </div>

      <div className="library-card-holder">
        {currUserBooks.map((book) => (
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
            <Group spacing="xs">
              <IconTrash
                size={16}
                className="delete-icon"
                onClick={() => handleDeleteBook(book._id)}
              />
            </Group>
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

export default Library;
