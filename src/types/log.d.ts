export interface LogEvent {
  level: 'error' | 'success' | 'info' | 'warnning';
  message: string;
}

