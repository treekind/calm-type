import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExerciseText from './ExerciseText';

describe('ExerciseText', () => {
  it('marks current character as active', () => {
    render(<ExerciseText targetText="haus" charIndex={1} />);

    const activeChar = screen.getByText('a');
    expect(activeChar).toHaveClass('bg-[var(--char-active-bg)]');
    expect(activeChar).toHaveClass('font-semibold');
  });
});
