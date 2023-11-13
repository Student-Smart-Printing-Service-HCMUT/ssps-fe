import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { userService } from '@services/common';

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    userStatus: 'UNINIT',
    userData: {
      id: '',
      email: ''
    },
    getUserData: async () => {
      set(() => ({ userStatus: 'PENDING' }));
      try {
        const userData = await userService.getInfo();
        set(() => ({ userData: userData, userStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ userStatus: 'REJECT' }));
      }
    }
  }))
);
