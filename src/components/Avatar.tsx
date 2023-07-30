type Props = {
  image?: string | null;
  size?: 'small' | 'normal';
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'normal',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* 외부 url에 대한 포맷을 정하기 어려우므로 img 태그 사용 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white rounded-full ${getImageSizeStyle(size)}`}
        alt='user profile'
        src={image ?? undefined}
        // 외부 링크 사용해서 나타나는 x박스 이슈 해결
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: string): string {
  return size === 'small'
    ? 'w-[34px] h-[34px] p-[0.1rem]'
    : 'w-16 h-16 p-[0.2rem] ';
}