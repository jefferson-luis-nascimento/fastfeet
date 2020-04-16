import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function src() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const signed = useSelector((state) => state.auth.signed);

  return createRouter(signed);
}
