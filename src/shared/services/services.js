import employees from "../data/employees.js";

const mockFetch = () => {
    return new Promise(res => {
        setTimeout(() => {
            res(employees);
        }, 500);
    });
}

export default {
    fetchData: mockFetch
}
