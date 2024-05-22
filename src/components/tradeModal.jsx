import React from 'react';
import {
  Modal, Button, Text, Card, Image,
} from '@mantine/core';
import hobbit from '../assets/hobbit.jpg';

function TradeModal({ isOpen, onClose, username }) {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Congrats!" size="lg">
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <img src={hobbit} alt="The Hobbit" style={{ maxWidth: '50%', height: 'auto' }} />
        </Card.Section>
        <Text size="md" style={{ marginTop: 14, textAlign: 'center' }}>
          Your trade offer has been sent to @{username}! Check back later to see if they accept.
        </Text>
        <a href="/home" style={{ textDecoration: 'none' }}>
          <Button fullWidth style={{ marginTop: 14 }}>
            Keep Looking
          </Button>
        </a>
      </Card>
    </Modal>
  );
}

export default TradeModal;
