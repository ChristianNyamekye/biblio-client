import axios from 'axios';

const ROOT_URL = 'https://project-api-biblio.onrender.com/api';
const API_KEY = '?key=biblio';
// const ROOT_URL = 'http://localhost:9090/api';

export default function createBookSlice(set, get) {
  return {
    allBooks: [], // all books in our store
    bookInfoToView: {}, // info a single past of a book
    userProfileInformation: {},
    currUserBooks: [],
    currUserWishList: [],

    createUser: async (userInfo) => {
      try {
        console.log('user info', userInfo);
        const response = await axios.post(`${ROOT_URL}/register`, userInfo);
        console.log('user response', response.data);
        set(
          ({ biblioSlice }) => {
            biblioSlice.userProfileInformation = response.data;
          },
          false,
          'user/createUser',
        );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    loginUser: async (userInfo) => {
      try {
        console.log(userInfo);
        const response = await axios.post(`${ROOT_URL}/login`, userInfo);
        set(
          ({ biblioSlice }) => {
            biblioSlice.userProfileInformation = response.data;
          },
          false,
          'user/loginUser',
        );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    fetchUser: async (userId) => {
      try {
        const response = await axios.get(`${ROOT_URL}/users/${userId}`);
        set(
          ({ biblioSlice }) => {
            biblioSlice.userProfileInformation = response.data;
          },
          false,
          'user/fetchProfile',
        );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    fetchUserBooks: async (userId) => {
      try {
        console.log('in store', userId);
        const response = await axios.get(
          `${ROOT_URL}/users/getbooks/${userId}`,
        );
        console.log('in store', response);
        set(
          ({ biblioSlice }) => {
            biblioSlice.currUserBooks = response.data;
          },
          false,
          'user/fetchUserBooks',
        );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    fetchUserWishList: async (userId) => {
      try {
        console.log('in store', userId);
        // /users/:userId/wishlist
        const response = await axios.get(
          `${ROOT_URL}/users/${userId}/wishlist`,
        );
        console.log('in store', response);
        set(
          ({ biblioSlice }) => {
            biblioSlice.currUserWishList = response.data;
          },
          false,
          'user/fetchUserWishlist',
        );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    // fetches a single book requested by user upon clicking a book in view
    fetchBook: async (bookId, fromProfile) => {
      try {
        let response;
        if (fromProfile) {
          response = await axios.get(`${ROOT_URL}/profile/${bookId}${API_KEY}`);
        } else {
          response = await axios.get(`${ROOT_URL}/books/${bookId}${API_KEY}`);
        }
        set(
          ({ biblioSlice }) => {
            biblioSlice.bookInfoToView = response.data;
          },
          false,
          'posts/fetchBook',
        );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    sendTradeRequest: async (userId, requestInfo) => {
      try {
        console.log('trade in store', userId, requestInfo);
        const response = await axios.post(`${ROOT_URL}/users/${userId}/trade`, requestInfo);
        console.log('in store', response);
        set(({ biblioSlice }) => { biblioSlice.currUserWishList = response.data; }, false, 'user/fetchUserWishlist');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    // home - fetch all books on database
    fetchAllBooks: async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/books/all-uploaded`);
        set(
          ({ biblioSlice }) => {
            biblioSlice.allBooks = response.data;
          },
          false,
          'user/fetchAllBooks',
        );
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    // uploading info for a book is provided and a new book post is created on front
    uploadBook: async (bookInfo, fromProfile) => {
      try {
        let response;
        if (fromProfile) {
          response = await axios.put(`${ROOT_URL}/books${API_KEY}`, bookInfo);
        } else {
          response = await axios.put(`${ROOT_URL}/books${API_KEY}`, bookInfo); // backend request
        }
        set(({ biblioSlice }) => biblioSlice.allBooks.push(response.data)); // update resource for frontend
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },

    // receives information from the person intending to lend the book -> update if they accept request to lend book
    updateBookInfo: async (bookInfo, fromProfile) => {
      try {
        let response;
        if (fromProfile) {
          response = await axios.put(
            `${ROOT_URL}/profile/${bookInfo.id}${API_KEY}`,
            bookInfo,
          );
        } else {
          response = await axios.put(
            `${ROOT_URL}/books/${bookInfo.id}${API_KEY}`,
            bookInfo,
          );
        }
        // replace the post the posts in view - front end logic that filter which books not rendered or show on search
        set(({ biblioSlice }) => {
          biblioSlice.allBooks = biblioSlice.allBooks.map((oldPost) => (oldPost.id === bookInfo.id ? response.data : oldPost));
        });
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },

    // person intending to lend book can i delete their book
    deleteBook: async (id) => {
      try {
        await axios.delete(`${ROOT_URL}/display/${id}${API_KEY}`); // delete on the backend side
        set(({ biblioSlice }) => {
          biblioSlice.allBooks = biblioSlice.allBooks.filter(
            (book) => book.id !== id,
          ); // remove from the displayed books on front
        });
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },

    // fetchUserProfileInfo: async (userId) => {
    //   try {
    //     const response = await axios.get(`${ROOT_URL}/profile/${userId}`);
    //     set(({ biblioSlice }) => { biblioSlice.userProfileInformation = response.data; }, false, 'posts/fetchUserProfileInfo');
    //   } catch (error) {
    //     get().errorSlice.newError(error.message);
    //   }
    // },
  };
}
