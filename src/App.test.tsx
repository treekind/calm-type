import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  function findKeyTargetLine() {
    return screen.getByText((_, element) => {
      return element?.tagName.toLowerCase() === 'p' &&
        (element.textContent ?? '').includes(`${uiText.exercise.keyTarget}:`);
    });
  }

  it('keeps the same target and shows calm guidance on wrong key', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.settings }));
    await user.click(screen.getByRole('button', { name: uiText.settings.inputGentle }));
    await user.click(screen.getByRole('button', { name: uiText.common.back }));
    await user.click(screen.getByRole('button', { name: uiText.home.lessons }));
    await user.click(screen.getAllByRole('button', { name: uiText.lessonList.start })[0]);
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    expect(screen.getByText('Tippe das Muster.')).toBeInTheDocument();
    expect(findKeyTargetLine()).toHaveTextContent('a');

    fireEvent.keyDown(window, { key: 'g' });

    expect(findKeyTargetLine()).toHaveTextContent('a');
    expect(screen.getByText(uiText.exercise.hintTryKey)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'a' });

    expect(findKeyTargetLine()).toHaveTextContent('s');
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

    expect(screen.getByText('Tippe das Muster.')).toBeInTheDocument();
    expect(screen.getByText(/1\/5/)).toBeInTheDocument();

    typeText('quel qual qua que quo');
    expect(screen.getByText(/1\/5/)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(screen.getByText(/2\/5/)).toBeInTheDocument();

    typeText('qua? quel? quo? qua? quel?');
    expect(screen.getByText(/2\/5/)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(screen.getByText('Tippe die Wörter.')).toBeInTheDocument();
    expect(screen.getByText(/3\/5/)).toBeInTheDocument();
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

    expect(screen.getByText(/1\/5/)).toBeInTheDocument();
    typeText('Mia liest ein Buch laut.');
    expect(screen.getByText(/1\/5/)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Enter' });

    expect(screen.getByText(/2\/5/)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sätze' })).not.toBeInTheDocument();
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

    expect(findKeyTargetLine()).toHaveTextContent('N');

    fireEvent.keyDown(window, { key: 'a' });
    expect(findKeyTargetLine()).toHaveTextContent('N');

    fireEvent.keyDown(window, { key: 'N' });
    expect(findKeyTargetLine()).toHaveTextContent('a');
  });

  it('does not accept uppercase input when lowercase is expected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.lessons }));
    await user.click(screen.getAllByRole('button', { name: uiText.lessonList.start })[0]);
    await user.click(screen.getByRole('button', { name: uiText.practiceIntro.start }));

    expect(findKeyTargetLine()).toHaveTextContent('a');

    fireEvent.keyDown(window, { key: 'A' });
    expect(findKeyTargetLine()).toHaveTextContent('a');

    fireEvent.keyDown(window, { key: 'a' });
    expect(findKeyTargetLine()).toHaveTextContent('s');
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

    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'Ü' });
    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'Dead' });
    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'u' });
    expect(findKeyTargetLine()).toHaveTextContent('Ü');

    fireEvent.keyDown(window, { key: 'U' });
    expect(findKeyTargetLine()).toHaveTextContent('␣');

    fireEvent.keyDown(window, { key: ' ' });
    expect(findKeyTargetLine()).toHaveTextContent('Ä');
  });

  it('forces finger hints off when keyboard hints are disabled', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: uiText.home.settings }));
    await user.click(screen.getByRole('button', { name: uiText.settings.fingerHints }));
    await user.click(screen.getByRole('button', { name: uiText.settings.keyboardHints }));

    expect(
      screen.queryByRole('button', { name: uiText.settings.fingerHints }),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      const stored = localStorage.getItem('calmtype.settings');
      expect(stored).not.toBeNull();
      expect(JSON.parse(stored ?? '{}')).toMatchObject({
        keyboardHints: false,
        fingerHints: false,
      });
    });
  });
});
