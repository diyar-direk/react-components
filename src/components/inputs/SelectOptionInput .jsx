import { memo, useCallback, useEffect, useState } from "react";
import "./inputs.css";
import Button from "../buttons/Button";
/**
 * @typedef utils
 * @property {array} options
 * @property {string} errorText
 * @property {string} label
 * @property {string} placeholder
 * @property {string} value
 * @property {()=> void} onIgnore
 * @property {()=> void} onSelectOption
 */
/**
 *
 * @param {utils} props
 */
const SelectOptionInput = ({
  label,
  placeholder,
  onIgnore,
  value,
  options,
  onSelectOption,
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggelOptionArea = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);
  const handleSelect = useCallback(
    (option) => {
      option.onSelectOption ? option.onSelectOption() : onSelectOption(option);
      setIsOpen(false);
    },
    [onSelectOption]
  );

  useEffect(() => {
    const onBodyClick = window.addEventListener("click", () => {
      if (isOpen) setIsOpen(false);
    });
    return () => window.removeEventListener("click", onBodyClick);
  }, [isOpen]);

  return (
    <div className="select-input">
      <label onClick={toggelOptionArea}>{label}</label>
      <div>
        <div onClick={toggelOptionArea}>
          {placeholder} <i className="fa-solid fa-chevron-down"></i>
        </div>
        <article className={isOpen ? "active" : ""}>
          {options?.map((opt) => (
            <h3 key={opt.text} onClick={() => handleSelect(opt)}>
              {opt?.text}
            </h3>
          ))}
        </article>
      </div>
      {value && (
        <Button onClick={onIgnore} btnStyleType="outlin" btnType="delete">
          {value}
        </Button>
      )}
      {errorText && <p className="color-red">{errorText}</p>}
    </div>
  );
};

export default memo(SelectOptionInput);
