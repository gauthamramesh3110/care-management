export interface Patient {
  id: string;
  FIRST?: string;
  LAST?: string;
  PREFIX?: string;
  SUFFIX?: string;
  BIRTHDATE?: string;
  ZIP?: number;
  ADDRESS?: string;
  CITY?: string;
  STATE?: string;
  PHONE?: string;
  EMAIL?: string;
  [key: string]: unknown;
}
