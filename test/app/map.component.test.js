import React from 'react';
import { mount } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';

import Theme from 'utils/theme';
import MapComponent from 'app/map.component';
import MarkerComponent from 'app/marker.component';

describe('MapComponent', () => {
    const props = {
        apiKey: 'keyGoesHere',
        markers: [
            {
                id: 4,
                name: 'Home',
                lng: 13.347765,
                lat: 52.4953218,
            },
            {
                id: 5,
                name: 'Work',
                lng: 13.393472,
                lat: 52.5256814,
            },
        ],
    };

    it('renders the right markers', () => {
        const wrapper = mount(
            <Theme>
                <MapComponent {...props} />
            </Theme>,
        );

        expect(wrapper.find(MarkerComponent).length).toEqual(props.markers.length);
    });

    it('renders the CircularProgress when no apiKey provided', () => {
        const wrapper = mount(
            <Theme>
                <MapComponent {...props} apiKey={undefined} />
            </Theme>,
        );

        expect(wrapper.find(CircularProgress).length).toEqual(1);
    });
});
