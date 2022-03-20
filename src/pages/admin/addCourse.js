import { useEffect } from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import faker from 'faker';
import { sample } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import FileBase from 'react-file-base64';
import CustomTable from '../table';
import { getAllInstructors } from '../../services/admin/instructor';

// utils
import { mockImgAvatar } from '../../utils/mockImages';
// material
import {
  Card,
  Table,
  Stack,
  Grid,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CancelIcon from '@material-ui/icons/Cancel';

// components
import Page from '../../components/Page';
import { AppTrafficBySite } from '../../components/_dashboard/app';

// Services

import {
  createAdminCourse,
  getAdminCourses,
  deleteAdminCourse,
  editAdminCourse
} from '../../services/admin/courses';
import { createAdminDashboard } from 'src/services/admin/modules';

//constants
import { COURSES_TABLE_HEAD } from '../../constants/admin';
import { AllInboxSharp } from '@material-ui/icons';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  moreButton: true,
  name: { value: faker.name.findName(), image: mockImgAvatar(index + 1) },
  company: { value: faker.company.companyName() },
  isVerified: { value: 'yes' },
  status: {
    value: sample(['active', 'disabled']),
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

export const isValidEmail = (emailId) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailId
  );
};

const Course = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const { courseDetails, setCourseDetails, allInstructors } = props;

  const [selectedInstructor, setSelectedInstructor] = useState(
    allInstructors &&
      allInstructors[0] && { name: allInstructors[0].name, id: allInstructors[0]._id }
  );
  const [courseInstructors, setCourseInstructors] = useState([]);
  console.log('final - ', courseInstructors);

  const [emails, setEmails] = useState(' ');
  const [blacklistEmail, setBlacklistEmail] = useState(true);
  console.log('emaails', emails);

  const addInstructors = (e) => {
    const duplicate = courseInstructors.filter((ins) => ins.id === selectedInstructor.id);
    if (duplicate.length === 0) {
      setCourseInstructors((prev) => [...prev, selectedInstructor]);
    } else {
      enqueueSnackbar('Instructor already exists', {
        variant: 'warning'
      });
    }
  };

  const onInstructorChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    console.log('key 2 ', e.target.options[selectedIndex].getAttribute('key2'));
    const id = e.target.options[selectedIndex].getAttribute('key2');
    const name = e.target.value;
    setSelectedInstructor({
      name: name,
      id: id
    });
  };

  const deleteInstructor = (index, value) => {
    setCourseInstructors((prev) => {
      if (!prev) return prev;
      let copy = [...prev];
      console.log('Copy and Index ==>>>', copy, index);
      const val = copy[index];
      copy = copy.filter((opt) => opt !== val);
      return copy;
    });
  };

  const saveBlacklistEmails = () => {
    if (emails) {
      const splitEmails = emails.split(',');
      const trimmedEmails = splitEmails.map((domain) => {
        const data = domain.replace(/['"]+/g, '');
        return data.trim().toLowerCase();
      });

      const validEmails = trimmedEmails.filter((email) => isValidEmail(email));
      setCourseDetails({ ...courseDetails, blacklistedEmails: validEmails });
      setEmails('');
      console.log('trim', validEmails);
    }
  };

  const emailInputHandler = (e) => {
    e.preventDefault();
    setEmails(e.target.value);
    setBlacklistEmail(false);
  };

  return (
    <Container>
      {/* <Card>
        <CardHeader>Course Details</CardHeader> */}

      <Grid container spacing={3} style={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Course Id</div>
            <input
              className="input"
              type="text"
              value={courseDetails.courseId}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  courseId: e.target.value
                })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Course Banner</div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setCourseDetails({ ...courseDetails, bannerImage: base64 })}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Program Name</div>
            <input
              className="input"
              type="text"
              value={courseDetails.program}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  program: e.target.value
                })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Duration</div>
            <input
              className="input"
              type="text"
              value={courseDetails.duration}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  duration: e.target.value
                })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Price</div>
            <input
              className="input"
              type="number"
              value={courseDetails.price}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  price: e.target.value
                })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Discount Percent</div>
            <input
              className="input"
              type="text"
              value={courseDetails.discountPercent}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  discountPercent: e.target.value
                })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Enroll By Date</div>
            <input
              className="input"
              type="date"
              value={courseDetails.enrollBy}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  enrollBy: e.target.value
                })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Number of practised ques</div>
            <input
              className="input"
              type="number"
              value={courseDetails.practiceQuestions}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  practiceQuestions: e.target.value
                })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Disable Course</div>
            {/* <input className = "input"  type = {s.type} /> */}
            <select
              className="input"
              name="Disable Course"
              value={courseDetails.disable}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  disable: e.target.value
                })
              }
            >
              {['false', 'true'].map((o, i) => (
                <option key={i} value={o}>
                  {' '}
                  {o}{' '}
                </option>
              ))}
            </select>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">BlackListed Emails</div>

            {courseDetails.blacklistedEmails.length > 0 ? (
              <>
                {courseDetails.blacklistedEmails.map((email, index) => {
                  return <div key={index}>{email}</div>;
                })}
                <div
                  onClick={() =>
                    setCourseDetails({
                      ...courseDetails,
                      blacklistedEmails: []
                    })
                  }
                >
                  <CancelIcon style={{ cursor: 'pointer' }} />
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  className="input"
                  type={'text'}
                  value={emails}
                  onChange={(e) => emailInputHandler(e)}
                />
                {!blacklistEmail && (
                  <div style={{ marginLeft: '4px', cursor: 'pointer' }}>
                    <AddCircleOutlineOutlinedIcon onClick={() => saveBlacklistEmails()} />
                  </div>
                )}
              </div>
            )}

            <div />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Level</div>
            {/* <input className = "input"  type = {s.type} /> */}
            <select
              value={courseDetails.level}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  level: e.target.value
                })
              }
              className="input"
              name="Level"
            >
              {['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((opt, index) => (
                <option key={index} value={opt}>
                  {' '}
                  {opt}{' '}
                </option>
              ))}
            </select>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Prerequisite</div>
            <textarea
              value={courseDetails.prerequisite}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  prerequisite: e.target.value
                })
              }
              className="multiline"
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Detailed Description</div>
            <textarea
              value={courseDetails.detailedDescription}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  detailedDescription: e.target.value
                })
              }
              className="multiline"
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Video Url</div>
            <textarea
              value={courseDetails.videoUrl}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  videoUrl: e.target.value
                })
              }
              className="multiline"
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Syllabus Url</div>
            <textarea
              value={courseDetails.syllabusUrl}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  syllabusUrl: e.target.value
                })
              }
              className="multiline"
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Course Sub Heading</div>
            <textarea
              value={courseDetails.subHeading}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  subHeading: e.target.value
                })
              }
              className="multiline"
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Course Heading</div>
            <textarea
              value={courseDetails.heading}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  heading: e.target.value
                })
              }
              className="multiline"
              rows="4"
              cols="35"
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          {courseInstructors.map((value, index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  maxWidth: '70%'
                }}
                key={index}
              >
                <div>{value.name}</div>
                <div style={{ cursor: 'pointer' }}>
                  <CancelIcon onClick={() => deleteInstructor(index, value)} />
                </div>
              </div>
            );
          })}
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Instructor</div>
            <select
              className="input"
              value={selectedInstructor && selectedInstructor.name}
              onChange={(e) => onInstructorChange(e)}
            >
              {allInstructors.map((opt) => (
                <option key={opt.name} key2={opt._id} value={opt.name}>
                  {' '}
                  {opt.name}{' '}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: '16px', cursor: 'pointer', marginRight: '40rem' }}>
            <AddCircleOutlineOutlinedIcon onClick={() => addInstructors()} />{' '}
          </div>
        </Grid>
      </Grid>
      {/* </Card> */}
    </Container>
  );
};

const CourseProspectContent = (props) => {
  const [courseContent, setCourseContent] = useState({
    title: '',
    description: ''
  });
  const [prospectContent, setProspectContent] = useState({
    icon: '',
    title: '',
    description: ''
  });
  const { courseDetails, setCourseDetails } = props;
  console.log('courseContent', courseContent);
  console.log('prospectContent', prospectContent);

  const addCourseContent = (props) => {
    setCourseDetails((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.courseContent.push(courseContent);
      return copy;
    });

    setCourseContent({ title: '', description: '' });
  };
  const addProspectContent = (props) => {
    setCourseDetails((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.prospectContent.push(prospectContent);
      return copy;
    });

    setProspectContent({
      icon: '',
      title: '',
      description: ''
    });
  };

  const deleteCourseContent = (index) => {
    setCourseDetails((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.courseContent = copy.courseContent.filter((side, ind) => ind !== index);
      return copy;
    });
  };
  const deleteProspectContent = (index) => {
    setCourseDetails((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.prospectContent = copy.prospectContent.filter((side, ind) => ind !== index);
      return copy;
    });
  };

  return (
    <>
      <Container>
        {/* <Card> */}
        {/* <CardHeader>Enter Course Content</CardHeader> */}
        {courseDetails.courseContent.map((value, index) => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '70%'
              }}
              key={index}
            >
              <div>{value.title}</div>
              <div>{value.description}</div>
              <div style={{ cursor: 'pointer' }}>
                <CancelIcon onClick={() => deleteCourseContent(index)} />
              </div>
            </div>
          );
        })}
        <Grid container spacing={3} style={{ textAlign: 'center' }}>
          <Grid item xs={12} sm={6} lg={4}>
            <div className="inputBox" style={{ textAlign: 'left' }}>
              <div className="heading">Title</div>
              <input
                value={courseContent.title}
                onChange={(e) =>
                  setCourseContent((prev) => ({
                    ...prev,
                    title: e.target.value
                  }))
                }
                className="input"
                type={'text'}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="inputBox" style={{ textAlign: 'left', marginRight: '16px' }}>
                <div className="heading">Description</div>
                <input
                  value={courseContent.description}
                  onChange={(e) =>
                    setCourseContent((prev) => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                  className="input"
                  type={'text'}
                />
              </div>
              <div style={{ marginTop: '16px', cursor: 'pointer' }}>
                <AddCircleOutlineOutlinedIcon onClick={() => addCourseContent()} />{' '}
              </div>
            </div>
          </Grid>
        </Grid>
        {/* </Card> */}
      </Container>

      <Container>
        {/* <Card> */}
        {/* <CardHeader>Enter Prospect Content</CardHeader> */}
        <Typography
          variant="subtitle1"
          sx={{ flexShrink: 0, color: 'text.primary', margin: '20px 0 10px 0' }}
        >
          Enter Prospect Content
        </Typography>
        {courseDetails.prospectContent.map((value, index) => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '70%'
              }}
              key={index}
            >
              <div>{value.icon}</div>
              <div>{value.title}</div>
              <div>{value.description}</div>
              <div style={{ cursor: 'pointer' }}>
                <CancelIcon onClick={() => deleteProspectContent(index)} />
              </div>
            </div>
          );
        })}
        <Grid container spacing={3} style={{ textAlign: 'center' }}>
          <Grid item xs={12} sm={6} lg={4}>
            <div className="inputBox" style={{ textAlign: 'left' }}>
              <div className="heading">Icon</div>
              <input
                value={prospectContent.icon}
                onChange={(e) =>
                  setProspectContent((prev) => ({
                    ...prev,
                    icon: e.target.value
                  }))
                }
                className="input"
                type={'text'}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <div className="inputBox" style={{ textAlign: 'left' }}>
              <div className="heading">Title</div>
              <input
                value={prospectContent.title}
                onChange={(e) =>
                  setProspectContent((prev) => ({
                    ...prev,
                    title: e.target.value
                  }))
                }
                className="input"
                type={'text'}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="inputBox" style={{ textAlign: 'left', marginRight: '16px' }}>
                <div className="heading">Description</div>
                <textarea
                  className="multiline"
                  rows="4"
                  cols="35"
                  value={prospectContent.description}
                  onChange={(e) =>
                    setProspectContent((prev) => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                />
              </div>
              <div style={{ marginTop: '16px', cursor: 'pointer' }}>
                <AddCircleOutlineOutlinedIcon onClick={() => addProspectContent()} />{' '}
              </div>
            </div>
          </Grid>
        </Grid>
        {/* </Card> */}
      </Container>
    </>
  );
};

const Faqs = (props) => {
  const [faqData, setFaqData] = useState({ title: '', description: '' });
  const {
    courseDetails,
    setCourseDetails,
    setRefreshValue,
    setRefresh,
    refreshValue,
    editCourseId
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  console.log('faqs', faqData);

  const addFaqData = (props) => {
    setCourseDetails((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.faqs.push(faqData);
      return copy;
    });

    setFaqData({ title: '', description: '' });
  };

  const deleteFaq = (index) => {
    setCourseDetails((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.faqs = copy.faqs.filter((side, ind) => ind !== index);
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      courseDetails.courseId === '' ||
      courseDetails.program === '' ||
      courseDetails.heading === '' ||
      courseDetails.bannerImage === '' ||
      courseDetails.subHeading === '' ||
      courseDetails.syllabusUrl === '' ||
      courseDetails.duration === '' ||
      courseDetails.enrollBy === '' ||
      courseDetails.practiceQuestions === '' ||
      courseDetails.detailedDescription === '' ||
      courseDetails.videoUrl === '' ||
      courseDetails.prerequisite === '' ||
      courseDetails.price === ''
    ) {
      enqueueSnackbar('Some fields are empty', {
        variant: 'error'
      });
    } else {
      if (editCourseId) {
        editAdminCourse(editCourseId, courseDetails)
          .then((response) => {
            setCourseDetails({
              program: '',
              heading: '',
              bannerImage: '',
              subHeading: '',
              syllabusUrl: '',
              duration: '',
              enrollBy: '',
              practiceQuestions: '',
              detailedDescription: '',
              videoUrl: '',
              prerequisite: '',
              courseContent: [],
              prospectTitle: '',
              prospectContent: [],
              instructor: [],
              rating: '',
              reviews: [],
              faqs: [],
              level: 'BEGINNER',
              courseId: '',
              discountPercent: '',
              disable: 'false',
              blacklistedEmails: [],
              bannerImage: '',
              price: ''
            });
            enqueueSnackbar('Course Updated Successfully', {
              variant: 'success'
            });
            setRefreshValue(refreshValue + 1);
            setRefresh(true);
          })

          .catch((err) => {
            console.log(err);
            enqueueSnackbar(err, {
              variant: 'error'
            });
          });
      } else {
        createAdminCourse(courseDetails)
          .then((response) => {
            return setCourseDetails({
              program: '',
              heading: '',
              bannerImage: '',
              subHeading: '',
              syllabusUrl: '',
              duration: '',
              enrollBy: '',
              practiceQuestions: '',
              detailedDescription: '',
              videoUrl: '',
              prerequisite: '',
              courseContent: [],
              prospectTitle: '',
              prospectContent: [],
              instructor: [],
              rating: '',
              reviews: [],
              faqs: [],
              level: 'BEGINNER',
              courseId: '',
              discountPercent: '',
              disable: 'false',
              blacklistedEmails: [],
              bannerImage: '',
              price: ''
            });
          })
          .then((response) => {
            createAdminDashboard({ courseId: courseDetails.courseId }).then((response) => {
              enqueueSnackbar('Course Added Successfully', {
                variant: 'success'
              });
              setRefreshValue(refreshValue + 1);
              setRefresh(true);
            });
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar(err, {
              variant: 'error'
            });
          });
      }
    }
  };

  return (
    <Container>
      {/* <Card>
        <CardHeader>Enter FAQs</CardHeader> */}
      {courseDetails.faqs.map((value, index) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '68%'
            }}
            key={index}
          >
            <div>{value.title}</div>
            <div>{value.description}</div>
            <div style={{ cursor: 'pointer' }}>
              <CancelIcon onClick={() => deleteFaq(index)} />
            </div>
          </div>
        );
      })}
      <Grid container spacing={3} style={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={6} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Title</div>
            <textarea
              value={faqData.title}
              onChange={(e) =>
                setFaqData((prev) => ({
                  ...prev,
                  title: e.target.value
                }))
              }
              className="multiline"
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="inputBox" style={{ textAlign: 'left', marginRight: '16px' }}>
              <div className="heading">Description</div>
              <textarea
                className="multiline"
                rows="4"
                cols="35"
                value={faqData.description}
                onChange={(e) =>
                  setFaqData((prev) => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
              />
            </div>
            <div style={{ marginTop: '16px', cursor: 'pointer' }}>
              <AddCircleOutlineOutlinedIcon onClick={() => addFaqData()} />{' '}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button
            variant="outlined"
            style={{
              textTransform: 'none',
              borderColor: '#1c748d'
            }}
            startIcon={<CheckCircleRoundedIcon />}
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            {editCourseId ? 'Update' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
      {/* </Card> */}
    </Container>
  );
};

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.darker,
  position: 'absolute',
  right: '42%',
  top: '50%'
}));

export default function AddCourses() {
  const [courseDetails, setCourseDetails] = useState({
    program: '',
    heading: '',
    bannerImage: '',
    subHeading: '',
    syllabusUrl: '',
    duration: '',
    enrollBy: '',
    practiceQuestions: '',
    detailedDescription: '',
    videoUrl: '',
    prerequisite: '',
    courseContent: [],
    prospectTitle: '',
    prospectContent: [],
    instructor: [],
    rating: '',
    reviews: [],
    faqs: [],
    level: 'BEGINNER',
    courseId: '',
    discountPercent: '',
    disable: 'false',
    blacklistedEmails: [],
    price: ''
  });

  const [refresh, setRefresh] = useState(false);
  const [refreshValue, setRefreshValue] = useState(0);
  const [coursesTableData, setCoursesTableData] = useState();
  const [allCourses, setAllCourses] = useState();
  const [allInstructors, setAllInstructors] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const [editCourseId, setEditCourseId] = useState();

  const editCourse = (data) => {
    const edit = allCourses.filter((course) => course._id === data.id);

    if (edit[0]) {
      setEditCourseId(edit[0]._id);
      setCourseDetails({
        ...courseDetails,
        program: edit[0].program,
        heading: edit[0].heading,
        bannerImage: edit[0].bannerImage,
        subHeading: edit[0].subHeading,
        syllabusUrl: edit[0].syllabusUrl,
        duration: edit[0].duration,
        enrollBy: edit[0].enrollBy,
        practiceQuestions: edit[0].practiceQuestions,
        detailedDescription: edit[0].detailedDescription,
        videoUrl: edit[0].videoUrl,
        prerequisite: edit[0].prerequisite,
        courseContent: edit[0].courseContent,
        prospectTitle: edit[0].prospectTitle,
        prospectContent: edit[0].prospectContent,
        instructor: edit[0].instructor,
        rating: edit[0].rating,
        reviews: edit[0].reviews,
        faqs: edit[0].faqs,
        level: edit[0].level,
        courseId: edit[0].courseId,
        discountPercent: edit[0].discountPercent,
        disable: edit[0].disable,
        blacklistedEmails: edit[0].blacklistedEmails,
        price: edit[0].price
      });
    }
  };

  const deleteCourse = (data) => {
    deleteAdminCourse(data.id)
      .then((resp) => {
        enqueueSnackbar('Course deleted Successfully', {
          variant: 'success'
        });
        setRefreshValue(refreshValue + 1);
        setRefresh(true);
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    setRefresh(true);
    setEditCourseId();
    getAllInstructors().then((resp) => {
      setAllInstructors(resp);
      return getAdminCourses().then((resp) => {
        const courses = resp.map((res) => {
          setAllCourses(resp);
          const courseData = {
            id: res._id,
            moreButton: true,
            courseName: { value: res.heading, image: res.bannerImage },
            price: { value: res.price },
            duration: { value: res.duration },
            courseId: { value: res.courseId },
            level: { value: res.level },
            disable: {
              value: res.disable ? 'Disabled' : 'Active',
              label: true,
              successLabel: ['Active']
            }
          };

          return courseData;
        });
        setCoursesTableData(courses);
        setTimeout(() => setRefresh(false), 1000);
        console.log(resp);
      });
    });
  }, [setRefresh, refreshValue]);

  // console.log('all courses', allCourses);
  // console.log('courses table body - ', coursesTableData);
  console.log('All instructors data - ', allInstructors);

  return (
    <Page title="Admin | Courses">
      {refresh ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              All Courses
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <CustomTable
              rowsPerPageOptions={[7, 14, 21]}
              tableHead={COURSES_TABLE_HEAD}
              tableBody={coursesTableData}
              searchRow={COURSES_TABLE_HEAD[0].id}
              setEditRowId={editCourse}
              setDeleteRowId={deleteCourse}
              selection={false}
            />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              Create Courses
            </Typography>
          </Stack>

          {/* <ModulePanel /> */}
          <Grid item xs={12} md={6} lg={12}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Enter Details" />
              <CardContent>
                <Course
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                  allInstructors={allInstructors}
                />
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardHeader title="Enter Prospect Details" />
              <CardContent>
                <CourseProspectContent
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                />
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Enter FAQs Details" />
              <CardContent>
                <Faqs
                  setRefreshValue={setRefreshValue}
                  setRefresh={setRefresh}
                  editCourseId={editCourseId}
                  refreshValue={refreshValue}
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                />
              </CardContent>
            </Card>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
