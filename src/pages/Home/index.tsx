import React, { FC } from 'react';
// import useSWR from 'swr';
import style from './index.module.less';

const Home: FC = () => {
  // const fetcher = (...args: any) => fetch(args).then((res) => res.json());
  // const { data, error, } = useSWR("/api/activity/act/zongzi/getInfo", fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return <div className={style.home}>Hello, React!</div>;
};

export default Home;
