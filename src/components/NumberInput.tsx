import { useState, useEffect } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: string) => void;
  className?: string;
  min?: string;
  step?: string;
}

/**
 * A number input that shows empty when focused and value is 0,
 * and shows 0 when blurred. This prevents the "022" problem
 * while keeping 0 visible when not editing.
 */
function NumberInput({ value, onChange, className, min, step }: NumberInputProps) {
  const [display, setDisplay] = useState<string>(String(value));
  const [focused, setFocused] = useState(false);

  // Sync display with parent value when not focused
  useEffect(() => {
    if (!focused) {
      setDisplay(String(value));
    }
  }, [value, focused]);

  function handleFocus() {
    setFocused(true);
    // If value is 0, show empty so user can type fresh
    if (value === 0) {
      setDisplay("");
    }
  }

  function handleBlur() {
    setFocused(false);
    // If left empty, reset to 0
    if (display === "" || display === "-") {
      setDisplay("0");
      onChange("0");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setDisplay(raw);
    onChange(raw);
  }

  return (
    <input
      type="number"
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      min={min}
      step={step}
    />
  );
}

export default NumberInput;