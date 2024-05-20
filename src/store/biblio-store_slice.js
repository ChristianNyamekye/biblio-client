import axios from 'axios';

const ROOT_URL = '';
const API_KEY = '?key=biblio';

export default function createPostSlice(set, get) {
  return {
    allBooks: [], // all books in our store
    bookInfoToView: {}, // info a single past of a bok
    password: null,
    // fetches a single book requested by user upon clicking a book in view
    fetchBook: async (id) => {
      try {
        const response = await axios.get(`${ROOT_URL}/${id}${API_KEY}`);
        set(({ bookSlice }) => { bookSlice.bookInfoToView = response.data; }, false, 'posts/fetchBook');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    // fetches all books for main page display - fetches info when user has logged
    fetchAllBooks: async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/books${API_KEY}`);
        set(({ bookSlice }) => { bookSlice.allBooks = response.data; }, false, 'posts/fetchAllBooks');
      } catch (error) {
        get().errorSlice.newError(error.message);
      }
    },

    // uploading info for a book is provided and a new book post is created on front
    uploadBook: async (bookInfo) => {
      try {
        const response = await axios.put(`${ROOT_URL}/books${API_KEY}`, bookInfo); // backend request
        set(({ bookSlice }) => bookSlice.all.push(response.data)); // update resource for frontend
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },

    // receives information from the person intending to lend the book -> update if they accept request to lend book
    updateBookInfo: async (bookInfo) => {
      try {
        const response = await axios.put(`${ROOT_URL}/${bookInfo.id}${API_KEY}`, bookInfo);
        // replace the post the posts in view - front end logic that filter which books not rendered or show on search
        set(({ bookSlice }) => {
          bookSlice.all = bookSlice.all.map((oldPost) => (oldPost.id === bookInfo.id ? response.data : oldPost));
        });
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },

    // person intending to lend book can i delete their book
    deleteBook: async (id) => {
      try {
        await axios.delete(`${ROOT_URL}/books/${id}${API_KEY}`); // delete on the backend side
        set(({ bookSlice }) => {
          bookSlice.all = bookSlice.all.filter((book) => book.id !== id); // remove from the displayed books on front
        });
      } catch (error) {
        get().erroSlice.newError(error.message);
      }
    },

    // catched used user Id collections into the database can be requested here 
    fetchPassword: async (userId) => {
        try {
            const response = await axios.get(`${ROOT_URL}/books/${userId}${API_KEY}`);
            set (({ bookSlice }) => { bookSlice.password = response.data;}, false, 'posts/fetchPassword');
        }catch(error) {
            get().erroSlice.newError(error.message);
        }
    }

  };
}
