import classNames from 'classnames'
import pt from 'prop-types'


const LoadingButton = ({ isLoading, className, restProps, classes, children, type }) => {
  return (
    <button {...restProps?.root} type={type || 'button'} className={classNames('loading-button', classes?.root, className)} disabled={isLoading}>
      {isLoading ? (
        <div
          className={classNames('loading-button__spinner', classes?.spinner)}
          {...restProps?.spinner}
        />
      ) : children}
    </button>
  )
}

LoadingButton.propTypes = {
  isLoading: pt.bool.isRequired,
  className: pt.string,
  restProps: pt.object,
  classes: pt.object,
  children: pt.any.isRequired,
  type: pt.oneOf(['button', 'submit'])
}

export default LoadingButton
