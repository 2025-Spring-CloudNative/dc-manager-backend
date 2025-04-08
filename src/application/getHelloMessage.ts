import { Message } from "../domain/message";

export const getHelloMessage = (): Message => {
  return { text: "hello from server" };
};