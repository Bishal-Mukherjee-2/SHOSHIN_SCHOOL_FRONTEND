import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  moreButton: true,
  name: { value: faker.name.findName(), image: mockImgAvatar(index + 1) },
  company: { value: faker.company.companyName() },
  isVerified: { value: 'true' },
  status: {
    value: sample(['active', 'banned']),
    label: true,
    successLabel: ['active']
  },
  roleC: {
    value: sample([
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer'
    ])
  }
}));

export default users;
