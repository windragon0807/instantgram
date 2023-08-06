'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostGrid from './PostGrid';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostIcon from './ui/icons/PostIcon';

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: 'posts', icon: <PostIcon /> },
  { type: 'saved', icon: <BookmarkIcon className='w-3 h-3' /> },
  { type: 'posts', icon: <HeartIcon className='w-3 h-3' /> },
];

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);
  
  return (
    <section>
      <ul>
        {tabs.map(({ type, icon }) => (
          <li key={type} onClick={() => setQuery(type)}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}