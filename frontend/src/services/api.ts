const api = {
  // createNewGameAttempt: async (
  //   req: NewGameAttemptReq
  // ): Promise<NewGameAttemptRes> => {
  //   return handler(http.post("/api/game_attempts", req));
  // },
};

export const handler = async (req: Promise<{ data: any }>) => {
  try {
    const { data } = await req;
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default api;
