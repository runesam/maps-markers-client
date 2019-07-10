import promise, { user } from 'module/promise.module';

describe('promise the module', () => {
    it('returns a new instance of Promise', () => {
        expect(promise()).toHaveProperty('then');
        expect(promise()).toHaveProperty('catch');
    });

    it('resolves with the user data', (done) => {
        promise().then((response) => {
            expect(response).toEqual(user);
            done();
        });
    });
});
