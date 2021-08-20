import create from 'zustand';

export interface CourseDialogInfo {
  name: string;
  area: string;
  level: string;
}

export interface CourseDialogState {
  open: boolean;
  setCourseInfo: (info: CourseDialogInfo) => void;
  toggleVisibility: (open: boolean) => void;
  courseInfo: CourseDialogInfo;
}

export const courseDialogStore = create<CourseDialogState>((set) => ({
  open: false,
  toggleVisibility: (open) => set((state) => ({ open: open })),
  setCourseInfo: (info) =>
    set((state) => ({
      ...state,
      courseInfo: { area: info.area, level: info.level, name: info.name },
    })),
  courseInfo: {
    area: '',
    level: '',
    name: '',
  },
}));
