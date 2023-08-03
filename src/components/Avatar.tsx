type AvatarSize = 'small' | 'medium' | 'large';
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* 외부 url에 대한 포맷을 정하기 어려우므로 img 태그 사용 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full ${getImageSizeStyle(size)}`}
        alt='user profile'
        src={image ?? undefined}
        // 외부 링크 사용해서 나타나는 x박스 이슈 해결
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case 'small': return 'w-10 h-10';
    case 'medium': return 'w-12 h-12';
    case 'large': return 'w-[65px] h-[65px]';
  }
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case 'small': return 'w-[34px] h-[34px] p-[0.1rem]';
    case 'medium': return 'w-[42px] h-[42px] p-[0.1rem]';
    case 'large': return 'w-16 h-16 p-[0.2rem]';
  }
}