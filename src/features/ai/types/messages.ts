export type TMessageType = 'system' | 'user';
export type TPlainMessage = {
  type: TMessageType;
  text: string;
};
