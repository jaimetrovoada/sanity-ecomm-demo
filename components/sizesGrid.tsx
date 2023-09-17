import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  sizes: string[];
  sizeState: string | null;
  handleSizeChange: (size: string) => void;
}
const SizesGrid = ({ sizes, sizeState, handleSizeChange }: Props) => {
  return (
    <div className="flex max-w-xs flex-row flex-wrap gap-1">
      {sizes.map((size) => {
        return (
          <Button
            key={size}
            className={cn(
              "flex-1 border-2 p-2 text-sm uppercase text-gray-600",
              {
                "border-slate-400": size === sizeState,
              },
            )}
            variant="outline"
            onClick={() => handleSizeChange(size)}
          >
            {size}
          </Button>
        );
      })}
    </div>
  );
};

export default SizesGrid;
