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
  `).then((posts) => posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) })));
}
