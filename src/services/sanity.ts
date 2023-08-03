import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// https://www.sanity.io/docs/js-client#quickstart
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-07-29',
  // 데이터를 읽기만 하면 token을 사용할 필요가 없음
  token: process.env.SANITY_SECRET_TOKEN,
});

// @sanity/image-url :: https://www.sanity.io/docs/image-url
const builder = imageUrlBuilder(client);

// 이미지 최적화 + URL 생성
export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}