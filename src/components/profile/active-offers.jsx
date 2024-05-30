/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Text, Group, Button, Stack, SimpleGrid, Popover, Center,
} from '@mantine/core';
import axios from 'axios';
import { IconAlertOctagon } from '@tabler/icons-react';
import useStore from '../../store';

function ActiveOffers() {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const updateTradeRequest = useStore(({ biblioSlice }) => biblioSlice.updateTradeRequest);
  const fetchUser = useStore(({ biblioSlice }) => biblioSlice.fetchUser);
  const currUser = useStore(({ biblioSlice }) => biblioSlice.userProfileInformation);

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

        console.log('here', offer);

        const [senderWantsResponse, senderGivesResponse] = await Promise.all([
          axios.get(`${ROOT_URL}/books/${senderWants}`),
          axios.get(`${ROOT_URL}/books/${senderGives}`),
        ]);

        const receiverUserObject = await axios.get(`${ROOT_URL}/trade-user/${offer.receiverID}`);

        return {
          offerId: offer._id,
          senderWantsBook: senderWantsResponse.data,
          senderGivesBook: senderGivesResponse.data,
          status: offer.status,
          receiverID: offer.receiverID,
          requestedDate: offer.requestedDate,
          receiverEmail: receiverUserObject.data.email,
        };
      }));

      setSentRequests(updatedSentOffers.filter((offer) => offer !== null));
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

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

        const [senderWantsResponse, senderGivesResponse] = await Promise.all([
          axios.get(`${ROOT_URL}/books/${senderWants}`),
          axios.get(`${ROOT_URL}/books/${senderGives}`),
        ]);

        const senderUserObject = await axios.get(`${ROOT_URL}/trade-user/${offer.senderID}`);

        return {
          offerId: offer._id,
          senderWantsBook: senderWantsResponse.data,
          senderGivesBook: senderGivesResponse.data,
          status: offer.status,
          receiverID: offer.receiverID,
          requestedDate: offer.requestedDate,
          senderUsername: senderUserObject.data.username,
          senderEmail: senderUserObject.data.email,

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
  }, []);

  useEffect(() => {
    handleGetSentRequestInfo();
    handleGetReceivedRequestInfo();
  }, [currUser]);

  const handleUpdateTrade = async (offerId, newStatus) => {
    try {
      await updateTradeRequest(currUser.id, offerId, { newStatus });
      await fetchUser(currUser.id);
    } catch (error) {
      console.error('Error updating trade request:', error);
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
          {sentRequests.length === 0 ? (
            <Center style={{ flexDirection: 'column', height: '100%' }}>
              <IconAlertOctagon size={48} strokeWidth={2} color="#4C6EF5" />
              <Text color="dimmed" align="center" size="md">
                No offers sent yet. Look through our catalog to find books!
              </Text>
            </Center>
          ) : (
            <SimpleGrid cols={3} spacing="md">
              {sentRequests.map((offer) => (
                <div
                  key={offer.offerId}
                  className="offer-card"
                  style={{
                    border: `1px solid ${offer.status === 'accepted' ? '#40C057' : offer.status === 'rejected' ? '#FA5252' : '#e0e0e0'}`,
                  }}
                >
                  <div className="offer-header">
                    <span className="highlight">You Requested:</span> {offer.senderWantsBook.title}
                  </div>
                  <div className="offer-text">Author: {offer.senderWantsBook.author}</div>
                  <div className="offer-header">
                    <span className="highlight">You Offered:</span> {offer.senderGivesBook.title}
                  </div>
                  <div className="offer-text">Author: {offer.senderGivesBook.author}</div><br />
                  <div
                    className="offer-text"
                    style={{
                      color: `${offer.status === 'accepted' ? '#40C057' : offer.status === 'rejected' ? '#FA5252' : '#666'}`,
                    }}
                  >
                    Status: {offer.status}
                  </div>
                  <div className="offer-text">Requested Date: {new Date(offer.requestedDate).toLocaleString()}</div>
                  {offer.status === 'accepted' && (
                  <Popover width={200} position="top" withArrow shadow="md">
                    <Popover.Target>
                      <Button fullWidth color="indigo">Email User</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text size="sm">@{offer.receiverEmail}</Text>
                    </Popover.Dropdown>
                  </Popover>
                  )}
                </div>
              ))}
            </SimpleGrid>
          )}
        </div>
        <div className="offers-section">
          <h3 className="offer-subtitle">Received Offers</h3>
          {receivedRequests.length === 0 ? (
            <Center style={{ flexDirection: 'column', height: '100%' }}>
              <IconAlertOctagon size={48} strokeWidth={2} color="#4C6EF5" />
              <Text color="dimmed" align="center" size="md">
                No offers received yet. Add more books to trade!
              </Text>
            </Center>
          ) : (
            <SimpleGrid cols={3} spacing="md">
              {receivedRequests.map((offer) => (
                <div
                  key={offer.offerId}
                  className="offer-card"
                  style={{
                    border: `1px solid ${offer.status === 'accepted' ? '#40C057' : offer.status === 'rejected' ? '#FA5252' : '#e0e0e0'}`,
                  }}
                >
                  <div className="offer-header">
                    <span className="highlight">@{offer.senderUsername} wants:</span> {offer.senderWantsBook.title}
                  </div>
                  <div className="offer-text">Author: {offer.senderWantsBook.author}</div>
                  <div className="offer-header">
                    <span className="highlight">@{offer.senderUsername} is offering:</span> {offer.senderGivesBook.title}
                  </div>
                  <div className="offer-text">Author: {offer.senderGivesBook.author}</div><br />
                  <div
                    className="offer-text"
                    style={{
                      color: `${offer.status === 'accepted' ? '#40C057' : offer.status === 'rejected' ? '#FA5252' : '#666'}`,
                    }}
                  >
                    Status: {offer.status}
                  </div>
                  <div className="offer-text">Requested Date: {new Date(offer.requestedDate).toLocaleString()}</div>
                  {offer.status === 'pending' && (
                  <Group position="right" mt="md">
                    <Button onClick={() => handleUpdateTrade(offer.offerId, 'accepted')} color="green">Accept</Button>
                    <Button variant="outline" onClick={() => handleUpdateTrade(offer.offerId, 'rejected')} color="red">Decline</Button>
                  </Group>
                  )}

                  {offer.status === 'accepted' && (
                  <Popover width={200} position="top" withArrow shadow="md">
                    <Popover.Target>
                      <Button fullWidth color="indigo">Email User</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text size="sm">@{offer.senderEmail}</Text>
                    </Popover.Dropdown>
                  </Popover>
                  )}
                </div>
              ))}
            </SimpleGrid>
          )}
        </div>
      </Stack>
    </div>
  );
}

export default ActiveOffers;
