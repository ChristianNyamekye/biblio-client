import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Text, Group, Title, Button, Stack, Card, Divider,
  SimpleGrid,
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
    <div className="center-dash">
      <div className="center-dash-header">
        <Text size="xl" fw={700} color="indigo">Active Offers</Text>
      </div>
      <Stack>
        <div className="offers-section">
          <h3 className="offer-subtitle">Sent Offers</h3>
          <SimpleGrid cols={3} spacing="md">
            {sentRequests.map((offer) => (
              <div key={offer.offerId} className="offer-card">
                <div className="offer-header">
                  <span className="highlight">Requested Book:</span> {offer.senderWantsBook.title}
                </div>
                <div className="offer-text">Author: {offer.senderWantsBook.author}</div>
                <div className="offer-header">
                  <span className="highlight">Offered Book:</span> {offer.senderGivesBook.title}
                </div>
                <div className="offer-text">Author: {offer.senderGivesBook.author}</div><br />
                <div className="offer-text">Status: {offer.status}</div>
                <div className="offer-text">Requested Date: {new Date(offer.requestedDate).toLocaleString()}</div>
              </div>
            ))}
          </SimpleGrid>
        </div>
        <div className="offers-section">
          <h3 className="offer-subtitle">Received Offers</h3>
          <SimpleGrid cols={3} spacing="md">
            {receivedRequests.map((offer) => (
              <div key={offer.offerId} className="offer-card">
                <div className="offer-header">
                  <span className="highlight">Other Person Wants Book:</span> {offer.senderWantsBook.title}
                </div>
                <div className="offer-text">Author: {offer.senderWantsBook.author}</div>
                <div className="offer-header">
                  <span className="highlight">Other Person is Offering Book:</span> {offer.senderGivesBook.title}
                </div>
                <div className="offer-text">Author: {offer.senderGivesBook.author}</div><br />
                <div className="offer-text">Status: {offer.status}</div>
                <div className="offer-text">Requested Date: {new Date(offer.requestedDate).toLocaleString()}</div>
                <Group position="right" mt="md">
                  <Button color="green" onClick={() => updateOfferStatus(offer.offerId, 'accepted')}>Accept</Button>
                  <Button color="red" onClick={() => updateOfferStatus(offer.offerId, 'declined')}>Decline</Button>
                </Group>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </Stack>
    </div>
  );
}

export default ActiveOffers;
