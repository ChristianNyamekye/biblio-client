import React, { useState } from 'react';
import {
  Modal, Image, Text, Group, Badge, Button, SimpleGrid, Card,
} from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import TradeModal from './tradeModal';

function BookModal({ opened, onClose, book }) {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

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
          <Image src={book.coverImage} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} />
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
                  <Badge rightSection={<IconStar size={12} />} color="green" variant="light">
                    {book.rating}/5
                  </Badge>
                )}
              </Group>
            </Group>
            <Text size="md" mb="sm" weight={500} style={{ marginTop: 20 }}>
              Related
            </Text>
            <SimpleGrid cols={3} spacing="sm">
              {[1, 2, 3].map((index) => (
                <Card key={index} shadow="sm" p="lg">
                  <Card.Section>
                    <Image src={book.cover} alt={`${book.title} ${index}`} height={120} fit="contain" />
                  </Card.Section>
                  <Text size="sm" style={{ marginTop: 10 }}>
                    {book.title}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
            <Group position="left" style={{ width: '100%', marginTop: 20 }}>
              <Button
                variant="filled"
                color="indigo"
                onClick={handleOpenTradeModal}
              >
                Send Trade Request
              </Button>
            </Group>
          </div>
        </SimpleGrid>
      </Modal>
      <TradeModal isOpen={isTradeModalOpen} onClose={handleCloseTradeModal} username={book.owner} book={book} />
    </>
  );
}

export default BookModal;
