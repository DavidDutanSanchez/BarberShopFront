export type GlobalQueryParams<T> = {
  search?: string
  page?: number
  pageSize?: number
  isOrderByDescending?: boolean
  orderBy?: keyof T
  fechaInicio?: string;
  fechaFin?: string;
}
