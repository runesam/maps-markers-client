import React from 'react';
import { shallow } from 'enzyme';

import { user } from 'module/promise.module';
import HomeComponent from 'app/home.component';

describe('HomeComponent', () => {
    it('has a plain empty object set to the user state', () => {
        const wrapper = shallow(<HomeComponent />);
        const state = wrapper.state();
        expect(state.user).toEqual({});
    });

    it('fetches the user data and set it to the state', (done) => {
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
