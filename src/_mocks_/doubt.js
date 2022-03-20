import { mockImgAvatar } from '../utils/mockImages';
import faker from 'faker';

export const DOUBTMODEL = [
  {
    profileImageStudent: mockImgAvatar(1),
    courseId: 'CLD',
    module: '564t3rf353',
    lession: 'fdsfe4ygregt',
    title: 'please help',
    description: 'please hep me',
    doubtCreatedDate: '12-02-2022',
    studentEmail: 'yash@gmail.com',
    studentName: 'Yash Khandelwal',
    currentMentor: 'janvi@gmail.com',
    currentMentorProfileImage: 'http://45tefsdfd',
    state: 'inactive',
    lastMessage: 'hey',
    roomId: faker.datatype.uuid(),
    mentors: [
      {
        email: 'vish@gmail',
        profileImage: 'vhfgdfsd',
        escalated: true,
        timeStamp: 545442
      },
      {
        email: 'janvi@gmail',
        profileImage: 'vhfgdfsd',
        escalated: false,
        timeStamp: 545442
      }
    ],
    chats: [
      {
        type: 'text',
        value: 'Hello Daniel, Godaddy here. We saw your works lately and we would like.',
        sender: 'yash@gmail.com',
        timeStamp: 543532
      },
      {
        type: 'image',
        value: 'http://wwwfdv.cc',
        sender: 'yash@gmail.com',
        timeStamp: 543532
      },
      {
        type: 'text',
        value: 'Hello, thanks for reaching out. How is the terms',
        sender: 'janvi@gmail.com',
        timeStamp: 674848
      },
      {
        type: 'text',
        value: 'Hello, thanks for reaching out. How is the terms, hdgdydb dhdyehd dkjdbiqyw ',
        sender: 'janvi@gmail.com',
        timeStamp: 674848
      }
    ]
  },
  {
    profileImageStudent: mockImgAvatar(2),
    courseId: 'CLD',
    module: '564t3rf353',
    lession: 'fdsfe4ygregt',
    title: 'please help',
    description: 'please hep me',
    doubtCreatedDate: '12-02-2022',
    studentEmail: 'yash@gmail.com',
    studentName: 'Vishakha',
    currentMentor: 'janvi@gmail.com',
    currentMentorProfileImage: 'http://45tefsdfd',
    state: 'inactive',
    lastMessage: 'bffgf',
    roomId: faker.datatype.uuid(),
    mentors: [
      {
        email: 'vish@gmail',
        profileImage: 'vhfgdfsd',
        escalated: true,
        timeStamp: 545442
      },
      {
        email: 'janvi@gmail',
        profileImage: 'vhfgdfsd',
        escalated: false,
        timeStamp: 545442
      }
    ],
    chats: [
      {
        type: 'text',
        value: 'gdfdgdg',
        sender: 'yash@gmail.com',
        timeStamp: 543532
      },
      {
        type: 'image',
        value: 'http://wwwfdv.cc',
        sender: 'yash@gmail.com',
        timeStamp: 543532
      }
    ]
  },
  {
    profileImageStudent: mockImgAvatar(3),
    courseId: 'CLD',
    module: '564t3rf353',
    lession: 'fdsfe4ygregt',
    title: 'please help',
    description: 'please hep me',
    doubtCreatedDate: '12-02-2022',
    studentEmail: 'yash@gmail.com',
    studentName: 'Yash',
    currentMentor: 'janvi@gmail.com',
    currentMentorProfileImage: 'http://45tefsdfd',
    state: 'inactive',
    lastMessage: 'bffgf',
    roomId: faker.datatype.uuid(),
    mentors: [
      {
        email: 'vish@gmail',
        profileImage: 'vhfgdfsd',
        escalated: true,
        timeStamp: 545442
      },
      {
        email: 'janvi@gmail',
        profileImage: 'vhfgdfsd',
        escalated: false,
        timeStamp: 545442
      }
    ],
    chats: [
      {
        type: 'text',
        value: 'gdfdgdg',
        sender: 'yash@gmail.com',
        timeStamp: 543532
      },
      {
        type: 'image',
        value: 'http://wwwfdv.cc',
        sender: 'yash@gmail.com',
        timeStamp: 543532
      }
    ]
  }
];

export const CURRENTUSER = 'janvi@gmail.com';
