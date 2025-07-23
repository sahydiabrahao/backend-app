import { buildServer } from './server';

async function start() {
  const app = await buildServer();
  await app.listen({ port: Number(process.env.PORT) });
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
}

start();
