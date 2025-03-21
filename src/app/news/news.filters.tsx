import { cn } from "@/lib/utils";

interface NewsFiltersProps {
  title: string;
  value: string;
  options: { text: string; value: string }[];
  onChange: (value: string) => void;
}

export default function NewsFilters({
  title,
  value,
  options,
  onChange,
}: NewsFiltersProps) {
  return (
    <div>
      <h3 className="px-4 py-2 bg-[#0D169E] rounded-md font-bold text-white">
        {title}
      </h3>

      <button
        className={cn(
          "block w-full py-2 px-4 rounded-md text-left hover:bg-gray-100"
        )}
        onClick={() => onChange("")}
      >
        Tất cả
      </button>

      {options.map((option) => (
        <button
          className={cn(
            "block w-full py-2 px-4 rounded-md text-left hover:bg-gray-100",
            {
              "text-[#0D169E]": value === option.value,
            }
          )}
          key={option.value}
          onClick={() => onChange(option.value)}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
