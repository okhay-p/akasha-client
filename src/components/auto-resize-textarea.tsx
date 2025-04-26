"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export interface AutoResizeTextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange"
  > {
  onChange?: (value: string) => void;
  maxHeight?: number;
}

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ className, onChange, maxHeight = 300, value, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [textareaValue, setTextareaValue] = React.useState(value || "");

  // Merge refs
  React.useImperativeHandle(
    ref,
    () => textareaRef.current as HTMLTextAreaElement,
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTextareaValue(val);
    onChange?.(val);

    // Trigger resize
    adjustHeight();
  };

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Calculate new height
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Add overflow if content exceeds maxHeight
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [maxHeight]);

  // Adjust height on mount and when value changes
  React.useEffect(() => {
    adjustHeight();
  }, [textareaValue, adjustHeight]);

  // Adjust height on window resize
  React.useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return (
    <Textarea
      ref={textareaRef}
      value={textareaValue}
      onChange={handleChange}
      className={cn(
        "resize-none overflow-hidden transition-height duration-100",
        className,
      )}
      rows={1}
      {...props}
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
