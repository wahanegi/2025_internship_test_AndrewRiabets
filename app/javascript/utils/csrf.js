import axios from 'axios';

const createCsrfToken = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content;
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
};

export default createCsrfToken;
