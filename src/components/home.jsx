import React from 'react';
import {
  Autocomplete, Select, Text, Group, Title, Container,
} from '@mantine/core';
import useStore from '../store';

function Home() {
  return (
    <Container style={{ width: '75vw', margin: '0 auto', paddingTop: '5vh' }}>
      <Title order={2} align="center" style={{ marginBottom: '20px' }}>
        Explore a New Book Trade
      </Title>
      <Group style={{ display: 'flex', gap: '10px' }}>
        <Select
          label="Search By"
          placeholder="Filter"
          data={['Genre', 'Author', 'Condition', 'Length']}
          style={{ flex: 1 }}
        />
        <Autocomplete
          label="Find Book"
          placeholder="Enter Title or Author"
          style={{ flex: 3 }}
        />
      </Group>
    </Container>
  );
}

export default Home;
