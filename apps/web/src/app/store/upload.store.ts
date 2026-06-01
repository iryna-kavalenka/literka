import { computed, signal } from '@angular/core';

export interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  foundText: boolean;
  text: string;
  message: string;
  error: string | null;
}

const initialState: UploadState = {
  status: 'idle',
  progress: 0,
  foundText: false,
  text: '',
  message: 'Drop an image file or select one from your device.',
  error: null,
};

const state = signal<UploadState>({ ...initialState });

export const uploadState = {
  state,
  status: computed(() => state().status),
  progress: computed(() => state().progress),
  foundText: computed(() => state().foundText),
  text: computed(() => state().text),
  message: computed(() => state().message),
  error: computed(() => state().error),
};

export function resetUploadState() {
  state.set({ ...initialState });
}

export function setUploadProgress(progress: number) {
  state.update((current) => ({ ...current, progress, status: 'uploading' }));
}

export function setUploadSuccess(text: string) {
  state.set({
    status: 'success',
    progress: 100,
    foundText: Boolean(text),
    text,
    message: text ? 'Text detected successfully.' : 'No text found in image.',
    error: null,
  });
}

export function setUploadError(error: string) {
  state.set({
    status: 'error',
    progress: 0,
    foundText: false,
    text: '',
    message: 'Upload failed. Please try again with a valid image.',
    error,
  });
}
