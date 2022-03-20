export const ADMIN_STUDENT_DROPDOWN_OPTIONS = [
  {
    value: 'ad',
    label: 'Admin',
    icon: '/static/icons/ic_admin.svg'
  },
  {
    value: 'st',
    label: 'Student',
    icon: '/static/icons/ic_student.svg'
  }
];

export const COURSES_TABLE_HEAD = [
  { id: 'courseName', label: 'Course Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'duration', label: 'Duration', alignRight: false },
  { id: 'courseId', label: 'Course Id', alignRight: false },
  { id: 'level', label: 'Level', alignRight: false },
  { id: 'disable', label: 'Status', alignRight: false }
];

export const MODULES_TABLE_HEAD = [
  { id: 'courseId', label: 'Course ID', alignRight: false },
  { id: 'sectionName', label: 'Section Name', alignRight: false },
  { id: 'name', label: 'Module Name', alignRight: false },
  { id: 'sequenceId', label: 'Sequence Id', alignRight: false },
  { id: 'weightage', label: 'Weightage', alignRight: false },
  { id: 'maxScore', label: 'Max Score', alignRight: false },
  { id: 'disable', label: 'Status', alignRight: false }
];

export const LESSION_TABLE_HEAD = [
  { id: 'lessionName', label: 'Lession Name', alignRight: false },
  { id: 'lessionType', label: 'Lession Type', alignRight: false },
  { id: 'level', label: 'Level', alignRight: false },
  { id: 'disable', label: 'Status', alignRight: false }
];

export const INSTRUCTOR_TABLE_HEAD = [
  { id: 'instructorName', label: 'Instructor Name', alignRight: false },
  { id: 'email', label: 'Email Id', alignRight: false },
  { id: 'ratings', label: 'Ratings', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'disable', label: 'Status', alignRight: false }
];

export const SECTION_TABLE_HEAD = [
  { id: 'courseId', label: 'Course ID', alignRight: false },
  { id: 'sectionId', label: 'Section ID', alignRight: false },
  { id: 'sectionName', label: 'Section Name', alignRight: false }
];

export const LESSION_TYPE = ['MCQ', 'CONTENT', 'VIDEO', 'EDITOR'];
export const EDITOR_TYPE = ['PROGRAMMING', 'REACTJS'];
export const GENDER = ['Male', 'Female', 'Others'];
