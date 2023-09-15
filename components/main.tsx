import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"main"> {}

const Main = ({ className, children, ...props }: Props) => {
  return (
    <main className={cn("container py-4", className)} {...props}>
      {children}
    </main>
  );
};

export default Main;
