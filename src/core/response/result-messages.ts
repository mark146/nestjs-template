import { ResultCode } from './result-code';

export const ResultMessages = {
  // General Success
  [ResultCode.SUCCESS]: "Success",

  // Email Verification Errors
  [ResultCode.ALREADY_VERIFIED_EMAIL]: "Already Verified Email",
  [ResultCode.ERR_INVALID_EMAIL_VERIFICATION_CODE]: "Error: Invalid email or verification code",
  [ResultCode.ERR_EMAIL_EXPIRED]: "Error: Email Expired",

  // Database Related Errors
  [ResultCode.ERR_DUPLICATE]: "Error: Duplicate Data",
  [ResultCode.ERR_TOO_LONG]: "Error: Data Too Long",
  [ResultCode.ERR_INVALID_FORM]: "Error: Invalid Data Form",
  [ResultCode.ERR_DATA_NOT_EXIST]: "Error: Data Not Found",
  [ResultCode.ERR_META_DATA_NOT_EXIST]: "Error: Meta Data Not Exist",
  [ResultCode.ERR_DATA_ALREADY_EXIST]: "Error: Data Already Exist",

  // Authentication and Authorization Errors
  [ResultCode.ERR_ACCESS_DENIED]: "Error: Access Denied",
  [ResultCode.ERR_WRONG_ID_PW]: "Error: ID or Password Is Wrong",
  [ResultCode.ERR_INVALID_SIGNATURE]: "Error: Invalid or tampered signature",
  [ResultCode.ERR_ADMIN_ID_ALREADY_EXIST]: "Error: Admin ID Already Exist",

  // Token Related Errors
  [ResultCode.ERR_TOKEN_NOT_EXIST]: "Error: Token Not Exist",
  [ResultCode.ERR_TOKEN_EXPIRED]: "Error: Token Expired",
  [ResultCode.ERR_TOKEN_WRONG]: "Error: Wrong Token",

  // General Errors
  [ResultCode.ERR_FAIL]: "Unexpected error occurred",
};
