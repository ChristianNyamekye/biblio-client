import React, { useState } from 'react';
import { Button, Avatar } from '@mantine/core';
import {
  IconBooks, IconArrowRight, IconHeart, IconSettings, IconReplace,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Library from './library';
import Wishlist from './wishlist';
import ActiveOffers from './active-offers';
import Settings from './settings';

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
      case 'library': return (<Library />);
      case 'offers': return (<ActiveOffers />);
      case 'wishlist': return (<Wishlist />);
      case 'settings': return (<Settings />);
      default: return null;
    }
  };

  return (
    <div className="profile">
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
