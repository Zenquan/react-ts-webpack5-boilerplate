import React, { FC } from 'react';
// import useSWR from 'swr';
import logo from '/@/assets/logo.svg';
import style from './index.module.less';

const Home: FC = () => {
  // const fetcher = (...args: any) => fetch(args).then((res) => res.json());
  // const { data, error, } = useSWR("/api/activity/act/zongzi/getInfo", fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <div className={style.home}>
      <img src={logo} alt="" className={style.logo} />
      <p>Hello, React!</p>
    </div>
  );
};

export default Home;
