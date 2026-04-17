import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExerciseText from './ExerciseText';

describe('ExerciseText', () => {
  it('marks current character as active', () => {
    render(<ExerciseText targetText="haus" charIndex={1} />);

    const activeChar = screen.getByText('a');
    expect(activeChar).toHaveClass('bg-(--char-active-bg)');
    expect(activeChar).toHaveClass('font-semibold');
  });

  it('shows enter token as the last step', () => {
    render(<ExerciseText targetText="haus" charIndex={4} />);

    const enterToken = screen.getByText('↵');
    expect(enterToken).toHaveClass('bg-(--char-active-bg)');
    expect(enterToken).toHaveClass('font-semibold');
  });
});
