/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  Text, Button, Card, Image, Group, Grid, Modal, Autocomplete, ActionIcon, Center,
} from '@mantine/core';
import { IconCirclePlus, IconTrash, IconAlertOctagon } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { toast } from 'react-toastify';
import useStore from '../../store';
import BookModal from '../bookModal';

function Wishlist({ userId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetailsOpened, setBookDetailsOpened] = useState(false);

  const fetchUserWishList = useStore(
    ({ biblioSlice }) => biblioSlice.fetchUserWishList,
  );
  const currUserWishList = useStore(
    ({ biblioSlice }) => biblioSlice.currUserWishList,
  );

  useEffect(() => {
    fetchUserWishList(userId);
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

  const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
  // const ROOT_URL = 'http://localhost:9090/api';

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

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await axios.delete(`${ROOT_URL}/users/${userId}/wishlist/${bookId}`);
      toast.success('Book deleted successfully');
      fetchUserWishList(userId);
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
    }
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setBookDetailsOpened(true);
  };

  return (
    <div className="center-dash">
      <Modal opened={opened} onClose={close} title="Search for a Book" centered>
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
        <Button
          color="indigo"
          onClick={open}
          rightSection={<IconCirclePlus size={18} />}
        >
          Add To Wishlist
        </Button>
      </div>

      <div className="library-card-holder">
        {currUserWishList.length === 0 ? (
          <Center style={{ flexDirection: 'column', height: '100%', paddingTop: '150px' }}>
            <IconAlertOctagon size={48} strokeWidth={2} color="#4C6EF5" />
            <Text color="dimmed" align="center" size="md">
              No books in your wishlist yet. Start by adding some!
            </Text>
          </Center>
        ) : (
          currUserWishList.map((book) => (
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
                    onClick={() => handleRemoveFromWishlist(book.id)}
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

export default Wishlist;
