import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 200 }, // ramp up
        { duration: '3m', target: 200 }, // stable
        { duration: '30s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete within 100ms
    }
};

export default () => {
    const res = http.get('https://petstore.octoperf.com/actions/Catalog.action');
    check(res, { '200': (r) => r.status === 200 });
    sleep(1);
};