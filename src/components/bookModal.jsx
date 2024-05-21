import React, { useState } from 'react';
import {
  Modal, Image, Text, Group, Badge, Button, SimpleGrid, Card,
} from '@mantine/core';
import hobbit from '../assets/hobbit.jpg';
import TradeModal from './tradeModal';

function BookModal() {
  const [opened, setOpened] = useState(false);
  const [isTradeModalOpen, setTradeModalOpen] = useState(false);
  const [username, setUsername] = useState('username5');

  const handleOpenTradeModal = () => {
    setTradeModalOpen(true);
  };

  const handleCloseTradeModal = () => {
    setTradeModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Book Details</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Book Details"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="lg"
        width={800}
        centered
      >
        <SimpleGrid cols={2} spacing="lg">
          <img src={hobbit} alt="The Hobbit" style={{ maxWidth: '100%', height: 'auto' }} />
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
            <Text size="md" weight={500} style={{ marginTop: 20 }}>
              Related
            </Text>
            <SimpleGrid cols={3} spacing="sm">
              {[1, 2, 3].map((index) => (
                <Card key={index} shadow="sm" p="lg">
                  <Card.Section>
                    <Image src={hobbit} alt={`The Hobbit ${index}`} height={120} fit="contain" />
                  </Card.Section>
                  <Text size="sm" style={{ marginTop: 10 }}>
                    The Hobbit
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
            <Group position="left" style={{ width: '100%', marginTop: 20 }}>
              <Button
                style={{ borderRadius: '20px' }}
                variant="filled"
                color="blue"
                onClick={handleOpenTradeModal}
              >
                Trade Now
              </Button>
              <TradeModal isOpen={isTradeModalOpen} onClose={handleCloseTradeModal} username={username} />
            </Group>
          </div>
        </SimpleGrid>
      </Modal>
    </>
  );
}

export default BookModal;
