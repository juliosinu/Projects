export const GET_API = 'GET_API';

const getApi = (payload) => ({
  type: GET_API,
  payload,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const response = await request.json();
      dispatch(getApi(response));
    } catch (error) {
      console.log(error);
    }
  };
}
