export interface PaginateParams {
  page?: number;
  total?: number;
  skip?: number;
  take?: number;
  size?: number;
}

export interface Paginate {
  currentPage: number;
  size: number;
  lastPage: number;
  nextPage: number;
  prevPage: number;
}

export const paginateAggregation = (params: PaginateParams): Paginate => {
  const currentPage: number = Math.round(params.page);
  const size: number = Math.round(params.take);

  const lastPage: number = Math.ceil(params.total / size);
  const nextPage: number = currentPage + 1 > lastPage ? null : currentPage + 1;
  const prevPage: number = currentPage - 1 < 1 ? null : currentPage - 1;
  const countSize: number = currentPage === lastPage ? params.total - (currentPage - 1) * size : size;

  return {
    size: countSize,
    currentPage,
    nextPage,
    lastPage,
    prevPage,
  };
};

export const paginateTakeSkipCalculation = (params: PaginateParams): { take: number; skip: number; page: number } => {
  const take: number = params?.size ?? 10;
  const page: number = params?.page ?? 1;
  const skip: number = (page - 1) * take;

  return { take, skip, page };
};
