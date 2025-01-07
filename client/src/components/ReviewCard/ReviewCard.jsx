import { useState } from 'react'
import FiveStarsRatingIcon from '../../assets/five-stars-rating.png'

export function ReviewCard ({ review, deleteReviewFromDB, handleEditReview }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedReview, setEditedReview] = useState(review.review)

  const handleChange = (e) => {
    setEditedReview(e.target.value)
  }

  const handleSaveEdit = () => {
    handleEditReview({ ...review, review: editedReview })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedReview(review.review)
  }

  return (
    <li className='review'>
      <div>
        <p className='date'>{review.review_date.split('T')[0]}</p>
        <p className='title'>{review.title}</p>
        <p className='authors'>by {review?.authors || 'Unknown author'}</p>
        <img className='five-stars-icon' src={FiveStarsRatingIcon} alt='rating' />

        {isEditing
          ? (
            <div className='edit-review'>
              <textarea
                value={editedReview}
                onChange={handleChange}
                rows='4'
                className='edit-textarea'
              />
              <div className='save-cancel-buttons'>
                <button className='save-edit' onClick={handleSaveEdit}>Save</button>
                <button className='cancel-edit' onClick={handleCancelEdit}>Cancel</button>
              </div>
            </div>
            )
          : (
            <p className='review-text'>{review.review}</p>
            )}
      </div>
      <div className='buttons'>
        {!isEditing && <button className='edit-icon' onClick={() => setIsEditing(true)} />}
        {!isEditing && <button className='delete-icon' onClick={() => deleteReviewFromDB(review.review_id)} />}
      </div>
    </li>
  )
}
