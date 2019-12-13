import { END_OF_MESSAGE, ALREADY_IN_CLI_MODE } from './constants';

const areMessagesEqual = (messageA: number[], messageB: number[]): boolean =>
  messageA.length &&
  messageA.every((integer, index) => {
    return messageB[index] === integer;
  });

export const isMessageComplete = (integers: number[]): boolean => {
  const tailOfMessage = integers.slice(-END_OF_MESSAGE.length);

  return (
    areMessagesEqual(END_OF_MESSAGE, tailOfMessage) ||
    areMessagesEqual(integers, ALREADY_IN_CLI_MODE)
  );
};
