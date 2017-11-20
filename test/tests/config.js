/* @flow */

import { get, set, get_or_set, on, STORE } from '../../src';
import { use } from '../../src/store';

for (let store of [ STORE.GLOBAL, STORE.SESSIONSTORAGE ]) {
    describe(`config cases with ${ store } store`, () => {

        before(() => {
            use(store);
        });

        it('should set a config value and then get it', () => {

            let key = Math.random().toString();
            let val = Math.random().toString();

            set(key, val);

            let result = get(key);

            if (result !== val) {
                throw new Error(`Expected result to be ${ val }, got ${ result || 'void' }`);
            }
        });

        it('should get a default value for a non-existant key', () => {

            let key = Math.random().toString();
            let val = Math.random().toString();

            let result = get(key, val);

            if (result !== val) {
                throw new Error(`Expected result to be ${ val }, got ${ result || 'void' }`);
            }
        });

        it('should get the existing value with set_or_get', () => {

            let key = Math.random().toString();
            let val = Math.random().toString();

            set(key, val);

            let result = get_or_set(key, Math.random().toString());

            if (result !== val) {
                throw new Error(`Expected result to be ${ val }, got ${ result || 'void' }`);
            }
        });

        it('should set a new value with set_or_get', () => {

            let key = Math.random().toString();
            let val = Math.random().toString();

            let result = get_or_set(key, val);
            let result2 = get(key);

            if (result !== val) {
                throw new Error(`Expected result to be ${ val }, got ${ result || 'void' }`);
            }

            if (result2 !== val) {
                throw new Error(`Expected result2 to be ${ val }, got ${ result2 || 'void' }`);
            }
        });

        it('should fire listeners when a value is set', () => {

            let key = Math.random().toString();
            let val = Math.random().toString();

            let result;
            let result2;

            on(key, res => {
                result = res;
            });

            on(key, res => {
                result2 = res;
            });

            set(key, val);

            if (result !== val) {
                throw new Error(`Expected result to be ${ val }, got ${ result || 'void' }`);
            }

            if (result2 !== val) {
                throw new Error(`Expected result2 to be ${ val }, got ${ result2 || 'void' }`);
            }
        });

        it('should cancel listeners successfully', () => {

            let key = Math.random().toString();
            let val = Math.random().toString();

            let result;
            let result2;

            on(key, res => {
                result = res;
            });

            let listener2 = on(key, res => {
                result2 = res;
            });

            listener2.cancel();

            set(key, val);

            if (result !== val) {
                throw new Error(`Expected result to be ${ val }, got ${ result || 'void' }`);
            }

            if (result2) {
                throw new Error(`Expected result2 to void, got ${ result2 || 'void' }`);
            }
        });
    });
}
