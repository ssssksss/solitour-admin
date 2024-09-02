
export async function fetchWithAuth(url: string, options = {}, retries = 1) {

  try {
    const response = await fetch(url, options);
    if (response.status === 401 && retries > 0) {
      // 토큰 갱신
      const data = await fetch(
        `/api/auth/refresh-access-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (data.status == 401) {
        return Promise.reject({
          status: 401,
          message: "실패",
        });
      }
      // TODO: 추가적인 에러처리 필요
      return await fetchWithAuth(url, options, 0); // 요청 재시도
    }
    return response;
  } catch (error) {
    throw error;
  }
}