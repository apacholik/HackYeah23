import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  label: string,
  href: string,
  icon: ReactNode,
};

/** Documentation for MenuItem component */
export function MenuItem({ label, href, icon = null }: Props) {
  return (
    <Link href={href}>
      <a className="flex gap-2 py-3 px-2 border-b border-gray-50 hover:bg-gray-50">
        {icon}
        <span className="font-medium">{label}</span>
      </a>
    </Link>
  );
}
