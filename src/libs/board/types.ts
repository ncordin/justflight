export interface BoardConnection {
  onConnect: (handler: () => void) => void;
  onUnplugged: (handler: any) => void;
  sendCommand: (command: string) => Promise<string>;
  set: (property: string, value: string | number) => Promise<string>;
  get: (property: string) => Promise<string>;
}
