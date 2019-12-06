export interface FlatPromise<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason: string) => void;
}

export const makeFlatPromise = <T>(): FlatPromise<T> => {
  let resolveRef: (value: T | PromiseLike<T>) => void;
  let rejectRef: (reason: string) => void;

  const promise = new Promise<T>((resolve, reject) => {
    resolveRef = resolve;
    rejectRef = reject;
  });

  return {
    promise,
    resolve: resolveRef,
    reject: rejectRef,
  };
};
