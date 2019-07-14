import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';

import * as promiseModule from 'module/promise.module';
import NewMarkerDialogContainer, { NewMarkerDialog } from 'app/newMarkerDialog.component';

describe('NewMarkerDialog', () => {
    const props = {
        open: true,
        apiKey: 'fakeKey',
        handleClose: jest.fn(),
        handleAddMarker: jest.fn(),
        handleUpdateMarker: jest.fn(),
        classes: { root: '', error: '' },
    };

    it('initiate with the right state', () => {
        const wrapper = shallow(<NewMarkerDialog {...props} />);
        const state = wrapper.state();
        expect(state.error).toEqual('');
        expect(state.markers).toEqual([]);
        expect(state.address).toEqual('');
        expect(state.searching).toEqual(false);
    });

    describe('<NewMarkerDialogContainer />', () => {
        it('matches the snapshot', () => {
            const wrapper = shallow(<NewMarkerDialogContainer {...props} />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('onDialogClose method', () => {
        const wrapper = shallow(<NewMarkerDialog {...props} />);
        it('reset the instance state to the default one', () => {
            wrapper.setState({
                error: 'error',
                searching: true,
                address: 'address',
                markers: [{ id: 1 }],
            });
            wrapper.instance().onDialogClose();
            const state = wrapper.state();
            expect(state.error).toEqual('');
            expect(state.markers).toEqual([]);
            expect(state.address).toEqual('');
            expect(state.searching).toEqual(false);
        });
    });

    describe('handleChange method', () => {
        const event = { target: { name: 'address', value: 'newAddress' } };
        const wrapper = mount(<NewMarkerDialog {...props} />);
        const instance = wrapper.instance();

        it('gets called on input field changes', () => {
            const spy = jest.spyOn(instance, 'handleChange');

            instance.handleChange(event);
            wrapper.find('input').simulate('change', event);

            wrapper.update();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(event);
        });

        it('updates the instance state with new value', () => {
            wrapper.find('input').simulate('change', event);
            wrapper.update();
            const state = wrapper.state();
            expect(state[event.target.name]).toEqual(event.target.value);
        });
    });

    describe('handleSearch method', () => {
        let promiseModuleSpy;

        const wrapper = shallow(<NewMarkerDialog {...props} />);
        const address = 'address to look for';
        const instance = wrapper.instance();

        wrapper.setState({ address });

        beforeEach(() => {
            jest.clearAllMocks();
            promiseModuleSpy = jest.spyOn(promiseModule, 'getGeoForAddress');
        });

        it('sets the searching state to true', () => {
            expect(wrapper.state().searching).toBeFalsy();
            instance.handleSearch();
            expect(wrapper.state().searching).toBeTruthy();
        });

        it('calls the getGeoForAddress method with right arguments', () => {
            instance.handleSearch();
            expect(promiseModuleSpy).toHaveBeenCalledTimes(1);
            expect(promiseModuleSpy).toHaveBeenCalledWith(address);
        });

        it('update the markers state and clear the error on getGeoForAddress resolve', (done) => {
            const data = [
                { geometry: { location: { lat: 1, lng: 2 } }, id: 1, name: 'address 1' },
                { geometry: { location: { lat: 3, lng: 4 } }, id: 2, name: 'address 2' },
            ];

            wrapper.setState({ error: 'some error message' });
            promiseModule.getGeoForAddress.mockResolvedValue({ data });

            instance.handleSearch();
            setTimeout(() => {
                const state = wrapper.state();

                expect(state.error).toBe('');
                expect(state.markers).toEqual(data);
                done();
            });
        });

        it('updates the error state with the reason and sets markers state to empty array', (done) => {
            const response = 'not found error';
            promiseModule.getGeoForAddress.mockRejectedValue({ response });
            wrapper.setState({ markers: [{ id: 1 }] });
            instance.handleSearch();
            setTimeout(() => {
                expect(wrapper.state().markers).toEqual([]);
                expect(wrapper.state().error).toBe(response);
                done();
            });
        });

        it('sets the searching value back to false on resolve or reject', (done) => {
            instance.handleSearch();
            expect(wrapper.state().searching).toBeTruthy();
            setTimeout(() => {
                expect(wrapper.state().searching).toBeFalsy();
                done();
            });
        });
    });

    describe('handleAddAddress method', () => {
        let promiseModuleSpy;

        const wrapper = shallow(<NewMarkerDialog {...props} />);
        const markers = [{ id: 5, name: 'address to add' }];
        const instance = wrapper.instance();

        wrapper.setState({ markers });

        beforeEach(() => {
            jest.clearAllMocks();
            promiseModuleSpy = jest.spyOn(promiseModule, 'addMarker');
        });

        it('calls the addMarker method with right arguments', () => {
            promiseModule.addMarker.mockResolvedValue({ data: markers[0] });
            instance.handleAddAddress();
            expect(promiseModuleSpy).toHaveBeenCalledTimes(1);
            expect(promiseModuleSpy).toHaveBeenCalledWith(markers[0]);
        });

        it('calls handleAddAddress from props with the right argument', (done) => {
            const data = markers[0];
            promiseModule.addMarker.mockResolvedValue({ data });
            instance.handleAddAddress();
            setTimeout(() => {
                expect(props.handleAddMarker).toHaveBeenCalledTimes(1);
                expect(props.handleAddMarker).toHaveBeenCalledWith(data);
                done();
            });
        });

        it('calls update the error state with the reason', (done) => {
            const response = 'failed to add';
            promiseModule.addMarker.mockRejectedValue({ response });
            instance.handleAddAddress();
            setTimeout(() => {
                expect(wrapper.state().error).toBe(response);
                done();
            });
        });
    });

    describe('handleAddAddress method', () => {
        let promiseModuleSpy;

        const marker = { id: 3, name: 'new address to update' };
        const wrapper = shallow(<NewMarkerDialog {...props} marker={marker} />);
        const markers = [{ id: 5, name: 'address' }];
        const instance = wrapper.instance();

        wrapper.setState({ markers });

        beforeEach(() => {
            jest.clearAllMocks();
            promiseModuleSpy = jest.spyOn(promiseModule, 'updateMarker');
        });

        it('won\'t call any if there is no valid marker from props', () => {
            const tempWrapper = shallow(<NewMarkerDialog {...props} />);
            const tempInstance = tempWrapper.instance();
            tempInstance.handleUpdateAddress();
            expect(promiseModuleSpy).toHaveBeenCalledTimes(0);
        });

        it('calls the updateMarker method with right arguments', () => {
            promiseModule.updateMarker.mockResolvedValue({ data: markers[0] });
            instance.handleUpdateAddress();
            expect(promiseModuleSpy).toHaveBeenCalledTimes(1);
            expect(promiseModuleSpy).toHaveBeenCalledWith({ ...markers[0], idToReplace: 3 });
        });

        it('calls handleUpdateMarker from props with the right argument', (done) => {
            const data = { ...markers[0], idToReplace: 3 };
            promiseModule.updateMarker.mockResolvedValue({ data });
            instance.handleUpdateAddress();
            setTimeout(() => {
                expect(props.handleUpdateMarker).toHaveBeenCalledTimes(1);
                expect(props.handleUpdateMarker).toHaveBeenCalledWith(data);
                done();
            });
        });

        it('calls update the error state with the reason', (done) => {
            const response = 'failed to update';
            promiseModule.updateMarker.mockRejectedValue({ response });
            instance.handleUpdateAddress();
            setTimeout(() => {
                expect(wrapper.state().error).toBe(response);
                done();
            });
        });
    });
});
