import Link from "next/link";

interface ButtonNavProps {
  text: string;
  width?: string;
  height?: string;
  background?: string;
  textcolor?: string;
  hover?: string;
  href: string;
}

export const ButtonNav: React.FC<ButtonNavProps> = ({
  text,
  width,
  height,
  background,
  textcolor,
  hover,
  href,
  ...rest
}) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center w-full h-${height} font-primary text-lg font-semibold leading-7 rounded-md bg-${background} text-${textcolor} hover:bg-${hover}`}
      style={{ width }}
      {...rest}
    >
      {text}
    </Link>
  );
};
