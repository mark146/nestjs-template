/*
* 1000-1999: 데이터 관련 에러
* 3000-3999: 토큰 관련 에러
* 4000-4999: 인증 관련 에러
* 5000-5999: 시스템 및 기타 에러
* */
export enum ResultCode {
  SUCCESS = "0000",
  ALREADY_VERIFIED_EMAIL = "0001",
  // 1000-1999: Database Related Errors
  ERR_DUPLICATE = "1001",
  ERR_TOO_LONG = "1002",
  ERR_INVALID_FORM = "1003",
  ERR_DATA_NOT_EXIST = "1004",
  ERR_META_DATA_NOT_EXIST = "1005",
  ERR_DATA_ALREADY_EXIST = "1006",
  // 2000-2999: Authorization and Authentication Errors
  ERR_ACCESS_DENIED = "2001",
  // 3000-3999: Token Related Errors
  ERR_TOKEN_NOT_EXIST = "3001",
  ERR_TOKEN_EXPIRED = "3002",
  ERR_TOKEN_WRONG = "3003",
  // 4000-4999: User Input Errors
  ERR_WRONG_ID_PW = "4001",
  ERR_INVALID_SIGNATURE = "4002",
  ERR_INVALID_EMAIL_VERIFICATION_CODE = "4003",
  ERR_EMAIL_EXPIRED = "4004",
  ERR_ADMIN_ID_ALREADY_EXIST = "4005",
  // 5000-5999: General Errors
  ERR_FAIL = "5000",
}
