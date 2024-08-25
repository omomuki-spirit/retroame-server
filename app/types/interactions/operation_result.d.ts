interface TOperationError {
  type:    string
  code:    string
  options: Record<string, string | Integer>
};

export type TOperationResult<T> = Promise<
  { value: T, error?: undefined } |
  { value?: undefined, error: TOperationError }
>;
