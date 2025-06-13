import { LinkProps } from "@/types/props";

export const Link = ({ href, children, className }: LinkProps) => {
  return (
    <a href={`${href}`} className={className}>
      {children}
    </a>
  );
};
