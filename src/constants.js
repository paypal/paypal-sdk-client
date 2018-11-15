/* @flow */

export const FPTI_CONTEXT_TYPE = {
    ORDER_ID: ('EC-Token' : 'EC-Token')
};

export const FPTI_TRANSITION = {
    CREATE_ORDER: ('process_create_order' : 'process_create_order'),
    SCRIPT_LOAD:  ('process_script_load' : 'process_script_load'),
    PXP:          ('process_pxp_check' : 'process_pxp_check')
};

export const FPTI_STATE = {
    PXP: ('PXP_CHECK' : 'PXP_CHECK')
};

