import './EmptyState.css'
interface EmptyStateProps {
  errorMessage: string
}

const EmptyState = ({errorMessage}: EmptyStateProps) => {
  return (
    <div className="error-msg-container">
      <h2 className="error-message">{errorMessage}</h2>
    </div>
  )
}

export default EmptyState