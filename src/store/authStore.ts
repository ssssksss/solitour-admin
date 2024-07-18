import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface AuthState {
  age: number; // 연도
  email: string;
  id: number;
  isAdmin: boolean;
  nickname: string;
  phoneNumber: string;
  sex: string; // "male, female"
  userImage: {
    id: number;
    address: string;
    createdDate: string; // "2024-07-12",
  };
  userStatus: string; // "활성화" | "휴먼" | "삭제" | "관리자" | "";
}

// 2. 액션 인터페이스 정의
interface AuthActions {
  initialize: () => void;
  setUser: (data: Partial<AuthState>) => void;
}

// 3. 초기 상태 정의
const initialState: AuthState = {
  id: NaN,
  userStatus: "",
  nickname: "",
  age: 0,
  sex: "",
  email: "",
  phoneNumber: "",
  isAdmin: false,
  userImage: {
    id: NaN,
    address: "",
    createdDate: "",
  }
};

// 4. 상태 및 액션 생성
const authStore: StateCreator<AuthState & AuthActions> = (set, get) => ({
  ...initialState,
  initialize: () => set(initialState),
  setUser: (data) =>
    set(() => ({
      ...data,
    })),
});

const useAuthStore = create<AuthState & AuthActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(authStore) : authStore,
);

export type useAuthStoreType = AuthState & AuthActions;

export default useAuthStore;
