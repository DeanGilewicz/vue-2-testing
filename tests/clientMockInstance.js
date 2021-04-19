import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// exporting a single instance
// race condition issue when creating new MockAdapter in each test file
export default new MockAdapter(axios);
