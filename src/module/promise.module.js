// @flow
import http from '../utils/http';

const getUser = () => http.get('/user');

const addMarker = (marker: {}) => http.post('/markers', marker);

const updateMarker = (marker: {}) => http.put('/markers', marker);

const deleteMarker = (marker: {}) => http.delete('/markers', marker);

const getGeoForAddress = (address: string) => http.get(`/geo/${address}`);

export {
    getUser,
    addMarker,
    updateMarker,
    deleteMarker,
    getGeoForAddress,
};
