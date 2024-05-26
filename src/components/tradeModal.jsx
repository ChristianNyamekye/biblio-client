import React from 'react';
import {
  Modal, Button, Text, Card, Image,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function TradeModal({
  isOpen, onClose, username, book,
}) {
  const navigate = useNavigate();

  const handleKeepLooking = () => {
    navigate('/home');
    onClose();
  };

  if (!book) {
    return null;
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Trade Request Sent"
      size="md"
    >
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <Image
            src={book.coverImage}
            alt={book.title}
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </Card.Section>
        <Text
          size="md"
          style={{ marginTop: 14, textAlign: 'center' }}
        >
          Your trade offer has been sent! Check back later to see if they accept.
        </Text>
        <Button
          fullWidth
          style={{ marginTop: 14 }}
          onClick={handleKeepLooking}
        >
          Keep Looking
        </Button>
      </Card>
    </Modal>
  );
}

export default TradeModal;
