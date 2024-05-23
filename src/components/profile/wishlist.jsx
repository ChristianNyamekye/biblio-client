import React, { useState } from 'react';
import {
  Text, Button, Avatar, Modal, Autocomplete,
} from '@mantine/core';
import {
  IconBooks, IconArrowRight, IconHeart, IconSettings, IconCirclePlus, IconReplace,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';

function Wishlist() {
  const [opened, { open, close }] = useDisclosure(false);
  const [bookOptions, setBookOptions] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');

  // Function to fetch books from Google Books API based on user input
  const fetchBooks = async (query) => {
    console.log(`query result ${query}`);
    if (!query) {
      setBookOptions([]);
      return;
    }

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const books = response.data.items.map((item) => ({
        value: item.volumeInfo.title,
        id: item.id,
      }));
      setBookOptions(books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Function to handle book selection from autocomplete
  const handleSelect = (selected) => {
    const selectedBook = bookOptions.find((book) => book.value === selected);
    if (selectedBook) {
      setSelectedBookId(selectedBook.id);
    }
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
          placeholder="Search by title, author, ISBN, genre"
          data={bookOptions.map((book) => book.value)} // Options for autocomplete
          onChange={(value) => fetchBooks(value)} // Fetch books on input change
          onItemSubmit={(item) => handleSelect(item.value)} // Handle book selection
        />
        <Button color="indigo" mt="md">Add Book</Button>
      </Modal>

      <div className="center-dash-header">
        <Text size="xl" fw={700} color="indigo">
          Wishlist
        </Text>
        <Button color="indigo" onClick={open} rightSection={<IconCirclePlus size={18} />}>
          Add To Wishlist
        </Button>
      </div>

    </div>
  );
}

export default Wishlist;
