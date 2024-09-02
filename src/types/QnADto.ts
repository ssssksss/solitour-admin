// 답변 타입
export interface QnAMessageType {
  id: number;
  createdAt: string; // 문자열로 변경
  userId: number;
  content: string;
}

// QnA 데이터 타입
export interface QnADetailType {
  id: number;
  title: string;
  createdAt: string; // 문자열로 변경
  status: "WAIT" | "ANSWER" | "CLOSED";
  updatedAt: string; // 문자열로 변경
  categoryName: string;
  userId: number;
  qnaMessage: QnAMessageType[];
}

// QnA 리스트 데이터 타입
export type QnAListElementType = Omit<QnADetailType, "qnaMessage">;