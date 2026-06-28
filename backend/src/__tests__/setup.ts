import { vi } from 'vitest';
import mongoose from 'mongoose';

vi.mock('mongoose', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as typeof mongoose),
    connect: vi.fn().mockResolvedValue(undefined as never),
  };
});
