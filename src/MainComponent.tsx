import { PropsWithChildren } from 'react';

function MainComponent({ children }: PropsWithChildren<{}>) {
  return <main className="main">{children}</main>;
}

export default MainComponent;
