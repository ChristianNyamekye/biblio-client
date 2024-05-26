/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  Text, Button, Card, Image, Group, SimpleGrid, Modal, Autocomplete,
} from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import useStore from '../../store';
import BookModal from '../bookModal';

function Wishlist({ userId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetailsOpened, setBookDetailsOpened] = useState(false);

  const fetchUserWishList = useStore(({ biblioSlice }) => biblioSlice.fetchUserWishList);
  const currUserWishList = useStore(({ biblioSlice }) => biblioSlice.currUserWishList);

  useEffect(() => {
    fetchUserWishList(userId);
  }, []);

  console.log('in wishlist', currUserWishList);

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

  const handleAddToWishlist = async () => {
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
          coverImage: selectedBook.volumeInfo.imageLinks?.thumbnail || 'No Image Available',
          owner: userId,
          ISBN: selectedBook.volumeInfo.industryIdentifiers?.[0]?.identifier || 'Unknown',
          tradeStatus: 'available',
        };

        const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
        // const ROOT_URL = 'http://localhost:9090/api';

        const response = await axios.post(
          `${ROOT_URL}/users/${userId}/wishlist`,
          { userId, bookDetails },
        );
        fetchUserWishList(userId);
        close();
      } catch (error) {
        console.error('Error adding book to wishlist:', error);
      }
    } else {
      alert('Please select a book to add.');
    }
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setBookDetailsOpened(true);
  };

  return (
    <div className="center-dash">
      <Modal
        opened={opened}
        onClose={close}
        title="Search for a Book"
        centered
      >
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
        <Button color="indigo" mt="md" onClick={handleAddToWishlist}>
          Add to Wishlist
        </Button>
      </Modal>

      <div className="center-dash-header">
        <Text size="xl" fw={700} color="indigo">
          Wishlist
        </Text>
        <Button color="indigo" onClick={open} rightSection={<IconCirclePlus size={18} />}>
          Add To Wishlist
        </Button>
      </div>

      <div className="library-card-holder">
        {currUserWishList.map((book) => (
          <Card key={book.id} shadow="sm" padding="lg" radius="md" className="post-card">
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

export default Wishlist;
