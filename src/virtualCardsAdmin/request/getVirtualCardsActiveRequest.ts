/**
 * Request used to retrieve virtual cards activity for a given period of time.
 */
export interface GetVirtualCardsActiveRequest {
  /**
   * Starting date range of transactions to search.
   * Start date is rounded down to the beginning of the day in which startDate
   * occurs according to timeZone.
   */
  startDate: Date
  /**
   * Ending date range of transactions to search.
   * End date is rounded up to the end of the day in which endDate
   * occurs according to timeZone.
   */
  endDate: Date
  /**
   * Timezone in which to determine end of a day. Default is UTC.
   * Timezone is named according to POSIX time zone naming e.g. "America/New_York" or
   * "-04:00" or "Z" or "UTC".
   */
  timeZone: string
}
