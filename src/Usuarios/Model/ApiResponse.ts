export interface ApiResponse<T> {
    data: never[];
    success: boolean;
    message: string;
    result: T;
  }
  export interface ApiResponseWithData<T> {
    success: boolean;
    message: string;
    data: T;
  }