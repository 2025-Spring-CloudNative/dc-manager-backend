import { Request, Response } from "express";
import { messageRepository } from "../../persistence/messageRepo";

export const getHello = (req: Request, res: Response) => {
  const message = messageRepository.get();
  res.send(message.text);
};