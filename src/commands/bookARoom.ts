type BookARoomParams = {
  arrivedAt: string;
  customerName: string;
  departedAt: string;
  roomName: string;
};

export const bookARoom = async (_params: BookARoomParams): Promise<void> => {
  throw new Error("Not implemented");
};
