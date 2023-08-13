import reactDom from 'react-dom';
type Props = {
  children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
  // 서버사이드 렌더링 될 때는 처리하지 않음
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, node);
}