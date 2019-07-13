import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from 'app';

describe('<App />', () => {
    it('matches the snapshot', () => {
        const wrapper = shallow(<App />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
