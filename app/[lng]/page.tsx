'use client';
import Cat from '@/app/cat';
import { ParamsWithLng } from '@/app/shared';

const Home: React.FC<ParamsWithLng> = ({ params }) => {
  return <Cat params={params} />;
};

export default Home;
