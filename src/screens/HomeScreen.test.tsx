import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { uiText } from '../lib/content';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
  it('renders German actions and no-progress hint', () => {
    render(
      <HomeScreen
        ui={uiText}
        hasProgress={false}
        onContinue={vi.fn()}
        onLessons={vi.fn()}
        onSettings={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: uiText.home.continue })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: uiText.home.lessons })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: uiText.home.settings })).toBeInTheDocument();
    expect(screen.getByText(uiText.home.noProgress)).toBeInTheDocument();
  });

  it('calls callbacks when actions are clicked', async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();
    const onLessons = vi.fn();
    const onSettings = vi.fn();

    render(
      <HomeScreen
        ui={uiText}
        hasProgress={true}
        onContinue={onContinue}
        onLessons={onLessons}
        onSettings={onSettings}
      />,
    );

    await user.click(screen.getByRole('button', { name: uiText.home.continue }));
    await user.click(screen.getByRole('button', { name: uiText.home.lessons }));
    await user.click(screen.getByRole('button', { name: uiText.home.settings }));

    expect(onContinue).toHaveBeenCalledTimes(1);
    expect(onLessons).toHaveBeenCalledTimes(1);
    expect(onSettings).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(uiText.home.noProgress)).not.toBeInTheDocument();
  });
});
