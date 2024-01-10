// atoms/modalState.ts
import { atom } from 'recoil';

// 상담일지
interface CounselingContent {
  content: string | null;
}

export const counselingContent = atom<CounselingContent>({
  key: 'counselingContent',
  default: {
    content: null,
  },
});

interface CounselingValue {
  content: string | null;
}

export const counselingValue = atom<CounselingValue>({
  key: 'counselingValue',
  default: {
    content: null,
  },
});

//업무일지
interface WorkDiaryContents {
  content: string | null;
}

export const workDiaryContents = atom<WorkDiaryContents>({
  key: 'workDiaryContents',
  default: {
    content: null,
  },
});

// 학생 관찰 일지
interface ObservationContent {
  content: string | null;
}

export const observationContent = atom<ObservationContent>({
  key: 'observationContent',
  default: {
    content: null,
  },
});

interface GuidancePlanContent {
  content: string | null;
}

export const guidancePlanContent = atom<GuidancePlanContent>({
  key: 'guidancePlanContent',
  default: {
    content: null,
  },
});
