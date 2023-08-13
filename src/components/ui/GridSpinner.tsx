import dynamic from 'next/dynamic';

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  { ssr: false }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = 'red' }: Props) {
  return <GridLoader color={color} />;
}

/**
 * [Error]
 * hydration-error-info.js:27 Warning: Prop `style` did not match.
 * Server: "display:inline-block;background-color:red;width:15px;height:15px;margin:2px;border-radius:100%;animation-fill-mode:both;animation:react-spinners-GridLoader-grid 0.9496658407491304s 0.14966584074913042s infinite ease"
 * Client: "display:inline-block;background-color:red;width:15px;height:15px;margin:2px;border-radius:100%;animation-fill-mode:both;animation:react-spinners-GridLoader-grid 0.6309172142807898s -0.16908278571921015s infinite ease"
 * # Next.js는 서버에서 렌더링된 HTML을 클라이언트에서 재사용하기 때문에, 서버에서 렌더링된 HTML과 클라이언트에서 렌더링된 HTML이 일치하지 않으면 위와 같은 경고가 발생한다.
 */