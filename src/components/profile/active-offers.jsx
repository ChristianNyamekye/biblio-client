import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Text, Group, Title, Button, Stack, Card, Divider,
} from '@mantine/core';
import axios from 'axios';
import useStore from '../../store';

function ActiveOffers() {
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
  // const ROOT_URL = 'http://localhost:9090/api';

  const handleGetSentRequestInfo = async () => {
    try {
      const { sentTradeRequests } = currUser;
      if (sentTradeRequests.length === 0) {
        console.log('No sent trade requests found.');
        return;
      }

      const updatedSentOffers = await Promise.all(sentTradeRequests.map(async (offer) => {
        const { senderWants, senderGives } = offer;
        if (!senderWants || !senderGives) {
          console.log('Invalid book IDs in trade request.');
          return null;
        }

        console.log('Fetching details for books:', senderWants, senderGives);

        const [senderWantsResponse, senderGivesResponse] = await Promise.all([
          axios.get(`${ROOT_URL}/books/${senderWants}`),
          axios.get(`${ROOT_URL}/books/${senderGives}`),
        ]);

        return {
          offerId: offer._id,
          senderWantsBook: senderWantsResponse.data,
          senderGivesBook: senderGivesResponse.data,
          status: offer.status,
          receiverID: offer.receiverID,
          requestedDate: offer.requestedDate,
        };
      }));

      setSentRequests(updatedSentOffers.filter((offer) => offer !== null));
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  useEffect(() => {
    handleGetSentRequestInfo();
  }, [currUser]);

  console.log('sent', sentRequests);

  const handleGetReceivedRequestInfo = async () => {
    try {
      const { receivedTradeRequests } = currUser;

      if (receivedTradeRequests.length === 0) {
        console.log('No received trade requests found.');
        return;
      }

      const updatedReceievedOffers = await Promise.all(receivedTradeRequests.map(async (offer) => {
        const { senderWants, senderGives } = offer;

        if (!senderWants || !senderGives) {
          console.log('Invalid book IDs in trade request.');
          return null;
        }

        console.log('Fetching details for books:', senderWants, senderGives);

        const [senderWantsResponse, senderGivesResponse] = await Promise.all([
          axios.get(`${ROOT_URL}/books/${senderWants}`),
          axios.get(`${ROOT_URL}/books/${senderGives}`),
        ]);

        return {
          offerId: offer._id,
          senderWantsBook: senderWantsResponse.data,
          senderGivesBook: senderGivesResponse.data,
          status: offer.status,
          receiverID: offer.receiverID,
          requestedDate: offer.requestedDate,
        };
      }));

      setReceivedRequests(updatedReceievedOffers.filter((offer) => offer !== null));
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  useEffect(() => {
    handleGetSentRequestInfo();
    handleGetReceivedRequestInfo();
  }, [currUser]);

  console.log('received', receivedRequests);

  const updateOfferStatus = async (offerId, newStatus) => {
    try {
      await axios.patch(`${ROOT_URL}/trade-requests/${offerId}`, { status: newStatus });
      handleGetSentRequestInfo();
      handleGetReceivedRequestInfo();
    } catch (error) {
      console.error('Error updating offer status:', error);
    }
  };

  return (
    <div style={{ maxWidth: 800, maxHeight: 1000, margin: '0 auto' }}>
      <Title order={2}>Active Offers</Title>
      <Stack spacing="md">
        <div>
          <Text size="lg" weight={500}>Sent Offers</Text>
          {sentRequests.map((offer) => (
            <div key={offer.offerId}>
              <h3>You Want Book: {offer.senderWantsBook.title}</h3>
              <p>Author: {offer.senderWantsBook.author}</p>
              <h3>You Offer Book: {offer.senderGivesBook.title}</h3>
              <p>Author: {offer.senderGivesBook.author}</p>
              <p>Status: {offer.status}</p>
              <p>Requested Date: {new Date(offer.requestedDate).toLocaleString()}</p>
            </div>
          ))}
          {/* // including conditional where if status is declined the box modal is outlined in red */}
        </div>
        <Divider />
        <div>
          <Text size="lg" weight={500}>Recieved Offers</Text>
          {receivedRequests.map((offer) => (
            <div key={offer.offerId}>
              <h3>Other person Wants Book: {offer.senderWantsBook.title}</h3>
              <p>Author: {offer.senderWantsBook.author}</p>
              <h3>Other person is Offering Book: {offer.senderGivesBook.title}</h3>
              <p>Author: {offer.senderGivesBook.author}</p>
              <p>Status: {offer.status}</p>
              <p>Requested Date: {new Date(offer.requestedDate).toLocaleString()}</p>
              <Group position="right" mt="md">
                <Button color="green" onClick={() => updateOfferStatus(offer.offerId, 'accepted')}>Accept</Button>
                <Button color="red" onClick={() => updateOfferStatus(offer.offerId, 'declined')}>Decline</Button>
              </Group>

            </div>
          ))}
        </div>
      </Stack>
    </div>
  );
}

export default ActiveOffers;
