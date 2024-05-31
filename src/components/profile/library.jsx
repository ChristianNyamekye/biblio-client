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
  Autocomplete,
  Group,
  Grid,
  ActionIcon,
  Center,
} from '@mantine/core';
import { toast } from 'react-toastify';
import { IconCirclePlus, IconTrash, IconAlertOctagon } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import BookModal from '../bookModal';
import useStore from '../../store';

function Library({ userId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchUserBooks = useStore(({ biblioSlice }) => biblioSlice.fetchUserBooks);
  const currUserBooks = useStore(({ biblioSlice }) => biblioSlice.currUserBooks);

  const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
  // const ROOT_URL = 'http://localhost:9090/api';

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
      toast.success('Book deleted successfully');
      fetchUserBooks(userId);
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
        {currUserBooks.length === 0 ? (
          <Center style={{ flexDirection: 'column', height: '100%', paddingTop: '150px' }}>
            <IconAlertOctagon size={48} strokeWidth={2} color="#4C6EF5" />
            <Text color="dimmed" align="center" size="md">
              No books in your library yet. Start by adding some!
            </Text>
          </Center>
        ) : (
          currUserBooks.map((book) => (
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
              <Grid
                mt="md"
                columns={2}
                justify="center"
                align="center"
                gutter="xs"
              >
                <Grid.Col
                  span={1.5}
                >
                  <Button
                    color="indigo"
                    fullWidth
                    radius="md"
                    onClick={() => handleViewBook(book)}
                  >
                    View Book
                  </Button>
                </Grid.Col>
                <Grid.Col
                  span={0.5}
                >
                  <ActionIcon
                    variant="outline"
                    color="red"
                    size="lg"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>

            </Card>
          ))
        )}
      </div>

      <BookModal
        opened={bookDetailsOpened}
        onClose={() => setBookDetailsOpened(false)}
        book={selectedBook}
        tradable={false}
      />
    </div>
  );
}

export default Library;
