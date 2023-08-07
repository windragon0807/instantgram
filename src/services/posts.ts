import { SimplePost } from '@/model/post';
import { client, urlFor } from "./sanity";

const simplePostProjection = `
  ...,
  "id": _id,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "text": comments[0].comment,
  "createdAt": _createdAt,
  "likes": likes[]->username,
  "comments": count(comments),
`;

export async function getFollowingPostsOf(username: string) {
  // 내가 작성한 포스트와 내가 팔로잉한 사람들이 작성한 포스트 가져오기 (작성일자 기준 내림차순)
  // GROQ Joins : https://www.sanity.io/docs/query-cheat-sheet#e82ab8c0925b
  return client.fetch(`
    *[
      _type == "post" &&
      author->username == "${username}" ||
      author._ref in *[_type == "user" && username == "${username}"].following[]._ref
    ] | order(_createdAt desc){${simplePostProjection}}
  `).then(mapPosts);
}

export async function getPost(id: string) {
  return client.fetch(`
    *[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{
        comment,
        "username": author->username,
        "image": author->image
      },
      "id": _id,
      "createdAt": _createdAt
    }
  `).then(post => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client.fetch(`
    *[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){${simplePostProjection}}
  `).then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client.fetch(`
    *[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){${simplePostProjection}}
  `).then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client.fetch(`
    *[_type == "post" && _id in *[_type == "user" && username == "${username}".bookmarks[]._ref]]
      | order(_createdAt desc){${simplePostProjection}}
  `).then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

// https://www.sanity.io/docs/js-client#adding-elements-to-an-array
export async function likePost(postId: string, userId: string) {
  return client.patch(postId)
    .setIfMissing({ likes: [] }) // likes가 없으면 빈 배열로 설정
    .append('likes', [ // likes라는 키를 만들고 데이터를 추가
      {
        _ref: userId,
        _type: 'reference',
      }
    ])
    .commit({ autoGenerateArrayKeys: true }); // 배열 키 자동 생성
}

export async function dislikePost(postId: string, userId: string) {
  return client.patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}