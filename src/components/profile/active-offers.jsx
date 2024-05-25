import React from 'react';
import { Link } from 'react-router-dom';
import {
  Autocomplete, Select, Image, Text, Group, Title, Container, Stack, Button, List, ThemeIcon, rem,
} from '@mantine/core';
import {
  IconCircleCheck, IconCircleDashed, IconDownload, IconArrowRight, IconUserSearch, IconUserCircle, IconCheck,
} from '@tabler/icons-react';

function ActiveOffers() {
  return (
    <div className="center-dash">
      <Text size="xl" fw={700} color="indigo">
        Active Offers
      </Text>
      <Link to="/tradeModal">
        <Button leftSection={<IconUserSearch size={14} />}>
          Trade
        </Button>
      </Link>
    </div>
  );
}

export default ActiveOffers;
