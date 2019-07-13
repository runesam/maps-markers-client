import {
    getUser,
    addMarker,
    updateMarker,
    deleteMarker,
    getGeoForAddress,
} from 'module/promise.module';

import http from 'utils/http';

describe('promise the module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUser', () => {
        it('calls http get via /user', (done) => {
            const spy = jest.spyOn(http, 'get');
            const response = { key: 'fakeKey', markers: [] };
            http.get.mockResolvedValue(response);

            getUser().then((res) => {
                expect(res).toEqual(response);
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith('/user');
                done();
            }).catch(e => e);
        });
    });

    describe('addMarker', () => {
        it('calls http post via /markers', (done) => {
            const spy = jest.spyOn(http, 'post');
            const response = { id: 'markerId' };
            http.post.mockResolvedValue(response);

            addMarker({ id: 'markerId' }).then((res) => {
                expect(res).toEqual(response);
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith('/markers', { id: 'markerId' });
                done();
            }).catch(e => e);
        });
    });

    describe('updateMarker', () => {
        it('calls http put via /markers', (done) => {
            const spy = jest.spyOn(http, 'put');
            const response = { id: 'markerId' };
            http.put.mockResolvedValue(response);

            updateMarker({ id: 'markerId' }).then((res) => {
                expect(res).toEqual(response);
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith('/markers', { id: 'markerId' });
                done();
            }).catch(e => e);
        });
    });

    describe('deleteMarker', () => {
        it('calls http delete via /markers', (done) => {
            const spy = jest.spyOn(http, 'delete');
            const response = { id: 'markerId' };
            http.delete.mockResolvedValue(response);

            deleteMarker({ id: 'markerId' }).then((res) => {
                expect(res).toEqual(response);
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith('/markers', { id: 'markerId' });
                done();
            }).catch(e => e);
        });
    });


    describe('getGeoForAddress', () => {
        it('calls http get via /geo/:address', (done) => {
            const spy = jest.spyOn(http, 'get');
            const address = 'random address text';
            http.get.mockResolvedValue({ id: 'locationId' });

            getGeoForAddress(address).then((res) => {
                expect(spy).toHaveBeenCalledTimes(1);
                expect(res).toEqual({ id: 'locationId' });
                expect(spy).toHaveBeenCalledWith(`/geo/${address}`);
                done();
            }).catch(e => e);
        });
    });
});
