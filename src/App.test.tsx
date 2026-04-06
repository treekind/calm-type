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

    expect(screen.getByText('Drücke A.')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'g' });

    expect(screen.getByText('Drücke A.')).toBeInTheDocument();
    expect(screen.getByText(uiText.exercise.hintTryKey)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'a' });

    expect(screen.getByText('Drücke Ö.')).toBeInTheDocument();
    expect(screen.queryByText(uiText.exercise.hintTryKey)).not.toBeInTheDocument();
  });

  it('advances through ? and q exercises', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'calmtype.progress',
      JSON.stringify({
        currentLessonId: 'lesson-13',
        currentExerciseIndex: 0,
        currentCharIndex: 0,
        completedLessonIds: [],
      }),
    );

    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.continue }));
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    expect(screen.getByText('Drücke das Fragezeichen.')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: '?' });
    expect(screen.getByText('Drücke Q.')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'q' });
    expect(screen.getByText('Tippe das Wort.')).toBeInTheDocument();
    expect(screen.getByText(/3\/6/)).toBeInTheDocument();
  });

  it('progresses through multiple sentence exercises in final sentence lesson', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'calmtype.progress',
      JSON.stringify({
        currentLessonId: 'lesson-19',
        currentExerciseIndex: 0,
        currentCharIndex: 0,
        completedLessonIds: [],
      }),
    );

    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.continue }));
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    expect(screen.getByText(/1\/7/)).toBeInTheDocument();
    typeText('Heute übt die Gruppe ruhig.');

    expect(screen.getByText(/2\/7/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sätze' })).toBeInTheDocument();
  });

  it('requires uppercase output when an uppercase character is expected', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'calmtype.progress',
      JSON.stringify({
        currentLessonId: 'lesson-6',
        currentExerciseIndex: 0,
        currentCharIndex: 0,
        completedLessonIds: [],
      }),
    );

    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.continue }));
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    const findKeyTargetLine = () => screen.getByText((_, element) => {
      return element?.tagName.toLowerCase() === 'p' &&
        (element.textContent ?? '').includes(`${uiText.exercise.keyTarget}:`);
    });

    expect(findKeyTargetLine()).toHaveTextContent('A');

    fireEvent.keyDown(window, { key: 'a' });
    expect(findKeyTargetLine()).toHaveTextContent('A');

    fireEvent.keyDown(window, { key: 'A' });
    expect(findKeyTargetLine()).toHaveTextContent('S');
  });

  it('requires compose sequence for uppercase umlauts', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'calmtype.progress',
      JSON.stringify({
        currentLessonId: 'lesson-12',
        currentExerciseIndex: 0,
        currentCharIndex: 0,
        completedLessonIds: [],
      }),
    );

    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.continue }));
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    const findKeyTargetLine = () => screen.getByText((_, element) => {
      return element?.tagName.toLowerCase() === 'p' &&
        (element.textContent ?? '').includes(`${uiText.exercise.keyTarget}:`);
    });

    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'Ü' });
    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'Dead' });
    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'u' });
    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'U' });
    expect(findKeyTargetLine()).toHaveTextContent('Ä');
  });
});
