import Header from './Header';
import Footer from './Footer';
export default ({ children, ...props }) => (
  <div id="root">
    <Header {...props} />
    <main>{children}</main>
    <Footer {...props} />
  </div>
);