import React from 'react';
import { shallow } from 'enzyme';

import HomeComponent from 'app/home.component';

describe('HomeComponent', () => {
    it('has a plain empty object set to the user state', () => {
        const wrapper = shallow(<HomeComponent />);
        const { user } = wrapper.state();
        expect(user).toEqual({});
    });

    it('fetches the user data and set it to the state', (done) => {
        const user = {
            key: 'AIzaSyCzK0PQ5veag1vstD7SDUeOsF7zs21Zz4M',
            markers: [
                { text: 'Home', lat: 52.4953218, lng: 13.347765 },
                { text: 'Work', lat: 52.5256814, lng: 13.393472 },
            ],
        };

        const wrapper = shallow(<HomeComponent />);
        let state = wrapper.state();
        expect(state.user).toEqual({});
        setTimeout(() => {
            state = wrapper.state();
            expect(state.user).toEqual(user);
            done();
        }, 1500);
    });
});
