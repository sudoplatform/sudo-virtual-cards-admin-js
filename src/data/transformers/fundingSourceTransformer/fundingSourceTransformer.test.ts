import { ServiceError } from '@sudoplatform/sudo-common'
import {
  defaultBankAccountFundingSourceEntity,
  defaultBankAccountFundingSourceGraphQL,
} from '../bankAccountFundingSourceTransformer/bankAccountFundingSourceTransformer.test'
import {
  defaultCreditCardFundingSourceEntity,
  defaultCreditCardFundingSourceGraphQL,
} from '../creditCardFundingSourceTransformer/creditCardFundingSourceTransformer.test'
import { FundingSourceTransformer } from './fundingSourceTransformer'

describe('FundingSourceTransformer tests', () => {
  it('should throw `ServiceError` when transforming unrecognized entity to graphql', () => {
    let caughtError
    const expectedError = new ServiceError(
      'Unrecognized funding source entity type.',
    )

    try {
      FundingSourceTransformer.toGraphQL({} as any)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).toEqual(expectedError)
  })

  it('should throw `ServiceError` when transforming unrecognized graphql to entity', () => {
    let caughtError
    const expectedError = new ServiceError(
      'Unrecognized funding source graphql type.',
    )

    try {
      FundingSourceTransformer.toEntity({} as any)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).toEqual(expectedError)
  })

  describe('BankAccountFundingSource', () => {
    it('should transform from entity to graphql', () => {
      expect(
        FundingSourceTransformer.toGraphQL(
          defaultBankAccountFundingSourceEntity,
        ),
      ).toEqual(defaultBankAccountFundingSourceGraphQL)
    })

    it('should transform from graphql to entity', () => {
      expect(
        FundingSourceTransformer.toEntity(
          defaultBankAccountFundingSourceGraphQL,
        ),
      ).toEqual(defaultBankAccountFundingSourceEntity)
    })
  })

  describe('CreditCardFundingSource', () => {
    it('should transform from entity to graphql', () => {
      expect(
        FundingSourceTransformer.toGraphQL(
          defaultCreditCardFundingSourceEntity,
        ),
      ).toEqual(defaultCreditCardFundingSourceGraphQL)
    })

    it('should transform from graphql to entity', () => {
      expect(
        FundingSourceTransformer.toEntity(
          defaultCreditCardFundingSourceGraphQL,
        ),
      ).toEqual(defaultCreditCardFundingSourceEntity)
    })
  })
})
