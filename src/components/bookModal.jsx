import React, { useState, useEffect } from 'react';
import {
  Modal, Image, Text, Group, Badge, Button, SimpleGrid, Card,
} from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import TradeModal from './tradeModal';
import useStore from '../store';

function BookModal({
  opened, onClose, book, tradable,
}) {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const getRelatedBooks = useStore(({ biblioSlice }) => biblioSlice.getRelatedBooks);
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

  useEffect(() => {
    if (book) {
      const fetchRelatedBooks = async () => {
        const books = await getRelatedBooks(book);
        setRelatedBooks(books);
      };
      fetchRelatedBooks();
    }
  }, [book, getRelatedBooks]);

  const handleOpenTradeModal = () => {
    setIsTradeModalOpen(true);
    onClose();
  };

  const handleCloseTradeModal = () => {
    setIsTradeModalOpen(false);
    onClose();
  };

  if (!book) return null;

  return (
    <>
      <Modal
        opened={opened && !isTradeModalOpen}
        onClose={onClose}
        title={book.title}
        size="60%"
        centered
      >
        <SimpleGrid cols={2} spacing="sm">
          <Image
            src={book.coverImage}
            alt={book.title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div>
            <Text size="md" weight={700}>
              Summary
            </Text>
            <Text size="sm" style={{ marginTop: 10 }}>
              {book.description}
            </Text>
            <Group position="apart" style={{ marginTop: 20 }}>
              <Group>
                <Badge color="pink" variant="light">
                  {book.genre}
                </Badge>
                {book.rating !== 0 && (
                  <Badge
                    rightSection={<IconStar size={12} />}
                    color="green"
                    variant="light"
                  >
                    {book.rating}/5
                  </Badge>
                )}
              </Group>
            </Group>
            {relatedBooks.length > 0 ? (
              <SimpleGrid>
                <Text size="md" mb="sm" weight={500} style={{ marginTop: 20 }}>
                  You May Also Like
                </Text>
                <SimpleGrid cols={3} spacing="sm">
                  {relatedBooks.map(
                    (
                      relatedBook,
                    ) => (
                      <Card key={relatedBook.id} shadow="sm" p="lg">
                        {' '}
                        <Card.Section>
                          <Image
                            src={relatedBook.coverImage}
                            alt={`${relatedBook.title} cover`}
                            height={120}
                            fit="contain"
                          />
                        </Card.Section>
                        <Text size="sm" style={{ marginTop: 10 }}>
                          {relatedBook.title}
                        </Text>
                      </Card>
                    ),
                  )}
                </SimpleGrid>
              </SimpleGrid>
            ) : (
              <Text />
            )}
            <Group position="left" style={{ width: '100%', marginTop: 20 }}>
              {tradable && currUser?.id !== book?.ownerId && (
              <Button
                variant="filled"
                color="indigo"
                onClick={handleOpenTradeModal}
              >
                Send Trade Request
              </Button>
              )}

            </Group>
          </div>
        </SimpleGrid>
      </Modal>
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={handleCloseTradeModal}
        username={book.owner}
        book={book}
      />
    </>
  );
}

export default BookModal;
