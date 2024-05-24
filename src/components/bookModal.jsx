import React from 'react';
import {
  Modal, Image, Text, Group, Badge, Button, SimpleGrid, Card,
} from '@mantine/core';

function BookModal({ opened, onClose, book }) {
  if (!book) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={book.title}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="60%"
      centered
    >
      <SimpleGrid cols={2} spacing="sm">
        <img src={book.cover} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} />
        <div>
          <Text size="md" weight={700}>
            Summary
          </Text>
          <Text size="sm" style={{ marginTop: 10 }}>
            The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin.
          </Text>
          <Group position="apart" style={{ marginTop: 20 }}>
            <Group>
              <Badge color="pink" variant="light">
                Fantasy
              </Badge>
              <Badge color="green" variant="light">
                4.5/5
              </Badge>
              <Badge color="blue" variant="light">
                6.5 hrs
              </Badge>
              <Badge color="yellow" variant="light">
                Great Condition
              </Badge>
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
              // onClick={handleOpenTradeModal}
            >
              Send Trade Request
            </Button>
            {/* <TradeModal isOpen={isTradeModalOpen} onClose={handleCloseTradeModal} username={username} /> */}
          </Group>
        </div>
      </SimpleGrid>
    </Modal>
  );
}

export default BookModal;
