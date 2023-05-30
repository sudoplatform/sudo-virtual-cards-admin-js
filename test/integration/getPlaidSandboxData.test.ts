/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultLogger, ServiceError } from '@sudoplatform/sudo-common'
import {
  GetPlaidSandboxDataRequest,
  SudoVirtualCardsAdminClient,
} from '../../src'
import { setupVirtualCardsAdminClient } from './util/virtualCardsAdminLifecycle'

describe('SudoVirtualCardsAdminClient GetPlaidSandboxData Test Suite', () => {
  jest.setTimeout(240000)

  const log = new DefaultLogger('SudoVirtualCardsAdminClientIntegrationTests')

  let instanceUnderTest: SudoVirtualCardsAdminClient
  let beforeEachComplete = false

  function expectSetupComplete(): void {
    expect({ beforeEachComplete }).toEqual({ beforeEachComplete: true })
  }

  describe('GetPlaidSandboxData', () => {
    const institutionId = 'ins_109508'
    const username = 'custom_checking_500'

    beforeAll(async () => {
      const result = await setupVirtualCardsAdminClient(log)
      instanceUnderTest = result.virtualCardsAdminClient
      beforeEachComplete = true
    })

    it('returns sandbox data successfully', async () => {
      expectSetupComplete()

      const input: GetPlaidSandboxDataRequest = {
        institutionId,
        username,
      }
      const result = await instanceUnderTest.getPlaidSandboxData(input)

      expect(result).toBeDefined()
      expect(result.publicToken).toContain('public-sandbox')
      expect(result.accountMetadata[0].accountId).toBeDefined()
      expect(result.accountMetadata[0].subtype).toEqual('checking')
    })

    it('should throw error on invalid institution id', async () => {
      expectSetupComplete()

      const input: GetPlaidSandboxDataRequest = {
        institutionId: 'invalid-id',
        username,
      }
      await expect(
        instanceUnderTest.getPlaidSandboxData(input),
      ).rejects.toThrow(ServiceError)
    })
  })
})
