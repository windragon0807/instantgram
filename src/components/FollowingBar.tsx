"use client";

import useSWR from 'swr';

// SSR 렌더링을 사용하기에는 각각 받아오는 데이터가 많으므로 CSR 렌더링 채택
export default function FollowingBar() {
    const { data, isLoading, error } = useSWR('/api/me');
    console.log(data);
    return <p>FollowingBar</p>;
}
