import React, { FC } from 'react';
// import useSWR from 'swr';
import './index.less';

const Home: FC = () => {
  // const fetcher = (...args: any) => fetch(args).then((res) => res.json());
  // const { data, error, } = useSWR("/api/activity/act/zongzi/getInfo", fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <div className="home">
      111
    </div>
  );
};

export default Home;