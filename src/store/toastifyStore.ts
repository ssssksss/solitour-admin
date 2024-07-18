import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface TOASTIFY_STATE {
  type: "success" | "error" | "warning" | "info" | "default";
  message: string;
};


// 2. 액션 인터페이스 정의
interface ToastifyActions {
  initialize: () => void;
  setToastify: (data: Partial<TOASTIFY_STATE>) => void;
}

// 3. 초기 상태 정의
const initialState: TOASTIFY_STATE = {
    type: "info",
    message: "접속 완료",
};

// 4. 상태 및 액션 생성
const toastifyStore: StateCreator<TOASTIFY_STATE & ToastifyActions> = (set, get) => ({
  ...initialState,
  initialize: () => set(initialState),
  setToastify: (data) =>
    set(() => ({
      ...data,
    })),
});

const useToastifyStore = create<TOASTIFY_STATE & ToastifyActions>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(toastifyStore)
    : toastifyStore,
);

export type useToastifyStoreType = TOASTIFY_STATE & ToastifyActions;

export default useToastifyStore;
