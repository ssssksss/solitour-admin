import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";


export type CategoryType = {
  id: number;
  name: string;
  childrenCategories: {
    id: number;
    name: string;
    parentCategoryType: {
      id: number;
      name: string;
    };
  }[];
};

// 2. 상태 인터페이스 정의
interface InformationState {
  categories: CategoryType[];
}

// 3. 액션 인터페이스 정의
interface InformationActions {
  initialize: () => void;
  setCategories: (data: CategoryType[]) => void;
}

// 4. 초기 상태 정의
const initialState: InformationState = {
  categories: [],
};

// 5. 상태 및 액션 생성
const informationStore: StateCreator<InformationState & InformationActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () => set(initialState),
  setCategories: (data) => set({ categories: data }),
});

const useInformationStore = create<
  InformationState & InformationActions
>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(informationStore)
    : informationStore,
);

export type useInformationStoreType = InformationState & InformationActions;

export default useInformationStore;
