   // Example using Axios in a React app
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'http://localhost:8000',  // Update with your backend URL
   });

   export default api;

   // Use this api instance to make requests