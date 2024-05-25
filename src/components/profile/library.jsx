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
import {
  IconCirclePlus,
  IconCheck,
  IconX,
  IconTrash,
  IconHeart,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import BookModal from '../bookModal';

function Library({ userId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [bookDetailsOpened, setBookDetailsOpened] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
  // const ROOT_URL = 'http://localhost:9090/api';

  const fetchBookDetails = async (bookIds) => {
    try {
      const bookDetailsPromises = bookIds.map((id) => axios.get(`${ROOT_URL}/books/${id}`));
      const booksResponses = await Promise.all(bookDetailsPromises);
      const books = booksResponses.map((response) => response.data);
      setUploadedBooks(books);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  useEffect(() => {
    const fetchUploadedBooks = async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/users/${userId}`);
        const bookIds = response.data.uploadedBooks;
        console.log('uploadedBooks:', bookIds);
        fetchBookDetails(bookIds);
      } catch (error) {
        console.error('Error fetching uploaded books:', error);
      }
    };

    fetchUploadedBooks();
  }, [userId]);

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
          const response = await axios.get(`${ROOT_URL}/books/search`, {
            params: { query: searchTerm },
          });
          const uniqueBooks = filterUniqueBooks(response.data.items || []);
          setSearchResults(uniqueBooks);
        } catch (error) {
          setSearchResults([]);
        }
      };
      fetchBooks();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleAddBook = async () => {
    if (selectedBook) {
      try {
        const bookDetails = {
          title: selectedBook.volumeInfo.title,
          author: selectedBook.volumeInfo.authors?.join(', ') || 'Unknown',
          genre: selectedBook.volumeInfo.categories?.[0] || 'Unknown',
          rating: selectedBook.volumeInfo.averageRating || 0,
          readingTime: `${selectedBook.volumeInfo.pageCount || 0} pages`,
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

        const response = await axios.post(`${ROOT_URL}/books`, {
          userId,
          bookDetails,
        });

        setUploadedBooks((prevBooks) => [...prevBooks, response.data]);
        close();
      } catch (error) {
        console.error('Error adding book:', error);
      }
    } else {
      alert('Please select a book to add.');
    }
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setBookDetailsOpened(true);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${ROOT_URL}/books/${bookId}`);
      setUploadedBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleAddToWishlist = async (bookId) => {
    const isAlreadyWishlisted = wishlist.has(bookId);
    const bookDetails = uploadedBooks.find((book) => book._id === bookId);

    if (!bookDetails) {
      console.error('Book details not found');
      return; // Exit if book details are not found
    }

    try {
      let response;
      if (isAlreadyWishlisted) {
        // Remove from wishlist
        response = await axios.delete(
          `${ROOT_URL}/users/${userId}/wishlist/${bookId}`,
        );
        wishlist.delete(bookId);
      } else {
        // Add to wishlist
        response = await axios.post(`${ROOT_URL}/users/${userId}/wishlist`, {
          userId,
          bookDetails,
        });
        wishlist.add(bookId);
      }
      setWishlist(new Set([...wishlist])); // Update the state to trigger re-render
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
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
        {uploadedBooks.map((book) => (
          <Card
            key={book._id}
            shadow="sm"
            padding="lg"
            radius="md"
            className="post-card"
          >
            <Card.Section>
              <Image src={book.coverImage} height={200} alt={book.title} />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text fw={500} className="truncated-title">
                {book.title}
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              {book.author}
            </Text>
            <Group spacing="xs">
              <IconHeart
                size={16}
                className={
                  wishlist.has(book._id)
                    ? 'wishlist-icon active'
                    : 'wishlist-icon'
                }
                onClick={() => handleAddToWishlist(book._id)}
              />
              <IconTrash
                size={16}
                className="delete-icon"
                onClick={() => handleDeleteBook(book._id)}
              />
            </Group>
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

export default Library;
