import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LanguagePopover from '../../layouts/admin/LanguagePopover';
import { BlogPostsSort } from '../../components/_dashboard/blog';
import CustomTable from '../table';
import FileBase from 'react-file-base64';

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
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { styled } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import Page from '../../components/Page';
import { AppTrafficBySite } from '../../components/_dashboard/app';

// Services
import {
  createInstructor,
  getAllInstructors,
  editAdminInstructor
} from '../../services/admin/instructor';

//constants
import { GENDER, INSTRUCTOR_TABLE_HEAD } from '../../constants/admin';

// ----------------------------------------------------------------------

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.darker,
  position: 'absolute',
  right: '42%',
  top: '50%'
}));

export default function AddInstructor(props) {
  const [instructorData, setInstructorData] = useState({
    profileImage: '',
    name: '',
    email: '',
    dateOfBirth: '',
    gender: 'Male',
    designation: '',
    description: '',
    disable: 'false'
  });

  const [refresh, setRefresh] = useState(false);
  const [refreshValue, setRefreshValue] = useState(0);
  const [allInstructors, setAllInstructors] = useState(0);
  const [instructorsTableData, setInstructorsTableData] = useState(0);
  const [editInstructorId, setEditInstructorId] = useState();

  console.log('All instru', allInstructors);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setRefresh(true);
    getAllInstructors().then((res) => {
      const instructors = res.map((resp) => {
        const instructor = {
          id: resp._id,
          moreButton: true,
          instructorName: { value: resp.name, image: resp.profileImage },
          email: { value: resp.email },
          ratings: { value: resp.ratings },
          gender: { value: resp.gender },
          disable: {
            value: resp.disable ? 'Disabled' : 'Active',
            label: true,
            successLabel: ['Active']
          }
        };
        return instructor;
      });

      setAllInstructors(res);
      setInstructorsTableData(instructors);
      setRefresh(false);
    });
  }, [refreshValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      instructorData.profileImage === '' ||
      instructorData.name === '' ||
      instructorData.email === '' ||
      instructorData.dateOfBirth === '' ||
      instructorData.designation === '' ||
      instructorData.description === ''
    ) {
      enqueueSnackbar('Some fields are empty', {
        variant: 'error'
      });
    } else {
      if (editInstructorId) {
        editAdminInstructor(editInstructorId, instructorData)
          .then((resp) => {
            enqueueSnackbar('Instructor Updated Successfully', {
              variant: 'success'
            });
            setRefreshValue(refreshValue + 1);

            setEditInstructorId();
            setInstructorData({
              profileImage: '',
              name: '',
              email: '',
              dateOfBirth: '',
              gender: 'Male',
              designation: '',
              description: '',
              disable: 'false'
            });
          })
          .catch((err) => {
            enqueueSnackbar(err, {
              variant: 'error'
            });
          });
      } else {
        createInstructor(instructorData).then((res) => {
          setRefreshValue(refreshValue + 1);
          setInstructorData({
            profileImage: '',
            name: '',
            email: '',
            dateOfBirth: '',
            gender: 'Male',
            designation: '',
            description: '',
            disable: 'false'
          });
          enqueueSnackbar('Instructor added successfully!', {
            variant: 'success'
          });
        });
      }
    }
  };

  const editInstructor = (data) => {
    const edit = allInstructors.filter((instructor) => instructor._id === data.id);

    if (edit[0]) {
      setEditInstructorId(edit[0]._id);
      setInstructorData({
        profileImage: edit[0].profileImage,
        name: edit[0].name,
        email: edit[0].email,
        dateOfBirth: edit[0].dateOfBirth,
        gender: edit[0].gender,
        designation: edit[0].designation,
        description: edit[0].description,
        disable: edit[0].disable
      });
    }
  };

  //   useEffect(() => {
  //     setRefresh(true);
  //     setEditInstructorId();
  //     getAllInstructors().then((resp) => {
  //       const instructors = resp.map((res) => {
  //         setAllInstructors(resp);
  //         const instructorsData = {
  //           id: resp._id,
  //           moreButton: false,
  //           instructorName: { value: resp.name, image: resp.profileImage },
  //           email: { value: resp.email },
  //           ratings: { value: resp.ratings },
  //           gender: { value: resp.gender },
  //           disable: {
  //             value: resp.disable ? 'Disabled' : 'Active',
  //             label: true,
  //             successLabel: ['Active']
  //           }
  //         };

  //         setTimeout(() => setRefresh(false), 1000);
  //         return instructorsData;
  //       });
  //       setInstructorsTableData(instructors);
  //       console.log(resp);
  //     });
  //   }, [setRefresh, refreshValue]);

  //   console.log('All instructors', allInstructors);
  //   console.log('inst table body - ', instructorsTableData);

  return (
    <Page title="Shoshin | Instructor">
      {refresh ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              All Instructors
            </Typography>
            {/* <BlogPostsSort options={coursesDropdown} setSelected={setSelectedCourseId} /> */}
          </Stack>
          {instructorsTableData && (
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <CustomTable
                rowsPerPageOptions={[3, 10, 15, 30, 60, 100]}
                tableHead={INSTRUCTOR_TABLE_HEAD}
                tableBody={instructorsTableData}
                searchRow={INSTRUCTOR_TABLE_HEAD[0].id}
                setEditRowId={editInstructor}
                //   setDeleteRowId={disableModule}
                selection={false}
              />
            </Stack>
          )}

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              Add Instructor
            </Typography>
          </Stack>
          {/* <ModulePanel /> */}
          <Grid item xs={12} md={6} lg={12}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Enter Details" />
              <CardContent>
                {/* <Grid container spacing={5}>
                {SOCIALS.map((site) => (
                  <SiteItem key={site.name} site={site} />
                ))}
              </Grid> */}

                <Grid container spacing={3} style={{ textAlign: 'center' }}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Profile Image</div>
                      {/* <input
                        className="input"
                        type="file"
                        value={instructorData.profileImage}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, profileImage: e.target.value })
                        }
                      /> */}
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          setInstructorData({ ...instructorData, profileImage: base64 })
                        }
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Name</div>
                      <input
                        className="input"
                        type="text"
                        value={instructorData.name}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, name: e.target.value })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Email</div>
                      <input
                        className="input"
                        type="email"
                        value={instructorData.email}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, email: e.target.value })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">DateOfBirth</div>
                      <input
                        className="input"
                        type="date"
                        value={instructorData.dateOfBirth}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, dateOfBirth: e.target.value })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Gender</div>
                      <select
                        className="input"
                        name="gender"
                        value={instructorData.gender}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, gender: e.target.value })
                        }
                      >
                        {GENDER.map((opt, index) => (
                          <option key={index} value={opt}>
                            {''}
                            {opt} {''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Designation</div>
                      <input
                        className="input"
                        type="text"
                        value={instructorData.designation}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, designation: e.target.value })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Description</div>
                      <textarea
                        rows="6"
                        cols="40"
                        className="input"
                        type="text"
                        value={instructorData.description}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, description: e.target.value })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Disable</div>
                      <select
                        className="input"
                        name="disable"
                        value={instructorData.disable}
                        onChange={(e) =>
                          setInstructorData({ ...instructorData, disable: e.target.value })
                        }
                      >
                        {['false', 'true'].map((opt, index) => (
                          <option key={index} value={opt}>
                            {''}
                            {opt} {''}
                          </option>
                        ))}
                      </select>
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
                      {editInstructorId ? 'Update' : 'Submit'}

                      {/* {editModuleId ? 'Update' : 'Submit'} */}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
