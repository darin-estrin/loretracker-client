import axios from '../services/axios';

export const registerUser = (data: { [key:string]: string }) => {
  axios.post('/auth/register/new', data)
  .then((res) => {
    // save auth token to cookie

    // redirect to main page
    console.log(res)
  })
  .catch((err) => {
    // display error message
    console.error(err)
  });
}