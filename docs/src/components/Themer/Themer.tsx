import { ThemerProvider } from './Context';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

extend([a11yPlugin]);

export const Themer = ({ children }) => {
  return <ThemerProvider>{children}</ThemerProvider>;
};
