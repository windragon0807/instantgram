import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostGridCard from './PostGridCard';
import GridSpinner from './ui/GridSpinner';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  return (
    <div>
      {isLoading && <GridSpinner />}
      <ul>
        {posts &&
          posts.map((post, index) => (
          <li key={post.id}>
            <PostGridCard post={post} priority={index < 6} />
          </li>
        ))}
      </ul>
    </div>
  );
}