// server-handlers.js
// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest } from 'msw'; // msw supports graphql too!

const handlers = [
  rest.get('/api/form', async (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: 123,
          name: 'John Doe',
        },
      }),
    );
  }),
  rest.post('/api/checkout', async (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
];

export { handlers };
