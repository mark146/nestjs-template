/**
 * 페이지네이션된 결과를 나타내는 인터페이스
 * 시스템 전체에서 일관된 페이지네이션 응답 구조를 제공함
 */
export interface PaginatedResult<T> {
  /** 페이지네이션된 데이터 항목 배열 */
  data: T[];

  /** 페이지네이션 메타데이터 */
  meta: {
    /** 전체 항목 수 */
    total: number;

    /** 현재 페이지 (1부터 시작) */
    page: number;

    /** 페이지당 항목 수 */
    limit: number;

    /** 전체 페이지 수 */
    totalPages: number;
  };
}