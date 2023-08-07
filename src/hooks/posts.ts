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
      // mutate 결과를 기다리기 전에 로컬 데이터로 먼저 UI를 보여줌
      optimisticData: newPosts,
      /*
       * 바운드 된 mutate를 사용하면 updateLike의 Response 데이터가 /api/posts 데이터를 덮어 씌워준다.
       * 하지만, setLike를 업데이트 할 때 모든 포스트에 있는 데이터를 가져오는 게 아니며, 키 값만 업데이트 해주면 되기 때문에
       * populateCache를 false로 설정하여 기존 /api/posts 데이터를 덮어 씌우지 않도록 함
       */
      populateCache: false,
      /*
       * updateLike가 성공하면 posts에 대한 데이터를 서버에서 다시 가져오는데
       * 이미 로컬 상으로 새로운 포스트 데이터를 만들어 뒀으니 굳이 서버에서 다시 가져올 필요가 없기 때문에
       * revalidate를 false로 설정
       */
      revalidate: false,
      // mutate 실패 시 optimisticData를 사용하지 않고 rollback
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike };
}