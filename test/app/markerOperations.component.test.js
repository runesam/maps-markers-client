import React from 'react';
import { shallow } from 'enzyme';

import * as promiseModule from 'module/promise.module';
import MarkersOperations from 'app/markerOperations.component';

describe('NewMarkerDialog', () => {
    const props = {
        marker: {
            lat: 12,
            lng: 15,
            id: 'markerId',
            name: 'marker name',
        },
        handleEditMarker: jest.fn(),
        handleDeleteMarker: jest.fn(),
    };

    describe('handleEdit method', () => {
        const wrapper = shallow(<MarkersOperations {...props} />);
        const instance = wrapper.instance();
        it('calls handleEditMarker from props with the right arg', () => {
            instance.handleEdit();
            expect(props.handleEditMarker).toHaveBeenCalledTimes(1);
            expect(props.handleEditMarker).toHaveBeenCalledWith(props.marker);
        });
    });

    describe('handleDelete method', () => {
        it('calls deleteMarker with the right argument', () => {
            const spy = jest.spyOn(promiseModule, 'deleteMarker');
            const wrapper = shallow(<MarkersOperations {...props} />);
            const instance = wrapper.instance();
            promiseModule.deleteMarker.mockResolvedValue({ data: props.marker });
            instance.handleDelete();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(props.marker);
        });
    });
});
