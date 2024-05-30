import axios from 'axios';
import { toast } from 'react-toastify';

const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
const API_KEY = '?key=biblio';
// const ROOT_URL = 'http://localhost:9090/api';

export default function createBookSlice(set, get) {
  return {
    allBooks: [],
    bookInfoToView: {},
    userProfileInformation: {},
    currUserBooks: [],
    currUserWishList: [],

    createUser: async (userInfo) => {
      try {
        const response = await axios.post(`${ROOT_URL}/register`, userInfo);
        set(({ biblioSlice }) => { biblioSlice.userProfileInformation = response.data; }, false, 'user/createUser');
      } catch (error) {
        toast.error(`Error signing up: ${error.message}`);
      }
    },

    loginUser: async (userInfo) => {
      try {
        const response = await axios.post(`${ROOT_URL}/login`, userInfo);
        set(({ biblioSlice }) => { biblioSlice.userProfileInformation = response.data; }, false, 'user/loginUser');
      } catch (error) {
        toast.error(`Error logging in: ${error.message}`);
      }
    },

    fetchUser: async (userId) => {
      try {
        const response = await axios.get(`${ROOT_URL}/users/${userId}`);
        set(({ biblioSlice }) => { biblioSlice.userProfileInformation = response.data; }, false, 'user/fetchProfile');
      } catch (error) {
        toast.error(`Error loading profile: ${error.message}`);
      }
    },

    fetchUserBooks: async (userId) => {
      try {
        const response = await axios.get(`${ROOT_URL}/users/getbooks/${userId}`);
        set(({ biblioSlice }) => { biblioSlice.currUserBooks = response.data; }, false, 'user/fetchUserBooks');
      } catch (error) {
        // toast.error(`Error loading books: ${error.message}`);
      }
    },

    fetchUserWishList: async (userId) => {
      try {
        const response = await axios.get(`${ROOT_URL}/users/${userId}/wishlist`);
        set(({ biblioSlice }) => { biblioSlice.currUserWishList = response.data; }, false, 'user/fetchUserWishlist');
      } catch (error) {
        toast.error(`Error loading wishlist: ${error.message}`);
      }
    },

    fetchBook: async (bookId, fromProfile) => {
      try {
        let response;
        if (fromProfile) {
          response = await axios.get(`${ROOT_URL}/profile/${bookId}${API_KEY}`);
        } else {
          response = await axios.get(`${ROOT_URL}/books/${bookId}${API_KEY}`);
        }
        set(({ biblioSlice }) => { biblioSlice.bookInfoToView = response.data; }, false, 'posts/fetchBook');
      } catch (error) {
        toast.error(`Error fetching books: ${error.message}`);
      }
    },

    sendTradeRequest: async (userId, requestInfo) => {
      try {
        const response = await axios.post(`${ROOT_URL}/users/${userId}/trade`, requestInfo);
        toast.success('Trade request successfully');
      } catch (error) {
        get().errorSlice.newError(error.message);
        toast.error(`Error sending trade request: ${error.message}`);
      }
    },

    updateTradeRequest: async (userId, tradeId, newStatus) => {
      try {
        const response = await axios.put(`${ROOT_URL}/users/${userId}/trade/${tradeId}`, newStatus);
        toast.success('Trade response sent!');
      } catch (error) {
        get().errorSlice.newError(error.message);
        toast.error(`Error sending trade reponse: ${error.message}`);
      }
    },

    fetchAllBooks: async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/books/all-uploaded`);
        set(({ biblioSlice }) => { biblioSlice.allBooks = response.data; }, false, 'user/fetchAllBooks');
      } catch (error) {
        toast.error(`Error loading books: ${error.message}`);
      }
    },

    getRelatedBooks: async (currentBook) => {
      if (!currentBook || !currentBook.genre) {
        console.error('Current book is invalid or missing genre:', currentBook);
        return [];
      }

      try {
        const response = await axios.get(`${ROOT_URL}/books/all-uploaded`);
        const allBooks = response.data;

        if (!Array.isArray(allBooks)) {
          console.error('Unexpected data format:', allBooks);
          return [];
        }

        const relatedBooks = allBooks.filter((book) => book
      && book.genre
      && book.id
      && book.genre === currentBook.genre
      && book.id !== currentBook.id).slice(0, 3);

        return relatedBooks;
      } catch (error) {
        console.error('Error fetching or processing books:', error);
        return [];
      }
    },
  };
}
