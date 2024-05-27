import { Room } from "../types/Room.js";

type GetAvailableRoomsParams = {
  arrivedAt: string;
  departedAt: string;
};

export const getAvailableRooms = async (
  _params: GetAvailableRoomsParams
): Promise<Room[]> => {
  throw new Error("Not implemented");
};
