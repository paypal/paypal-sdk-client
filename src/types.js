/* @flow */

export const TYPES = true;

export type FundingEligibilityType = {|
    bancontact? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    card : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean,
        vendors : {
            visa? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            mastercard? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            amex? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            discover? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            hiper? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            elo? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            jcb? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            cup? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            }
        }
    },
    credit? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    sepa? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    eps? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    giropay? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    ideal? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    mybank? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    p24? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    paypal? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean,
        vaultable? : ?boolean,
        vaultedInstruments? : $ReadOnlyArray<{
            id : string,
            label : {
                description : string
            }
        }>
    },
    sofort? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    venmo? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    wechatpay? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    zimpler? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    itau? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    payu? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    verkkopankki? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    blik? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    boleto? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    maxima? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    oxxo? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    },
    trustly? : {
        eligible : boolean,
        branded : boolean,
        recommended? : ?boolean
    }
|};
