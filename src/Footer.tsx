import { PropsWithChildren } from 'react';

function Footer({ children }: PropsWithChildren<{}>) {
  return <footer> {children} </footer>;
}

export default Footer;
