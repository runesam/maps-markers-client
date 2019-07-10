import React from 'react';
import { mount } from 'enzyme';

import Theme from 'utils/theme';
import MapComponent from 'app/map.component';
import MarkerComponent from 'app/marker.component';

describe('MapComponent', () => {
    const user = {
        key: 'keyGoesHere',
        markers: [
            { text: 'Home', lat: 52.4953218, lng: 13.347765 },
            { text: 'Work', lat: 52.5256814, lng: 13.393472 },
        ],
    };

    const wrapper = mount(
        <Theme>
            <MapComponent user={user} />
        </Theme>,
    );

    it('renders the right markers', () => {
        expect(wrapper.find(MarkerComponent).length).toEqual(user.markers.length);
    });
});
