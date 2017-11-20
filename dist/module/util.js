export function isLocalStorageEnabled() {
    try {
        if (window.localStorage) {
            var value = Math.random().toString();
            window.localStorage.setItem('__test__localStorage__', value);
            var result = window.localStorage.getItem('__test__localStorage__');
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