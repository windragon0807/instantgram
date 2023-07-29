type Props = { image?: string | null };
export default function Avatar({ image }: Props) {
  return (
    <div className='w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className='rounded-full p-[0.1rem]'
        alt='user profile'
        src={image ?? undefined}
        // 외부 링크 사용해서 나타나는 x박스 이슈 해결
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

/**
 * [next에서 제공하는 Image가 아닌 img 태그를 사용해야 하는 이유]
 * 로컬 상에 있거나 특정한 url에 있다면 외부 url에 대한 도메인을 next config에 추가하면
 * 외부 url을 Image 태그에서 사용할 수 있었다.
 * 하지만 google에서 주어지는 이미지 url은 내부 구현사항이며 달라지므로 등록하기 어렵다.
 */
