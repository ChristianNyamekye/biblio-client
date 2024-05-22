import { Modal, Button, Text } from '@mantine/core';
import React, { useState } from 'react';
import axios from 'axios';

function ResponseModal({
  opened, onClose, bookId, userEmail,
}) {
  const [responseType, setResponseType] = useState(null);
  const [otherUsername, setOtherEmail] = useState('');

  const fetchEmail = async (otherEmail) => {
    try {
      const response = await axios.get(`/api/users/${userEmail}`);
      setOtherEmail(response.data.email);
    } catch (error) {
      console.error('Failed to fetch user details', error);
      setOtherEmail('the other user');
    }
  };

  const handleAccept = async () => {
    setResponseType('accept');
    try {
      const tradeResponse = await axios.post('/api/trade/accept', { bookId, userEmail });
      fetchEmail(tradeResponse.data.otherEmail);
      console.log('Trade accepted');
    } catch (error) {
      console.error('Failed to accept trade', error);
    }
  };

  const handleDecline = async () => {
    setResponseType('decline');
    try {
      await axios.post('/api/trade/decline', { bookId, userEmail });
      console.log('Trade declined');
    } catch (error) {
      console.error('Failed to decline trade', error);
    }
  };

  const renderContent = () => {
    if (responseType === 'accept') {
      return (
        <Text>Trade accepted! Please contact {userEmail} to carry out the trade!</Text>
      );
    } else if (responseType === 'decline') {
      return (
        <Text>Trade declined. You can continue browsing other books.</Text>
      );
    }

    return (
      <>
        <Text>Do you want to trade this book?</Text>
        <Button onClick={handleAccept}>Accept Trade</Button>
        <Button onClick={handleDecline} color="red">Decline Trade</Button>
      </>
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        setResponseType(null);
        setOtherEmail('');
      }}
      title="Respond to Trade Offer"
    >
      {renderContent()}
    </Modal>
  );
}

export default ResponseModal;
