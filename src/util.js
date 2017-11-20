/* @flow */

export function isSessionStorageEnabled() : boolean {
    try {
        if (window.sessionStorage) {
            let value = Math.random().toString();
            window.sessionStorage.setItem('__test__sessionStorage__', value);
            let result = window.sessionStorage.getItem('__test__sessionStorage__');
            window.sessionStorage.removeItem('__test__sessionStorage__');
            if (value === result) {
                return true;
            }
        }
    } catch (err) {
        // pass
    }
    return false;
}
