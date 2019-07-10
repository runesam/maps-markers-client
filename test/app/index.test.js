import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from 'app';

describe('<App />', () => {
    it('matches the snapshot', () => {
        const wrapper = mount(<App />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
