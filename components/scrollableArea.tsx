import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ScrollableArea = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn("flex flex-row gap-1 overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollableArea;
