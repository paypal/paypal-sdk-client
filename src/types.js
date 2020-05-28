/* @flow */

export const TYPES = true;

export type VaultedInstrument = {|
    id : string,
    label : {|
        description : string
    |}
|};

export type BasicEligibility = {|
    eligible : boolean,
    branded : boolean,
    recommended? : ?boolean
|};

export type PayPalEligibility = {|
    eligible : boolean,
    branded : boolean,
    recommended? : ?boolean,
    vaultable? : ?boolean,
    vaultedInstruments? : $ReadOnlyArray<VaultedInstrument>
|};

export type CardVendorEligibility = {|
    eligible : boolean,
    vaultable? : ?boolean,
    vaultedInstruments? : $ReadOnlyArray<VaultedInstrument>
|};

export type CardVendorsEligibility = {|
    visa? : CardVendorEligibility,
    mastercard? : CardVendorEligibility,
    amex? : CardVendorEligibility,
    discover? : CardVendorEligibility,
    hiper? : CardVendorEligibility,
    elo? : CardVendorEligibility,
    jcb? : CardVendorEligibility,
    cup? : CardVendorEligibility
|};

export type CardEligibility = {|
    eligible : boolean,
    branded : boolean,
    recommended? : ?boolean,
    vendors : CardVendorsEligibility
|};

export type FundingEligibilityType = {|
    paypal? : PayPalEligibility,
    card : CardEligibility,
    venmo? : BasicEligibility,
    credit? : BasicEligibility,
    paylater? : BasicEligibility,
    sepa? : BasicEligibility,
    bancontact? : BasicEligibility,
    eps? : BasicEligibility,
    giropay? : BasicEligibility,
    ideal? : BasicEligibility,
    mybank? : BasicEligibility,
    p24? : BasicEligibility,
    sofort? : BasicEligibility,
    wechatpay? : BasicEligibility,
    zimpler? : BasicEligibility,
    itau? : BasicEligibility,
    payu? : BasicEligibility,
    verkkopankki? : BasicEligibility,
    blik? : BasicEligibility,
    boleto? : BasicEligibility,
    maxima? : BasicEligibility,
    oxxo? : BasicEligibility,
    trustly? : BasicEligibility,
    mercadopago? : BasicEligibility
|};
