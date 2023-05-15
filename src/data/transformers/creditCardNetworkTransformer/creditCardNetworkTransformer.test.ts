import { CreditCardNetworkTransformer } from './creditCardNetworkTransformer'
import { CreditCardNetwork as CreditCardNetworkEntity } from '../../../entities/creditCardNetwork'
import { CreditCardNetwork as CreditCardNetworkGraphQL } from '../../../gen/graphqlTypes'

export const defaultCreditCardNetworkEntity = CreditCardNetworkEntity.MasterCard
export const defaultCreditCardNetworkGraphQL =
  CreditCardNetworkGraphQL.Mastercard

describe('CardStateTransformer tests', () => {
  it.each`
    entity                                | graphQL
    ${CreditCardNetworkEntity.Amex}       | ${CreditCardNetworkGraphQL.Amex}
    ${CreditCardNetworkEntity.Diners}     | ${CreditCardNetworkGraphQL.Diners}
    ${CreditCardNetworkEntity.Discover}   | ${CreditCardNetworkGraphQL.Discover}
    ${CreditCardNetworkEntity.JCB}        | ${CreditCardNetworkGraphQL.Jcb}
    ${CreditCardNetworkEntity.MasterCard} | ${CreditCardNetworkGraphQL.Mastercard}
    ${CreditCardNetworkEntity.Other}      | ${CreditCardNetworkGraphQL.Other}
    ${CreditCardNetworkEntity.UnionPay}   | ${CreditCardNetworkGraphQL.Unionpay}
    ${CreditCardNetworkEntity.Visa}       | ${CreditCardNetworkGraphQL.Visa}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(CreditCardNetworkTransformer.toGraphQL(entity)).toStrictEqual(
        graphQL,
      )
    },
  )

  it.each`
    graphQL                                | entity
    ${CreditCardNetworkGraphQL.Amex}       | ${CreditCardNetworkEntity.Amex}
    ${CreditCardNetworkGraphQL.Diners}     | ${CreditCardNetworkEntity.Diners}
    ${CreditCardNetworkGraphQL.Discover}   | ${CreditCardNetworkEntity.Discover}
    ${CreditCardNetworkGraphQL.Jcb}        | ${CreditCardNetworkEntity.JCB}
    ${CreditCardNetworkGraphQL.Mastercard} | ${CreditCardNetworkEntity.MasterCard}
    ${CreditCardNetworkGraphQL.Other}      | ${CreditCardNetworkEntity.Other}
    ${CreditCardNetworkGraphQL.Unionpay}   | ${CreditCardNetworkEntity.UnionPay}
    ${CreditCardNetworkGraphQL.Visa}       | ${CreditCardNetworkEntity.Visa}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(CreditCardNetworkTransformer.toEntity(graphQL)).toStrictEqual(
        entity,
      )
    },
  )
})
