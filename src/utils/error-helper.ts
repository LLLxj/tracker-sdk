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
    errorId: string,
  } { 
    const errorId = this.getErrorId(error)
    const errorIds = this.sessionManage.getErrorIds();
    let hasSameError: boolean;
    if (errorIds?.includes(errorId)) {
      hasSameError = true
    } else {
      hasSameError = false
      this.sessionManage.updateErrorId(errorId)
    }
    return {
      hasSameError,
      errorId
    }
  }
}

export default ErrorHelper


