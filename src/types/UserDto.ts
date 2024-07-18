// Request 요청 결과 Dto
export interface userResponseDto {
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

export interface usersResponseDto extends userResponseDto {
  name: string;
  createdAt: string;
  deletedAt: string;
  latestLoginAt: string;
  isActive: boolean;
  provider: string;
}