/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BankAccountFundingSource } from './bankAccountFundingSource'
import { CreditCardFundingSource } from './creditCardFundingSource'

export type FundingSource = BankAccountFundingSource | CreditCardFundingSource
