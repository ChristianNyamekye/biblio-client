import axios from 'axios';

const ROOT_URL = '';
const API_KEY = '?key=biblio';

export default function createPostSlice(set, get) {
  return {
    allBooks: [], // all books in our store
    bookInfoToView: {}, // info a single past of a bok
    userProfileInformation: [],

    // fetches a single book requested by user upon clicking a book in view
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
        get().errorSlice.newError(error.message);
      }
    },

    // home - fetch all books on database
    fetchAllBooks: async () => {
      try {
        const response = await axios.get(`${ROOT_URL}${API_KEY}`);
        set(({ biblioSlice }) => { biblioSlice.allBooks = response.data; }, false, 'posts/fetchAllBooks');
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
          response = await axios.put(`${ROOT_URL}/profile/${bookInfo.id}${API_KEY}`, bookInfo);
        } else {
          response = await axios.put(`${ROOT_URL}/books/${bookInfo.id}${API_KEY}`, bookInfo);
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
          biblioSlice.allBooks = biblioSlice.allBooks.filter((book) => book.id !== id); // remove from the displayed books on front
        });
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },

    fetchUserProfileInfo: async (userId) => {
      try {
        const response = await axios.get(`${ROOT_URL}/profile${API_KEY}`);
        set(({ biblioSlice }) => { biblioSlice.userProfileInformation = response.data; }, false, 'posts/fetchUserProfileInfo');
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },
  };
}
