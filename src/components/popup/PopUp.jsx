/**
 * @typedef {Object} divProps
 * @property {boolean} isOpen
 * @property {() => void} [onClose]
 */

/**
 * @param {divProps} props
 */
const PopUp = ({ isOpen = false, onClose = () => {}, children, ...props }) => {
  if (isOpen)
    return (
      <div className="overlay" {...props} onClick={onClose}>
        <div className="popup">{children}</div>
      </div>
    );
};

export default PopUp;
