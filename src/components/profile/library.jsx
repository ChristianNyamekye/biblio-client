// import React from 'react';
// import {
//   Text, Button, Avatar, Modal, Autocomplete,
// } from '@mantine/core';
// import {
//   IconBooks, IconArrowRight, IconHeart, IconSettings, IconCirclePlus, IconReplace,
// } from '@tabler/icons-react';
// import { useDisclosure } from '@mantine/hooks';

// function Library() {
//   const [opened, { open, close }] = useDisclosure(false);

//   return (
//     <div className="center-dash">

//       <Modal
//         opened={opened}
//         onClose={close}
//         title="Search for a Book"
//         centered
//       >
//         <Autocomplete
//           placeholder="Search by title, author, ISBN, genre"
//           data={['Harry Potter', 'Lord of the Rings', 'Jane Austen', 'Pride and Prejudice']}
//         />
//         <Button color="indigo" mt="md">Add Book</Button>
//       </Modal>

//       <div className="center-dash-header">
//         <Text size="xl" fw={700} color="indigo">
//           My Library
//         </Text>
//         <Button color="indigo" onClick={open} rightSection={<IconCirclePlus size={18} />}>
//           Add Book
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Library;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Text,
//   Button,
//   Modal,
//   Select,
//   Autocomplete,
//   Group,
// } from '@mantine/core';
// import { IconCirclePlus } from '@tabler/icons-react';
// import { useDisclosure } from '@mantine/hooks';

// function Library() {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);

//   const filterUniqueBooks = (books) => {
//     const seenTitles = new Set();
//     return books.filter(({ volumeInfo: { title } }) => {
//       if (seenTitles.has(title)) {
//         return false;
//       }
//       seenTitles.add(title);
//       return true;
//     });
//   };

//   useEffect(() => {
//     if (searchTerm) {
//       console.log('Fetching books for:', searchTerm);
//       const fetchBooks = async () => {
//         try {
//           const response = await axios.get(
//             'http://localhost:9090/api/books/search',
//             {
//               params: { query: searchTerm },
//             },
//           );
//           const uniqueBooks = filterUniqueBooks(response.data.items || []);
//           setSearchResults(uniqueBooks); // Ensure searchResults is always an array
//         } catch (error) {
//           setSearchResults([]); // Set to empty array on error
//         }
//       };
//       fetchBooks();
//     } else {
//       setSearchResults([]); // Reset when search term is empty
//     }
//   }, [searchTerm]);

//   const handleAddBook = async () => {
//     if (selectedBook) {
//       try {
//         const bookDetails = {
//           title: selectedBook.volumeInfo.title,
//           author: selectedBook.volumeInfo.authors.join(', '),
//           genre: selectedBook.volumeInfo.categories?.[0] || 'Unknown',
//           rating: selectedBook.volumeInfo.averageRating || 0,
//           readingTime: `${selectedBook.volumeInfo.pageCount} pages`,
//           condition: 'New', // Assuming default condition
//           datePublished: selectedBook.volumeInfo.publishedDate,
//           ISBN:
//             selectedBook.volumeInfo.industryIdentifiers?.[0]?.identifier
//             || 'Unknown',
//           tradeStatus: 'available',
//         };

//         const response = await axios.post('http://localhost:9090/api/books', {
//           userId: 'yourUserIdHere', // Replace this with the actual user ID
//           bookDetails,
//         });
//         console.log('Book added:', response.data);
//         close();
//       } catch (error) {
//         console.error('Error adding book:', error);
//       }
//     } else {
//       alert('Please select a book to add.');
//     }
//   };

//   return (
//     <div className="center-dash">
//       <Modal opened={opened} onClose={close} title="Search for a Book" centered>
//         <Group style={{ display: 'flex', gap: '10px' }}>
//           <Select
//             label="Search By"
//             placeholder="Filter"
//             data={['Genre', 'Author', 'Condition', 'Length']}
//             style={{ flex: 1 }}
//           />
//           <Autocomplete
//             label="Find Book"
//             placeholder="Enter Title or Author"
//             data={searchResults.map((book) => ({
//               value: book.volumeInfo.title,
//               label: book.volumeInfo.title,
//               description: book.volumeInfo.authors?.join(', '),
//             }))}
//             style={{ flex: 3 }}
//             onChange={(value) => {
//               setSearchTerm(value);
//               const selected = searchResults.find(
//                 (book) => book.volumeInfo.title === value,
//               );
//               setSelectedBook(selected);
//             }}
//           />
//         </Group>
//         <Button color="indigo" mt="md" onClick={handleAddBook}>
//           Add Book
//         </Button>
//       </Modal>

//       <div className="center-dash-header">
//         <Text size="xl" fw={700} color="indigo">
//           My Library
//         </Text>
//         <Button
//           color="indigo"
//           onClick={open}
//           rightSection={<IconCirclePlus size={18} />}
//         >
//           Add Book
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Library;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Text,
  Button,
  Modal,
  Select,
  Autocomplete,
  Group,
} from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function Library({ userId }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const filterUniqueBooks = (books) => {
    const seenTitles = new Set();
    return books.filter(({ volumeInfo: { title } }) => {
      if (seenTitles.has(title)) {
        return false;
      }
      seenTitles.add(title);
      return true;
    });
  };

  useEffect(() => {
    if (searchTerm) {
      console.log('Fetching books for:', searchTerm);
      const fetchBooks = async () => {
        try {
          const response = await axios.get(
            'http://localhost:9090/api/books/search',
            {
              params: { query: searchTerm },
            },
          );
          const uniqueBooks = filterUniqueBooks(response.data.items || []);
          setSearchResults(uniqueBooks); // Ensure searchResults is always an array
        } catch (error) {
          setSearchResults([]); // Set to empty array on error
        }
      };
      fetchBooks();
    } else {
      setSearchResults([]); // Reset when search term is empty
    }
  }, [searchTerm]);

  const handleAddBook = async () => {
    if (selectedBook) {
      try {
        const bookDetails = {
          title: selectedBook.volumeInfo.title,
          author: selectedBook.volumeInfo.authors.join(', '),
          genre: selectedBook.volumeInfo.categories?.[0] || 'Unknown',
          rating: selectedBook.volumeInfo.averageRating || 0,
          readingTime: `${selectedBook.volumeInfo.pageCount} pages`,
          condition: 'New', // Assuming default condition
          datePublished: selectedBook.volumeInfo.publishedDate,
          coverImage:
            selectedBook.volumeInfo.imageLinks?.thumbnail
            || 'No Image Available',
          owner: userId,
          ISBN:
            selectedBook.volumeInfo.industryIdentifiers?.[0]?.identifier
            || 'Unknown',
          tradeStatus: 'available',
        };
        console.log('userid:', userId);
        console.log('details:', bookDetails);
        const response = await axios.post('http://localhost:9090/api/books', {
          userId,
          bookDetails,
        });
        console.log('Book added:', response.data);
        close();
      } catch (error) {
        console.error('Error adding book:', error);
      }
    } else {
      alert('Please select a book to add.');
    }
  };

  return (
    <div className="center-dash">
      <Modal opened={opened} onClose={close} title="Search for a Book" centered>
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
            data={searchResults.map((book) => ({
              value: book.volumeInfo.title,
              label: book.volumeInfo.title,
              description: book.volumeInfo.authors?.join(', '),
            }))}
            style={{ flex: 3 }}
            onChange={(value) => {
              setSearchTerm(value);
              const selected = searchResults.find(
                (book) => book.volumeInfo.title === value,
              );
              setSelectedBook(selected);
            }}
          />
        </Group>
        <Button color="indigo" mt="md" onClick={handleAddBook}>
          Add Book
        </Button>
      </Modal>

      <div className="center-dash-header">
        <Text size="xl" fw={700} color="indigo">
          My Library
        </Text>
        <Button
          color="indigo"
          onClick={open}
          rightSection={<IconCirclePlus size={18} />}
        >
          Add Book
        </Button>
      </div>
    </div>
  );
}

export default Library;
