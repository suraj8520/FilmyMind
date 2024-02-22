import { useContext } from 'react';
import { GlobalContext } from './GlobalUIProvider';

export default function useGlobalContext() {
  const values = useContext(GlobalContext);
  if (!values)
    throw new Error('Context is being accessed outside the context tree');
  return values;
}
