import promise from 'module/promise.module';

describe('promise the module', () => {
    const user = {
        key: 'AIzaSyCzK0PQ5veag1vstD7SDUeOsF7zs21Zz4M',
        markers: [
            { text: 'Home', lat: 52.4953218, lng: 13.347765 },
            { text: 'Work', lat: 52.5256814, lng: 13.393472 },
        ],
    };

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
