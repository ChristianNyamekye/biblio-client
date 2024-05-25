import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Text,
  Button,
  Modal,
  Card,
  Image,
  Group,
  Autocomplete,
} from '@mantine/core';
import {
  IconCirclePlus,
  IconCheck,
  IconTrash,
  IconHeart,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

function Wishlist({ userId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookOptions, setBookOptions] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
  // const ROOT_URL = 'http://localhost:9090/api';

  // Fetch the initial wishlist when the component mounts or userId changes
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(
          `${ROOT_URL}/users/${userId}/wishlist`,
        );
        setWishlist(data || []);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (userId) fetchWishlist();
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

  const fetchBooks = async (query) => {
    if (!query) {
      setBookOptions([]);
      return;
    }

    const apiUrl = `${ROOT_URL}/books/search`;
    try {
      const response = await axios.get(apiUrl, { params: { query } });
      const uniqueBooks = filterUniqueBooks(response.data.items || []);
      setBookOptions(uniqueBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBookOptions([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchBooks(searchTerm);
    }
  }, [searchTerm]);

  const handleAddToWishlist = async () => {
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

        const response = await axios.post(
          `${ROOT_URL}/users/${userId}/wishlist`,
          { userId, bookDetails },
        );
        setWishlist((prevWishlist) => [...prevWishlist, response.data]); // then we set the wishlist to that array
        close();
        showNotification({
          title: 'Success',
          message: 'Book added to wishlist!',
          icon: <IconCheck size={16} />,
          color: 'teal',
        });
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
      setWishlist((prevWishlist) => prevWishlist.filter((book) => book.id !== bookId));
      showNotification({
        title: 'Success',
        message: 'Book removed from wishlist!',
        icon: <IconCheck size={16} />,
        color: 'teal',
      });
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
    }
  };

  return (
    <div className="center-dash">
      <Modal opened={opened} onClose={close} title="Search for a Book" centered>
        <Autocomplete
          placeholder="Search by title, author, ISBN, genre"
          data={bookOptions.map((book) => ({
            value: book.volumeInfo.title,
            label: book.volumeInfo.title,
            description: book.volumeInfo.authors?.join(', '),
          }))}
          onInput={(event) => setSearchTerm(event.currentTarget.value)}
          onChange={(value) => {
            const selected = bookOptions.find(
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
        {wishlist.map((book) => (
          <Card
            key={book.id}
            shadow="sm"
            padding="lg"
            radius="md"
            className="post-card"
          >
            <Card.Section>
              <Image src={book.coverImage} height={200} alt={book.title} />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text fw={500}>{book.title}</Text>
            </Group>
            <Text size="sm" color="dimmed">
              {book.author}
            </Text>
            <IconTrash
              size={16}
              className="delete-icon"
              onClick={() => handleRemoveFromWishlist(book.id)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
