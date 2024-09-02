export interface NoticeType {
  id: number;
  title: string;
  content: string;
  createdAt: string; // Date 타입으로 처리하고 싶다면 string 대신 Date로 바꿀 수 있습니다.
  categoryName: string;
  isDeleted: boolean;
}
