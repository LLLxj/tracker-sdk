import { getTime } from "@/utils";
import ErrorHelper from "@/utils/error-helper";
import type { TrackerOptions, ReportErrorData } from "@/types"

export const errorListener = (
  trackerOptions: TrackerOptions,
  callback: (data: ReportErrorData) => void
) => {

  window.addEventListener('error', (event: ErrorEvent) => {
    const errorType = event.error.name
    const errorMessage = event.error.message
    const errorHelper = new ErrorHelper()
    const errorInfo = errorHelper.handlerRejection(event)
    
    const { hasSameError, errorId, sessionId } = errorHelper.getIsReportId(`${errorType}_${errorMessage}`)
    if (hasSameError) {
      return;
    } 
    const data = {
      type: errorType,
      message: errorMessage,
      columnNumber: errorInfo.columnNumber,
      fileName: errorInfo.fileName,
      functionName: errorInfo.functionName,
      lineNumber: errorInfo.lineNumber,
      source: errorInfo.source,
      url: location.href,
      pathname: location.pathname,
      errorId,
      version: trackerOptions.version || '',
      clientId: trackerOptions.clientId,
      time: getTime(),
      sessionId,
    };
    callback(data);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.log('unhandledrejection');
    console.log(event)
    const data = {
      type: 'promise_error',
      message: event.reason,
      timestamp: getTime(),
    };
    // callback(data);
  });
};
