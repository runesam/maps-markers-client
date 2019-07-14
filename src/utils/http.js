// @flow

import axios from 'axios';

declare var API_URL:string;

const http = axios.create({ baseURL: API_URL });

export default http;
