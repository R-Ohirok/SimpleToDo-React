import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';

export const getTodosHandler = vi.fn(() => {
  return HttpResponse.json({
      pagesCount: 3,
      todos: [
        {
          id: 'abc-1',
          title: 'test 1',
          isCompleted: false,
        },
        {
          id: 'abc-2',
          title: 'test 2',
          isCompleted: true,
        },
        {
          id: 'abc-3',
          title: 'test 3',
          isCompleted: false,
        },
        {
          id: 'abc-4',
          title: 'test 4',
          isCompleted: false,
        },
        {
          id: 'abc-5',
          title: 'test 5',
          isCompleted: true,
        },
      ],
    });
});

export const postTodoHandler = vi.fn(() => {
  return new HttpResponse(null, {
      status: 201,
    });
});

export const deleteTodoHandler = vi.fn(() => {
  return new HttpResponse(null, {
    status: 201,
  });
});

export const patchTodoHandler = vi.fn(() => {
  return new HttpResponse(null, {
    status: 201,
  });
});

export const postAuthHandlerSuccess = vi.fn(() => {
  return new HttpResponse(null, {
      status: 201,
    });
});

export const postAuthHandlerError = vi.fn(() => {
  return new HttpResponse(null, {
      status: 201,
    });
});


export const handlers = [
  http.get('http://localhost:3000/todos', getTodosHandler),

  http.post('http://localhost:3000/todos', postTodoHandler),
  
  http.delete('http://localhost:3000/todos/:id', deleteTodoHandler),
  
  http.patch('http://localhost:3000/todos/:id', patchTodoHandler),

  http.post('http://localhost:3000/auth/register', postAuthHandlerSuccess),

  http.post('http://localhost:3000/auth/verifyemail', postAuthHandlerSuccess),

  http.post('http://localhost:3000/auth/login', postAuthHandlerSuccess),
];
