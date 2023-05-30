/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Response containing daily totals of active and cancelled virtual cards.
 */
export interface GetVirtualCardsActiveResponse {
  /**
   * Start date in time zone specified in request.
   */
  startDate: Date
  /**
   * End date in time zone specified in request.
   */
  endDate: Date
  /**
   * Timezone used in response.
   */
  timeZone: string
  /**
   * Number of active cards on each day in the range. Array will have n-days elements
   * where n-days is the number of full days represented by startDate and endDate.
   * A card is considered active on a day if it is active for any part of a day.
   */
  activeCards: number[]
}
