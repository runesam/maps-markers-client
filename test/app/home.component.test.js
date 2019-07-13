import React from 'react';
import { shallow } from 'enzyme';

import http from 'utils/http';
import * as promiseModule from 'module/promise.module';

import HomeComponent from 'app/home.component';

describe('HomeComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('initiate with the right state', () => {
        const wrapper = shallow(<HomeComponent />);
        const state = wrapper.state();
        expect(state.error).toEqual('');
        expect(state.open).toEqual(false);
        expect(state.user).toEqual({ key: '', markers: [] });
    });

    it('fetches the user data and set it to the state onSuccess', (done) => {
        const httpSpy = jest.spyOn(http, 'get');
        const promiseSpy = jest.spyOn(promiseModule, 'getUser');
        const response = { data: { key: 'fakeKey', markers: [] } };

        http.get.mockResolvedValue(response);

        const wrapper = shallow(<HomeComponent />);
        let state = wrapper.state();

        expect(state.user).toEqual({ key: '', markers: [] });

        setTimeout(() => {
            state = wrapper.state();
            expect(httpSpy).toHaveBeenCalledTimes(1);
            expect(state.user).toEqual(response.data);
            expect(promiseSpy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('fetches the user data and set the error to the error state onFailure', (done) => {
        const httpSpy = jest.spyOn(http, 'get');
        const promiseSpy = jest.spyOn(promiseModule, 'getUser');
        const reason = { response: { reason: 'failure reason goes here' } };

        http.get.mockRejectedValue(reason);

        const wrapper = shallow(<HomeComponent />);
        let state = wrapper.state();

        expect(state.error).toEqual('');

        setTimeout(() => {
            state = wrapper.state();
            expect(httpSpy).toHaveBeenCalledTimes(1);
            expect(promiseSpy).toHaveBeenCalledTimes(1);
            expect(state.error).toEqual(reason.response);
            done();
        });
    });

    describe('handleAddMarker method', () => {
        const wrapper = shallow(<HomeComponent />);

        const state = wrapper.state();
        const instance = wrapper.instance();
        const marker = { id: 5, name: 'marker name' };

        it('triggers the toggleDialog method', () => {
            expect(state.user.markers).toEqual([]);

            const spy = jest.spyOn(instance, 'toggleDialog');
            instance.handleAddMarker(marker);

            const newState = wrapper.state();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(newState.user.markers.length).toBe(1);
        });
    });

    describe('handleUpdateMarker method', () => {
        const wrapper = shallow(<HomeComponent />);
        const markerToUpdate = { id: 3, name: 'marker name' };
        wrapper.setState({ user: { markers: [markerToUpdate] } });

        const state = wrapper.state();
        const instance = wrapper.instance();
        const marker = { id: 5, name: 'marker to update', idToReplace: 3 };

        it('triggers the toggleDialog method', () => {
            expect(state.user.markers).toEqual([markerToUpdate]);

            const spy = jest.spyOn(instance, 'toggleDialog');
            instance.handleUpdateMarker(marker);

            const newState = wrapper.state();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(newState.marker).toBe(null);
            expect(newState.user.markers.length).toBe(1);
            expect(newState.user.markers[0]).toEqual(marker);
        });

        it('doesn\'t update the markers state', () => {
            const oldState = { user: { markers: [{ id: 10 }] } };
            wrapper.setState(oldState);
            instance.handleUpdateMarker(marker);

            const newState = wrapper.state();
            expect(newState.user).toEqual(oldState.user);
        });
    });

    describe('handleEditMarker method', () => {
        const wrapper = shallow(<HomeComponent />);
        const markerToUpdate = { id: 3, name: 'marker name' };

        const instance = wrapper.instance();

        it('triggers the toggleDialog method', () => {
            const spy = jest.spyOn(instance, 'toggleDialog');

            instance.handleEditMarker(markerToUpdate);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(wrapper.state().marker).toEqual(markerToUpdate);
        });
    });

    describe('handleDeleteMarker method', () => {
        const wrapper = shallow(<HomeComponent />);
        const markerToDelete = { id: 3, name: 'marker name' };
        wrapper.setState({ user: { markers: [markerToDelete] } });

        const instance = wrapper.instance();

        it('remove the passed marker from the markers array', () => {
            instance.handleDeleteMarker(markerToDelete);
            expect(wrapper.state().user.markers).toEqual([]);
        });
    });
});
