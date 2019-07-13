// @flow
import http from '../utils/http';

const getUser = () => http.get('/user');

const addMarker = (marker: {}) => http.post('/markers', marker);

const updateMarker = (marker: {}) => http.put('/markers', marker);

const deleteMarker = (marker: { id: string }) => http.delete(`/markers/${marker.id}`);

const getGeoForAddress = (address: string) => http.get(`/geo/${address}`);

export {
    getUser,
    addMarker,
    updateMarker,
    deleteMarker,
    getGeoForAddress,
};
