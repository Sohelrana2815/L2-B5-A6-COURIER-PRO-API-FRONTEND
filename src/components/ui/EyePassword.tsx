/* eslint-disable @typescript-eslint/no-explicit-any */
import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

interface EyePasswordProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  [key: string]: any;
}

export default function EyePassword({
  value,
  onChange,
  ...field
}: EyePasswordProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          type={isVisible ? "text" : "password"}
          value={value || ""}
          onChange={onChange}
          {...field}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
