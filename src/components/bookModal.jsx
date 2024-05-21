import React, {
  useState,
} from 'react';
import {
  Modal, Image, Text, Group, Badge, Button,
} from '@mantine/core';
import hobbit from '../assets/hobbit.jpg';

function BookModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Book Details</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Book Details"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="lg"
        centered
      >
        <Group position="center">
          <img className="bookCover" src={hobbit} alt="hobbit" width={200} />
          <Text size="md" style={{ marginTop: 20, lineHeight: 1.5 }}>
            Summary
          </Text>
          <Text size="sm" style={{ marginTop: 20, lineHeight: 1.5 }}>
            The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin.
          </Text>

          {/* <Image
            src="../assets/hobbit.jpg"
            alt="The Hobbit by J.R.R. Tolkien"
            width={200}
          /> */}
        </Group>
        <Text size="lg" weight={500} style={{ marginTop: 20, textAlign: 'left' }}>
          The Hobbit
        </Text>
        <Text size="sm" color="dimmed" style={{ textAlign: 'left' }}>
          J.R.R Tolkien
        </Text>
        <Group position="left" style={{ marginTop: 20 }}>
          <Badge color="pink" variant="light">
            Fantasy
          </Badge>
          <Badge color="green" variant="light">
            4.5/5
          </Badge>
          <Badge color="blue" variant="light">
            6.5 hrs
          </Badge>
          <Badge color="yellow" variant="light">
            Great Condition
          </Badge>
        </Group>
      </Modal>
    </>
  );
}

export default BookModal;
