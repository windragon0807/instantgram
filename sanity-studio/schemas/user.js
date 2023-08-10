export default {
    title: 'User', // Sanity Studio UI에서 보는 이름
    name: 'user', // 백엔드에서 접근하는 이름
    type: 'document',
    fields: [
      {
        title: 'Username',
        name: 'username',
        type: 'string',
      },
      {
        title: 'Name',
        name: 'name',
        type: 'string',
      },
      {
        title: 'Email',
        name: 'email',
        type: 'string',
      },
      {
        title: 'Image',
        name: 'image',
        type: 'string',
      },
      {
        title: 'Following',
        name: 'following',
        type: 'array',
        // 어떤 타입의 배열인지
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
        validation: (Rule) => Rule.unique(),
      },
      {
        title: 'Followers',
        name: 'followers',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
        validation: (Rule) => Rule.unique(),
      },
      {
        title: 'Bookmarks',
        name: 'bookmarks',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'post' }],
          },
        ],
        validation: (Rule) => Rule.unique(),
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'username',
      },
    },
  }
  