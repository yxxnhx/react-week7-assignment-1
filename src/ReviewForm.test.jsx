import { render, screen, fireEvent } from '@testing-library/react';

import ReviewForm from './ReviewForm';
import reviewControls from '../fixtures/reviewControls';

describe('ReviewForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderReviewForm() {
    return render((
      <ReviewForm
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    ));
  }

  it('리뷰 form을 랜더링한다', () => {
    renderReviewForm();

    expect(screen.queryByLabelText('평점')).not.toBeNull();
    expect(screen.queryByLabelText('리뷰 내용')).not.toBeNull();
  });

  it('onChange 이벤트를 호출한다', () => {
    renderReviewForm();

    reviewControls.forEach(({ label, name, value }) => {
      const input = screen.getByLabelText(label);

      fireEvent.change(input, { target: { value } });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('리뷰 남기기 버튼이 랜더링된다', () => {
    renderReviewForm();

    fireEvent.click(screen.getByText('리뷰 남기기'));

    expect(handleSubmit).toBeCalled();
  });
});