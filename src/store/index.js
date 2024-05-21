import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createBookSlice from './biblio-store_slice';

const useStore = create(devtools(immer((...args) => ({
  biblioSlice: createBookSlice(...args),
}))));

export default useStore;
