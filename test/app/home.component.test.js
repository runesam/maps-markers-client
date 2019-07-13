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
});
