import http from 'k6/http';
import { sleep, check } from 'k6';

const endpoint = 'petstore.octoperf.com/actions/Catalog.action'
const categoryParam = '?viewItem='
const itemParams = [
    "EST-7",
    "EST-8",
    "EST-9",
    "EST-10",
    "EST-11",
    "EST-12",
]

export const options = {
    stages: [
        { duration: '30s', target: 200 }, // ramp up
        { duration: '1m', target: 200 }, // stable
        { duration: '30s', target: 800 }, // ramp up
        { duration: '1m', target: 800 }, // stable
        { duration: '30s', target: 1000 }, // ramp up
        { duration: '1m', target: 1000 }, // stable
        { duration: '3m', target: 0 }, // ramp-down to 0 users
    ]
};

export default () => {
    const randomItem = itemParams[Math.floor(Math.random() * itemParams.length)];
    const res = http.get(`http://${endpoint}?${randomItem}`);
    check(res, { '200': (r) => r.status === 200 });
    sleep(1);
};