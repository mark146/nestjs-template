import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';

/**
 * 페이지네이션 관련 유틸리티 클래스
 * 순수 정적 메서드만 포함하는 유틸리티 클래스로,
 * 공통 모듈 계층의 원칙에 따라 NestJS 의존성 없이 구현됨
 */
export class PaginationUtils {
  /**
   * 페이지네이션을 위한 오프셋 계산
   * @param page 현재 페이지 (1부터 시작)
   * @param limit 페이지당 항목 수
   * @returns 계산된 오프셋 값
   */
  static calculateOffset(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  /**
   * 페이지네이션 결과 객체 생성
   * @param data 페이지네이션된 데이터 항목 배열
   * @param total 전체 항목 수
   * @param page 현재 페이지 (1부터 시작)
   * @param limit 페이지당 항목 수
   * @returns 페이지네이션 결과 객체
   */
  static createPaginatedResult<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T> {
    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}