/* @flow */

export function isLocalStorageEnabled() : boolean {
    try {
        if (window.localStorage) {
            let value = Math.random().toString();
            window.localStorage.setItem('__test__localStorage__', value);
            let result = window.localStorage.getItem('__test__localStorage__');
            window.localStorage.removeItem('__test__localStorage__');
            if (value === result) {
                return true;
            }
        }
    } catch (err) {
        // pass
    }
    return false;
}
