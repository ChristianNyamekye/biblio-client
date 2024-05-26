import React, { useState, useEffect } from 'react';
import {
  Modal, Button, Text, Card, Image, Select,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

function TradeModal({
  isOpen, onClose, user, book,
}) {
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState('');
  const [tradeStatus, setTradeStatus] = useState('');
  const { currUserBooks, fetchUserBooks } = useStore((state) => ({
    currUserBooks: state.biblioSlice.currUserBooks,
    fetchUserBooks: state.biblioSlice.fetchUserBooks,
  }));

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const handleTradeRequest = () => {
    setTradeStatus('sent');
  };

  const handleKeepLooking = () => {
    navigate('/home');
    onClose();
  };

  if (!book) return null;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={tradeStatus ? 'Trade Request Sent' : 'Initiate Trade Request'}
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
        {tradeStatus ? (
          <Text size="md" style={{ marginTop: 14, textAlign: 'center' }}>
            Congrats! Your trade offer has been sent! Check back later to see if they accept.
          </Text>
        ) : (
          <>
            <Text
              size="md"
              style={{ marginTop: 14, textAlign: 'center' }}
            >
              Select a book from your library to trade for {book.title}.
            </Text>
            <Select
              label="Choose your book to trade:"
              placeholder="Select a book"
              data={currUserBooks.map(({ id, title }) => ({ value: id, label: title }))}
              value={selectedBookId}
              onChange={setSelectedBookId}
              style={{ marginTop: 14 }}
            />
            <Button
              fullWidth
              style={{ marginTop: 14 }}
              onClick={handleTradeRequest}
            >
              Send Trade Request
            </Button>
          </>
        )}
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
