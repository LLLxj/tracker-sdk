import { v4 } from 'uuid';
import type { Session as SessionInfo } from '@/types'

class Session {

  sessionIdKey: string;

  constructor() {
    this.sessionIdKey = 'trackSession'
  }

  generateSessionId() {
    const newSessionId = v4();
    return newSessionId;
  }

  fresh() {
    const sessionInfo = {
      sessionId: this.generateSessionId(),
      errorIds: []
    }
    sessionStorage.setItem(this.sessionIdKey, JSON.stringify(sessionInfo))
  }

  getSessionInfo(): SessionInfo {
    const sessionInfoStr = sessionStorage.getItem(this.sessionIdKey);
    if (!sessionInfoStr) {
      return {
        sessionId: this.generateSessionId(),
        errorIds: []
      }
    }
    return JSON.parse(sessionInfoStr)
  }

  getSessionId() {
    const sessionInfo = this.getSessionInfo()
    return sessionInfo.sessionId
  }

  getErrorIds() {
    const sessionInfo = this.getSessionInfo()
    return sessionInfo.errorIds
  }

  updateErrorId(errorId: string) {
    const sessionInfo = this.getSessionInfo()
    const mergeErrorIds = [...sessionInfo.errorIds, errorId]
    const formatSessionInfo = {
      ...sessionInfo,
      errorIds: [...new Set(mergeErrorIds)]
    }
    sessionStorage.setItem(this.sessionIdKey, JSON.stringify(formatSessionInfo))
  }
}

export default Session