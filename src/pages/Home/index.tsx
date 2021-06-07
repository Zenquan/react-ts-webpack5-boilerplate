import React, { FC } from 'react';
import { observer } from "mobx-react";
import useSWR from 'swr';

const Home: FC = observer(() => {
  const fetcher = (...args: any) => fetch(args).then((res) => res.json());
  const { data, error, } = useSWR("/api/activity/act/zongzi/getInfo", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      111
    </div>
  );
});

export default Home;