import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import { uiText } from './lib/content';

function typeText(text: string): void {
  for (const char of text) {
    fireEvent.keyDown(window, { key: char });
  }
}

describe('App gentle input mode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('keeps the same target and shows calm guidance on wrong key', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.settings }));
    await user.click(screen.getByRole('button', { name: uiText.settings.inputGentle }));
    await user.click(screen.getByRole('button', { name: uiText.common.back }));
    await user.click(screen.getByRole('button', { name: uiText.home.lessons }));
    await user.click(screen.getAllByRole('button', { name: uiText.lessonList.start })[0]);
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    expect(screen.getByText('Drücke F.')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'g' });

    expect(screen.getByText('Drücke F.')).toBeInTheDocument();
    expect(screen.getByText(uiText.exercise.hintTryKey)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'f' });

    expect(screen.getByText('Drücke J.')).toBeInTheDocument();
    expect(screen.queryByText(uiText.exercise.hintTryKey)).not.toBeInTheDocument();
  });

  it('advances through punctuation exercises with ! and ?', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'calmtype.progress',
      JSON.stringify({
        currentLessonId: 'lesson-15',
        currentExerciseIndex: 0,
        currentCharIndex: 0,
        completedLessonIds: [],
      }),
    );

    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.continue }));
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    expect(screen.getByText('Drücke das Ausrufezeichen.')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: '!' });
    expect(screen.getByText('Drücke das Fragezeichen.')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: '?' });
    expect(screen.getByText('Tippe den Satz.')).toBeInTheDocument();
    expect(screen.getByText(/3\/4/)).toBeInTheDocument();
  });

  it('progresses through multiple sentence exercises in sentence practice lesson', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'calmtype.progress',
      JSON.stringify({
        currentLessonId: 'lesson-16',
        currentExerciseIndex: 0,
        currentCharIndex: 0,
        completedLessonIds: [],
      }),
    );

    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.continue }));
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    expect(screen.getByText(/1\/5/)).toBeInTheDocument();
    typeText('Nina malt ein Haus.');

    expect(screen.getByText(/2\/5/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Satzpraxis 1' })).toBeInTheDocument();
  });
});
