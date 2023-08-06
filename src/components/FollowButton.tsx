'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';
import Button from './ui/Button';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>('/api/me');
  // 내 프로필이 아니라 다른 사람의 프로필 페이지에 들어가면 버튼이 보임
  const showButton = loggedInUser && loggedInUser.username !== username;
  // 내가 팔로우한 사람이 아니라면 팔로우 버튼을 보여줌
  const following = loggedInUser && loggedInUser.following.find(item => item.username === username);
  const text = following ? 'Unfollow' : 'Follow';
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === 'Unfollow'} />
      )}
    </>
  );
}