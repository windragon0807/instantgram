import { SimplePost } from '@/model/post';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then(res => res.json());
}

export default function usePosts() {
  const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>('/api/posts');

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    // 로컬 상에서 업데이트 할 데이터를 먼저 만듦
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter(item => item !== username),
    };
    const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

    // https://swr.vercel.app/docs/mutation#parameters
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike };
}