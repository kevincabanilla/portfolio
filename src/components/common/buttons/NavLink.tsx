type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  hashId: string;
  onNavigate: (id: string) => void;
};

export default function NavLink({
  hashId,
  onNavigate,
  className,
  children,
  ...props
}: NavLinkProps) {
  return (
    <a
      className={className}
      href={`#${hashId}`}
      {...props}
      onClick={(e) => {
        if (!e.ctrlKey) {
          e.preventDefault();
          onNavigate(hashId);
        }
      }}
    >
      {children}
    </a>
  );
}
