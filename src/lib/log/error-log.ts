import type { TrackerOptions, ReportErrorData } from '@/types';
import { fetchUploader } from '../uploader';
import { log } from '@/utils';

class ErrorLog {
  options: TrackerOptions;

  constructor(options: TrackerOptions) {
    this.options = options;
  }

  async sendLogsToServer(issue: ReportErrorData) {
    try {
      const requestUrl = `${this.options.host}${this.options.reportErrorPath}`
      await fetchUploader(
        requestUrl,
        { ...issue },
        {
          Authorization: this.options.authorization,
        }
      );
      if (this.options.debug) {
        log({
          level: 'success',
          message: 'error logs sent successfully'
        });
      }
      
    } catch (error) {
      if (this.options.debug) {
        log({
          level: 'error',
          message: JSON.stringify(error)
        });
      }
    }
  }
}

export default ErrorLog