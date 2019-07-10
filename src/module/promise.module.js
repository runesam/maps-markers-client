// @flow

const user = {
    key: 'AIzaSyCzK0PQ5veag1vstD7SDUeOsF7zs21Zz4M',
    markers: [
        { text: 'Home', lat: 52.4953218, lng: 13.347765 },
        { text: 'Work', lat: 52.5256814, lng: 13.393472 },
    ],
};

export default ():Promise<any> => new Promise((resolve: function) => {
    setTimeout(() => {
        resolve(user);
    }, 1000);
});
