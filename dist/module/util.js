export function isSessionStorageEnabled() {
    try {
        if (window.sessionStorage) {
            var value = Math.random().toString();
            window.sessionStorage.setItem('__test__sessionStorage__', value);
            var result = window.sessionStorage.getItem('__test__sessionStorage__');
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