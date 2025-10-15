import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return <div>{children}</div>;
}
