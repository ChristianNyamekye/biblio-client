import React from 'react';
import {
  Text, Button, Avatar, Modal, Autocomplete,
} from '@mantine/core';
import {
  IconBooks, IconArrowRight, IconHeart, IconSettings, IconCirclePlus, IconReplace,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function Library() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="center-dash">

      <Modal
        opened={opened}
        onClose={close}
        title="Search for a Book"
        centered
      >
        <Autocomplete
          placeholder="Search by title, author, ISBN, genre"
          data={['Harry Potter', 'Lord of the Rings', 'Jane Austen', 'Pride and Prejudice']}
        />
        <Button color="indigo" mt="md">Add Book</Button>
      </Modal>

      <div className="center-dash-header">
        <Text size="xl" fw={700} color="indigo">
          My Library
        </Text>
        <Button color="indigo" onClick={open} rightSection={<IconCirclePlus size={18} />}>
          Add Book
        </Button>
      </div>
    </div>
  );
}

export default Library;
