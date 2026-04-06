import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import KeyboardQwertz from './KeyboardQwertz';

describe('KeyboardQwertz', () => {
  it('does not render when keyboard hints are disabled', () => {
    render(<KeyboardQwertz targetKey="f" showHints={false} showFingers={false} />);
    expect(screen.queryByText('f')).not.toBeInTheDocument();
  });

  it('can show keyboard and finger hints via gentle hint level', () => {
    render(
      <KeyboardQwertz
        targetKey="a"
        showHints={false}
        showFingers={false}
        hintLevel={2}
      />,
    );

    const aLabel = screen.getByText('a');
    const keyContainer = aLabel.closest('div');
    expect(keyContainer).toBeInTheDocument();
    if (!keyContainer) {
      return;
    }
    expect(within(keyContainer).getByText('1')).toBeInTheDocument();
  });

  it('highlights the target key and can show finger hints', () => {
    const { rerender } = render(<KeyboardQwertz targetKey="q" showHints={true} showFingers={true} />);

    const qLabel = screen.getByText('q');
    const keyContainer = qLabel.closest('div');
    expect(keyContainer).toBeInTheDocument();
    expect(keyContainer).toHaveClass('border-(--accent)');

    if (!keyContainer) {
      return;
    }
    expect(within(keyContainer).getByText('1')).toBeInTheDocument();

    rerender(<KeyboardQwertz targetKey="q" showHints={true} showFingers={false} />);
    const qLabelWithoutFinger = screen.getByText('q');
    const keyWithoutFinger = qLabelWithoutFinger.closest('div');
    expect(keyWithoutFinger).toBeInTheDocument();
    if (!keyWithoutFinger) {
      return;
    }
    expect(within(keyWithoutFinger).queryByText('1')).not.toBeInTheDocument();
  });

  it('adds a subtle pulse class for the highest hint level', () => {
    render(
      <KeyboardQwertz targetKey="f" showHints={true} showFingers={false} hintLevel={3} />,
    );

    const fLabel = screen.getByText('f');
    const keyContainer = fLabel.closest('div');
    expect(keyContainer).toBeInTheDocument();
    expect(keyContainer).toHaveClass('animate-gentle-key-pulse');
  });

  it('highlights shifted punctuation keys for ! and ?', () => {
    const { rerender } = render(
      <KeyboardQwertz targetKey="!" showHints={true} showFingers={false} />,
    );

    expect(screen.getByText('!')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();

    const diaeresisLabel = screen.getByText('¨');
    const diaeresisKey = diaeresisLabel.closest('div');
    expect(diaeresisKey).toBeInTheDocument();
    expect(diaeresisKey).toHaveClass('border-(--accent)');

    const shiftForExclamation = screen.getAllByText('Shift');
    expect(shiftForExclamation[0]).toHaveClass('border-(--accent)');
    expect(shiftForExclamation[1]).not.toHaveClass('border-(--accent)');

    rerender(<KeyboardQwertz targetKey="?" showHints={true} showFingers={false} />);

    const apostropheLabel = screen.getByText("'");
    const apostropheKey = apostropheLabel.closest('div');
    expect(apostropheKey).toBeInTheDocument();
    expect(apostropheKey).toHaveClass('border-(--accent)');

    const shiftForQuestion = screen.getAllByText('Shift');
    expect(shiftForQuestion[0]).toHaveClass('border-(--accent)');
    expect(shiftForQuestion[1]).not.toHaveClass('border-(--accent)');
  });

  it('shows recommended shift side for uppercase letters', () => {
    const { rerender } = render(
      <KeyboardQwertz targetKey="A" showHints={true} showFingers={false} />,
    );

    let shiftKeys = screen.getAllByText('Shift');
    expect(shiftKeys[0]).not.toHaveClass('border-(--accent)');
    expect(shiftKeys[1]).toHaveClass('border-(--accent)');

    rerender(<KeyboardQwertz targetKey="L" showHints={true} showFingers={false} />);
    shiftKeys = screen.getAllByText('Shift');
    expect(shiftKeys[0]).toHaveClass('border-(--accent)');
    expect(shiftKeys[1]).not.toHaveClass('border-(--accent)');

    rerender(<KeyboardQwertz targetKey="Ä" showHints={true} showFingers={false} />);
    const diaeresisLabel = screen.getByText('¨');
    const diaeresisKey = diaeresisLabel.closest('div');
    expect(diaeresisKey).toHaveClass('border-(--accent)');

    const aLabel = screen.getByText('a');
    const aKey = aLabel.closest('div');
    expect(aKey).toHaveClass('border-(--accent)');

    shiftKeys = screen.getAllByText('Shift');
    expect(shiftKeys[0]).not.toHaveClass('border-(--accent)');
    expect(shiftKeys[1]).toHaveClass('border-(--accent)');
  });

  it('shows alt layer labels used in lessons', () => {
    render(<KeyboardQwertz targetKey="#" showHints={true} showFingers={false} />);

    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });
});
