import React from 'react';
import { Link } from 'react-router-dom';
import {
  Text, Group, Title, Button, Stack, Card, Divider,
} from '@mantine/core';
import useStore from '../../store';

function ActiveOffers() {
  const { sentOffers, receivedOffers } = useStore((state) => ({
    sentOffers: state.biblioSlice.sentOffers || [],
    receivedOffers: state.biblioSlice.receivedOffers || [],
  }));

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Title order={2}>Active Offers</Title>
      <Stack spacing="md">
        <div>
          <Text size="lg" weight={500}>Sent Offers</Text>
          {sentOffers.length > 0 ? sentOffers.map((offer) => (
            <Card shadow="sm" p="md" key={offer.id} radius="md" withBorder>
              <Text>@{offer.receiverUsername} sent you an offer!</Text>
              <Text>Expires: 24 hrs 45 min</Text>
              <Text>Trade {offer.book.title} for {offer.requestedBook.title}</Text>
              <Group position="right" mt="md">
                <Button variant="outline" color="blue">Accept</Button>
                <Button variant="outline" color="red">Decline</Button>
              </Group>
            </Card>
          )) : <Text>No sent offers</Text>}
        </div>
        <Divider />
        <div>
          <Text size="lg" weight={500}>Received Offers</Text>
          {receivedOffers.length > 0 ? receivedOffers.map((offer) => (
            <Card shadow="sm" p="md" key={offer.id} radius="md" withBorder>
              <Text>@{offer.senderUsername} sent you an offer!</Text>
              <Text>Expires: 4 hrs 45 min</Text>
              <Text>Trade {offer.book.title} for {offer.requestedBook.title}</Text>
              <Group position="right" mt="md">
                <Button variant="outline" color="blue">Accept</Button>
                <Button variant="outline" color="red">Decline</Button>
              </Group>
            </Card>
          )) : <Text>No received offers</Text>}
        </div>
      </Stack>
    </div>
  );
}

export default ActiveOffers;
