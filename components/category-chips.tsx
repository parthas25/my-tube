import Image from "next/image";
import { CATEGORIES, type CategoryId } from "@/lib/catalog";

export function CategoryChips({
  active,
  onSelect,
}: {
  active: CategoryId;
  onSelect: (category: CategoryId) => void;
}) {
  return (
    <div className="no-scrollbar -mx-1 mt-4 flex gap-2.5 overflow-x-auto px-1 pb-1">
      {CATEGORIES.map((category) => {
        const selected = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(category.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full py-1 pr-4 pl-1 text-sm font-semibold ${category.className} ${
              selected ? "ring-2 ring-meow ring-offset-2 ring-offset-background" : ""
            }`}
          >
            <Image
              src={category.image}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
