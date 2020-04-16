import createRouter from './routes';

export default function src() {
  const signed = false;

  return createRouter(signed);
}
