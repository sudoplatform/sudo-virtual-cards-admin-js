/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultLogger, UnknownGraphQLError } from '@sudoplatform/sudo-common'
import { SudoVirtualCardsAdminClient } from '../../src'
import { setupVirtualCardsAdminClient } from './util/virtualCardsAdminLifecycle'

describe('SudoVirtualCardsAdminClient SetFundingSourceToRequireRefresh Test Suite', () => {
  jest.setTimeout(240000)

  const log = new DefaultLogger('SudoVirtualCardsAdminClientIntegrationTests')

  let instanceUnderTest: SudoVirtualCardsAdminClient
  let beforeEachComplete = false

  function expectSetupComplete(): void {
    expect({ beforeEachComplete }).toEqual({ beforeEachComplete: true })
  }

  describe('SetFundingSourceToRequireRefresh', () => {
    beforeAll(async () => {
      const result = await setupVirtualCardsAdminClient(log)
      instanceUnderTest = result.virtualCardsAdminClient
      beforeEachComplete = true
    })

    it('should throw error on invalid funding source id', async () => {
      expectSetupComplete()

      await expect(
        instanceUnderTest.setFundingSourceToRequireRefresh('invalid_id'),
      ).rejects.toThrow(UnknownGraphQLError)
    })
  })
})
