// src/Personas/Model/ApiResponse.ts
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    result: {
      data: T;
      currentPage: number;
      pageSize: number;
      totalPages: number;
      total: number;
    };
  }
  