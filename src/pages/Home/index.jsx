import Layout from 'lib/components/Layout';

import Hero from './Hero';

import { base } from 'themes';
import { FOOTER_PROPS } from 'constants';


const Home = () => (
  <Layout
    theme={base}
    footerProps={FOOTER_PROPS}
  >
    <Hero />
  </Layout>
);

export default Home;
