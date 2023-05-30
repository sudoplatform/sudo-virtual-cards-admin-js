/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultApiClientManager } from '@sudoplatform/sudo-api-client'
import { DefaultConfigurationManager, Logger } from '@sudoplatform/sudo-common'
import { DefaultSudoEntitlementsClient } from '@sudoplatform/sudo-entitlements'
import { DefaultSudoEntitlementsAdminClient } from '@sudoplatform/sudo-entitlements-admin'
import { DefaultSudoSecureIdVerificationClient } from '@sudoplatform/sudo-secure-id-verification'
import {
  DefaultSudoUserClient,
  SudoUserClient,
  TESTAuthenticationProvider,
} from '@sudoplatform/sudo-user'
import {
  DefaultSudoVirtualCardsClient,
  SudoVirtualCardsClient,
  SudoVirtualCardsClientOptions,
} from '@sudoplatform/sudo-virtual-cards'
import * as fs from 'fs'
import { v4 } from 'uuid'
import {
  DefaultVirtualCardsAdminClient,
  SudoVirtualCardsAdminClient,
} from '../../../src/virtualCardsAdmin/virtualCardsAdminClient'
import { EntitlementsBuilder } from './entitlements'

const configFile = 'config/sudoplatformconfig.json'
const registerKeyFile = 'config/register_key.private'
const registerKeyIdFile = 'config/register_key.id'
const registerKey =
  process.env.REGISTER_KEY?.trim() ||
  fs.readFileSync(registerKeyFile).toString()
const registerKeyId =
  process.env.REGISTER_KEY_ID?.trim() ||
  fs.readFileSync(registerKeyIdFile).toString().trim()

const adminApiKeyFile = 'config/api.key'
let adminApiKey: string | undefined
if (fs.existsSync(adminApiKeyFile)) {
  adminApiKey = fs.readFileSync(adminApiKeyFile).toString().trim()
} else {
  adminApiKey = process.env.ADMIN_API_KEY?.trim() || 'IAM'
}

interface SetupVirtualCardsClientOutput {
  virtualCardsAdminClient: SudoVirtualCardsAdminClient
  virtualCardsClient: SudoVirtualCardsClient
  userClient: SudoUserClient
}

const testAuthenticationProvider = new TESTAuthenticationProvider(
  'vca-js-test',
  registerKey,
  registerKeyId,
  { 'custom:entitlementsSet': 'TEST' },
)

export const setupVirtualCardsAdminClient = async (
  log: Logger,
): Promise<SetupVirtualCardsClientOutput> => {
  log.info('Setting up VirtualCardsAdminClient')
  try {
    if (!adminApiKey) {
      throw new Error('ADMIN_API_KEY must be set')
    }

    DefaultConfigurationManager.getInstance().setConfig(
      fs.readFileSync(configFile).toString(),
    )

    const virtualCardsAdminClient = new DefaultVirtualCardsAdminClient(
      adminApiKey,
    )

    const userClient = new DefaultSudoUserClient({ logger: log })

    const username = await userClient.registerWithAuthenticationProvider(
      testAuthenticationProvider,
      `virtualCardsAdmin-JS-SDK-${v4()}`,
    )
    log.debug('username', { username })
    await userClient.signInWithKey()

    DefaultApiClientManager.getInstance().setAuthClient(userClient)

    const entitlementsClient = new DefaultSudoEntitlementsClient(userClient)
    const entitlementsAdminClient = new DefaultSudoEntitlementsAdminClient(
      adminApiKey,
    )
    await new EntitlementsBuilder()
      .setEntitlementsClient(entitlementsClient)
      .setEntitlementsAdminClient(entitlementsAdminClient)
      .setLogger(log)
      .apply()
      .catch((err) => {
        console.log('Error applying entitlements', { err })
        throw err
      })

    const identityVerificationClient =
      new DefaultSudoSecureIdVerificationClient({
        sudoUserClient: userClient,
      })
    await identityVerificationClient.verifyIdentity({
      firstName: 'John',
      lastName: 'Smith',
      address: '222333 Peachtree Place',
      city: 'Atlanta',
      state: 'GA',
      postalCode: '30318',
      country: 'US',
      dateOfBirth: '1975-02-28',
    })

    const options: SudoVirtualCardsClientOptions = {
      sudoUserClient: userClient,
    }
    const virtualCardsClient = new DefaultSudoVirtualCardsClient(options)

    return {
      virtualCardsAdminClient,
      virtualCardsClient,
      userClient,
    }
  } catch (err) {
    log.error(`${setupVirtualCardsAdminClient.name} FAILED`)
    throw err
  }
}
