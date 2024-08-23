import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";


export type CategoryType = {
  id: number;
  name: string;
};

// 2. 상태 인터페이스 정의
interface GatheringState {
  categories: CategoryType[];
}

// 3. 액션 인터페이스 정의
interface GatheringActions {
  initialize: () => void;
  setCategories: (data: CategoryType[]) => void;
}

// 4. 초기 상태 정의
const initialState: GatheringState = {
  categories: [],
};

// 5. 상태 및 액션 생성
const gatheringStore: StateCreator<GatheringState & GatheringActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () => set(initialState),
  setCategories: (data) => set({ categories: data }),
});

const useGatheringStore = create<
  GatheringState & GatheringActions
>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(gatheringStore)
    : gatheringStore,
);

export type useGatheringStoreType = GatheringState & GatheringActions;

export default useGatheringStore;
