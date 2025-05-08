import Link from "next/link";

interface LinkButtonProps {
  text: string;
  href: string;
}

export const LinkButton = ({ text, href }: LinkButtonProps) => {
  return <Link href={href}>{text}</Link>;
};
