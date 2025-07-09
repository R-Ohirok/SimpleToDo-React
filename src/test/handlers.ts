import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost:3000/auth/login', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
    return new HttpResponse(null, {
    headers: {
      // Setting the "Set-Cookie" header on the mocked response
      // will set the cookies on the `document` as if they were
      // received from the server.
      'set-cookie': 'authToken=abc-123',
    },
  })
  }),
];