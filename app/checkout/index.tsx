import { Suspense } from 'react';
import Loading from './loading';
import Content from './Content';


export default function BookCarousel() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  );
}