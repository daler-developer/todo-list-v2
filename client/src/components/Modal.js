import classNames from "classnames"
import { useRef } from "react"
import useOnClickOutside from "hooks/useOnClickOutside"
import pt from 'prop-types'
import Icon from 'components/Icon'


const Modal = ({ className, children, isHidden, title, onClose }) => {
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, () => {
    onClose()
  }, [!isHidden])

  const handleCloseBtnClick = () => {
    onClose()
  }

  return (
    <div className={classNames('modal', { 'modal--hidden': isHidden })}>
      <div className={classNames('modal__wrapper', className)} ref={modalRef}>

        <div className="modal__header">
          <h2 className="modal__title">
            {title}
          </h2>
          <button className="modal__close-btn" onClick={handleCloseBtnClick}>
            <Icon 
              className="modal__icon modal__close-icon"
              children="close"
            />
          </button>
        </div>

        <div className="modal__body">
          {children}
        </div>

      </div>
    </div>
  )
}

Modal.propTypes = {
  className: pt.string,
  children: pt.any,
  isHidden: pt.bool.isRequired,
  title: pt.string.isRequired,
  onClose: pt.func.isRequired
}

export default Modal
