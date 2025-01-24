import ErrorStackParser from 'error-stack-parser'
import type { ErrorInfo } from '@/types'
import SessioManage from './session'

class ErrorHelper {

  sessionManage;

  constructor() {
    this.sessionManage = new SessioManage()
  }

  handlerRejection(ev: ErrorEvent): ErrorInfo {
    const target = ev.target
    let stackFrame = ErrorStackParser.parse(!target ? ev : ev.error)[0]
    return stackFrame as ErrorInfo
  }
  
  // 生成唯一错误id
  getErrorId(val: string): string {
    return window.btoa(decodeURIComponent(encodeURIComponent(val)))
  }
  
  /**
   * 是否生成过error
   * @param error `${event.error.name}_${event.error.message}`
   * @returns 
   */
  getIsReportId(error: string): {
    hasSameError: boolean;
    errorId: string;
    sessionId: string;
  } { 
    const errorId = this.getErrorId(error)
    const sessionInfo = this.sessionManage.getSessionInfo();
    const errorIds = sessionInfo.errorIds;
    const sessionId = sessionInfo.sessionId;
    let hasSameError: boolean;
    if (errorIds?.includes(errorId)) {
      hasSameError = true
    } else {
      hasSameError = false
      this.sessionManage.updateErrorId(errorId)
    }
    return {
      hasSameError,
      errorId,
      sessionId,
    }
  }
}

export default ErrorHelper


