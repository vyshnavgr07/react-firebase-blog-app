import { create } from 'zustand';
const localusers=JSON.parse(localStorage.getItem('user'))

const useAuthStore = create((set) => ({
  
  user:localusers || null, 
  setUser: (userData) => set(() => ({ user: { ...userData } })),
  clearUser: () => set(() => ({ user: null })),
}));

export default useAuthStore;
