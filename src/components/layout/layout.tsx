import {ReactNode} from 'react';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';

type LayoutProps = {
  children: ReactNode;
  hasFooter?: boolean;
  hasNavigation?: boolean;
  extraClass?: string;
};

export function Layout({children, hasFooter = false, extraClass = '', hasNavigation = true}: LayoutProps): JSX.Element {
  return (
    <div className={`page ${extraClass}`}>
      <Header hasNavigation={hasNavigation}/>
      {children}
      {hasFooter && <Footer/>}
    </div>
  );
}
