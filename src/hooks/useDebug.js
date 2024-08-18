import qs from 'qs';
import { useLocation } from 'react-router-dom';

export default function useDebug() {
  const { search } = useLocation();
  const { debug } = qs.parse(search, { ignoreQueryPrefix: true });

  return debug;
}
