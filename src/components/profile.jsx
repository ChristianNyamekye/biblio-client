// import React, { useState } from 'react';
// import {
//   Text, Button, Avatar, Modal, Autocomplete,
// } from '@mantine/core';
// import {
//   IconBooks, IconArrowRight, IconHeart, IconSettings, IconCirclePlus, IconReplace,
// } from '@tabler/icons-react';
// import { useDisclosure } from '@mantine/hooks';
// import useStore from '../store';

// function Profile() {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleBookSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="profile">
//       <Modal opened={opened}
//         onClose={close}
//         title="Search for a Book"
//         centered
//       >
//         <Autocomplete
//           placeholder="Search by title, author, ISBN, genre"
//           data={['Harry Potter', 'Lord of the Rings', 'Jane Austen', 'Pride and Prejudice']}
//         />
//         <Button
//           color="indigo"
//           mt="md"
//         >Add to my Library
//         </Button>
//       </Modal>

//       <div className="left-dash">
//         <Avatar color="indigo" size="lg" radius="xl" mb="lg">JP</Avatar>
//         <Button
//           fullWidth
//           variant="light"
//           leftSection={<IconBooks size={18} />}
//           rightSection={<IconArrowRight size={18} />}
//           color="indigo"
//           mb="lg"
//         >My Library
//         </Button>
//         <Button
//           fullWidth
//           variant="light"
//           leftSection={<IconReplace size={18} />}
//           rightSection={<IconArrowRight size={18} />}
//           color="indigo"
//           mb="lg"
//         >Active Offers
//         </Button>
//         <Button
//           fullWidth
//           variant="light"
//           leftSection={<IconHeart size={18} />}
//           rightSection={<IconArrowRight size={18} />}
//           color="indigo"
//           mb="lg"
//         >Wishlist
//         </Button>
//         <Button
//           fullWidth
//           variant="light"
//           leftSection={<IconSettings size={18} />}
//           rightSection={<IconArrowRight size={18} />}
//           color="indigo"
//         >Settings
//         </Button>
//       </div>
//       <div className="center-dash">
//         <div className="center-dash-header">
//           <Text
//             size="xl"
//             fw={700}
//             color="indigo"
//           >
//             My Library
//           </Text>
//           <Button color="indigo" onClick={open} rightSection={<IconCirclePlus size={18} />}>Add Book</Button>

//         </div>

//       </div>
//       {/* <div className="right-dash">
//         <Text
//           size="xl"
//           fw={700}
//           color="indigo"
//         >
//           Active Offers
//         </Text>
//       </div> */}

//     </div>
//   );
// }

// export default Profile;
import React, { useState } from 'react';
import {
  Text, Button, Avatar, Modal, Autocomplete,
} from '@mantine/core';
import {
  IconBooks, IconArrowRight, IconHeart, IconSettings, IconCirclePlus, IconReplace,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function Profile() {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('library');

  const handleBookSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'library':
        return (
          <div className="center-dash">
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
      case 'offers':
        return (
          <div className="center-dash">
            <Text size="xl" fw={700} color="indigo">
              Active Offers
            </Text>
          </div>
        );
      case 'wishlist':
        return (
          <div className="center-dash">
            <div className="center-dash-header">
              <Text size="xl" fw={700} color="indigo">
                Wishlist
              </Text>
              <Button color="indigo" onClick={open} rightSection={<IconCirclePlus size={18} />}>
                Add Book
              </Button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="center-dash">
            <Text size="xl" fw={700} color="indigo">
              Settings
            </Text>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile">
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

      <div className="left-dash">
        <Avatar color="indigo" size="lg" radius="xl" mb="lg">JP</Avatar>
        <Button
          fullWidth
          variant="light"
          leftSection={<IconBooks size={18} />}
          rightSection={<IconArrowRight size={18} />}
          color="indigo"
          mb="lg"
          onClick={() => handleTabClick('library')}
        >
          My Library
        </Button>
        <Button
          fullWidth
          variant="light"
          leftSection={<IconReplace size={18} />}
          rightSection={<IconArrowRight size={18} />}
          color="indigo"
          mb="lg"
          onClick={() => handleTabClick('offers')}
        >
          Active Offers
        </Button>
        <Button
          fullWidth
          variant="light"
          leftSection={<IconHeart size={18} />}
          rightSection={<IconArrowRight size={18} />}
          color="indigo"
          mb="lg"
          onClick={() => handleTabClick('wishlist')}
        >
          Wishlist
        </Button>
        <Button
          fullWidth
          variant="light"
          leftSection={<IconSettings size={18} />}
          rightSection={<IconArrowRight size={18} />}
          color="indigo"
          onClick={() => handleTabClick('settings')}
        >
          Settings
        </Button>
      </div>

      {renderContent()}
    </div>
  );
}

export default Profile;
