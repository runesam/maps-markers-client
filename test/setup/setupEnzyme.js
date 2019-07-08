import 'core-js/stable';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

expect.extend({
    toContainObject(received, argument) {
        const pass = this.equals(received,
            expect.arrayContaining([
                expect.objectContaining(argument),
            ]));

        if (pass) {
            return {
                message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
                pass: true,
            };
        }

        return {
            message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
            pass: false,
        };
    },
});

Enzyme.configure({ adapter: new Adapter() });
