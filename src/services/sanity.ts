import { createClient } from '@sanity/client';

// https://www.sanity.io/docs/js-client#quickstart
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-07-29',
  // 데이터를 읽기만 하면 token을 사용할 필요가 없음
  token: process.env.SANITY_SECRET_TOKEN,
});
