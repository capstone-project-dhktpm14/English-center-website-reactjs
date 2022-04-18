import constants from 'utils/constants';
const settings = {
  api: {
    admin: '/admin',
    endpoint: {
      books: {
        url: '/books',
        roles: ['ROLE_ADMIN', 'ROLE_EXAM'],
      },
      classes: {
        url: '/classes',
        roles: ['ROLE_ADMIN', 'ROLE_CLASS'],
      },
      courses: {
        url: '/courses',
        roles: ['ROLE_ADMIN', 'ROLE_COURSE'],
      },
      exams: {
        url: '/exams',
        roles: ['ROLE_ADMIN', 'ROLE_EXAM'],
      },
      me: {
        url: '/me',
        roles: [],
      },
      paragraphs: {
        url: '/exams/paragraphs',
        roles: ['ROLE_ADMIN', 'ROLE_EXAM'],
      },
      questions: {
        url: '/exams/questions',
        roles: ['ROLE_ADMIN', 'ROLE_EXAM'],
      },
      routes: {
        url: '/exams/routes',
        roles: ['ROLE_ADMIN', 'ROLE_CLASS'],
      },
      topics: {
        url: '/courses/topics',
        roles: ['ROLE_ADMIN', 'ROLE_COURSE'],
      },
      users: {
        url: '/courses/topics',
        roles: ['ROLE_ADMIN'],
      },
      words: {
        url: '/courses/words',
        roles: ['ROLE_ADMIN', 'ROLE_COURSE'],
      },
      wordNoteCategories: {
        url: '/user/word-note-categories',
        roles: ['ROLE_USER'],
      },
    },
  },
  constants,
};
export default settings;
