import React, { useState } from 'react';
import {
  Text, Button, Card, Modal, Autocomplete, Image, Group, SimpleGrid,
} from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import BookModal from '../bookModal';

const sampleBooks = [
  {
    id: 1,
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    cover: 'https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 2,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    cover: 'https://m.media-amazon.com/images/I/61mn09OvTQL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 4,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://m.media-amazon.com/images/I/811NqsxadrS._AC_UF1000,1000_QL80_.jpg',
  },
];

function Library() {
  const [addBookOpened, { open: openAddBook, close: closeAddBook }] = useDisclosure(false);
  const [bookDetailsOpened, setBookDetailsOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setBookDetailsOpened(true);
  };

  return (
    <div className="center-dash">

      <Modal
        opened={addBookOpened}
        onClose={closeAddBook}
        title="Search for a Book"
        centered
      >
        <Autocomplete
          placeholder="Search by title, author, ISBN, genre"
          data={sampleBooks.map((book) => book.title)}
        />
        <Button color="indigo" mt="md">Add Book</Button>
      </Modal>

      <div className="center-dash-header">
        <Text size="xl" fw={700} color="indigo">
          My Library
        </Text>
        <Button color="indigo" onClick={openAddBook} rightSection={<IconCirclePlus size={18} />}>
          Add Book
        </Button>
      </div>

      <div className="library-card-holder">
        {sampleBooks.map((book) => (
          <Card key={book.id} shadow="sm" padding="lg" radius="md" className="post-card">
            <Card.Section>
              <Image
                src={book.cover}
                height={400}
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

export default Library;
