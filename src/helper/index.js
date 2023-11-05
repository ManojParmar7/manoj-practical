import axios from 'axios';
const api = axios.create({

  
  baseURL:"https://654530b65a0b4b04436dcb67.mockapi.io/api/v1/",
	headers: {
		'Content-Type': 'application/json',	
     Authorization: ``,   

	},
});
export default api;
