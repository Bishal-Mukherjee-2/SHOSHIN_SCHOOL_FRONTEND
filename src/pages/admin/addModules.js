import React, { useState, useEffect } from 'react';

// Components imports
import Page from '../../components/Page';
import CustomTable from '../table';
import { SECTION_TABLE_HEAD, MODULES_TABLE_HEAD } from 'src/constants/admin';
import { BlogPostsSort } from '../../components/_dashboard/blog';
import { useSnackbar } from 'notistack';

// Services Imports
import {
  createSection,
  getSectionByCourseId,
  createModule,
  getAllModuleByCourseId,
  getAllModules,
  editModule
} from '../../services/admin/modules';

// material ui imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';
import { getAdminCourses } from 'src/services/admin/courses';
import { number } from 'prop-types';

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.darker,
  position: 'absolute',
  right: '42%',
  top: '50%'
}));

export default function AddModules(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [sectionData, setSectionData] = useState({
    courseId: '',
    sectionId: '',
    sectionName: ''
  });
  const [sectionTableData, setsectionTableData] = useState();
  const [coursesDropdown, setCoursesDropDown] = useState();
  const [selectedCourseId, setselectedCourseId] = useState();
  const [refresh, setrefresh] = useState(false);
  const [refreshValue, setrefreshValue] = useState(0);

  const [sectionByCourseData, setSectionByCourseData] = useState();

  const [selectedCourseIdModule, setSelectedCourseIdModule] = useState();
  const [modulesTableData, setModulesTableData] = useState();
  const [editModuleId, setEditModuleId] = useState();
  const [allModules, setAllModules] = useState();
  const [moduleData, setModuleData] = useState({
    sectionId: '',
    sectionName: '',
    name: '',
    iconImageUrl: '',
    courseId: '',
    disable: 'false',
    sequenceId: number,
    lesson: [],
    weightage: number,
    maxScore: number
  });

  /*
  		for setting the dropdown data in section table
  */
  useEffect(() => {
    setrefresh(true);
    setEditModuleId('');
    getAdminCourses().then((courses) => {
      const dropdown = courses.map((course) => {
        const option = {
          id: course._id,
          value: course.heading.toLowerCase(),
          label: course.heading.toLowerCase(),
          optionId: course.courseId
        };
        return option;
      });
      if (coursesDropdown !== dropdown) setCoursesDropDown(dropdown);

      if (!selectedCourseId) {
        setselectedCourseId(dropdown && dropdown[0].optionId);
      }

      if (!selectedCourseIdModule) {
        setSelectedCourseIdModule(dropdown && dropdown[0].optionId);
      }

      setModuleData({
        ...moduleData,
        courseId: dropdown && dropdown[0].optionId
      });

      getAllModules().then((modules) => {
        const modulesArray = modules.modules.map((data) => data);
        setAllModules(modulesArray);
        setrefresh(false);
      });
    });
  }, [refreshValue]);

  /*
  		for setting the table data in section
  */
  useEffect(() => {
    if (selectedCourseId)
      getSectionByCourseId({ courseId: selectedCourseId }).then((data) => {
        const tableData = data.sections.map((section) => {
          const sectionObject = {
            id: section.sectionId,
            courseId: { value: data.courseId },
            moreButton: false,
            sectionId: { value: section.sectionId },
            sectionName: { value: section.name }
          };

          return sectionObject;
        });

        setsectionTableData(tableData);
      });
  }, [selectedCourseId, setselectedCourseId]);

  /*
  		For setting Table data for modules
  */

  useEffect(() => {
    if (selectedCourseIdModule)
      getAllModuleByCourseId({ courseId: selectedCourseIdModule }).then((data) => {
        const tableData =
          data &&
          data.map((module) => {
            const moduleObject = {
              id: module._id,
              moreButton: true,
              courseId: { value: module.courseId },
              sectionName: { value: module.sectionName },
              name: { value: module.name },
              sequenceId: { value: module.sequenceId },
              weightage: { value: module.weightage },
              maxScore: { value: module.maxScore },
              disable: {
                value: module.disable ? 'Disabled' : 'Active',
                label: true,
                successLabel: ['Active']
              }
            };
            return moduleObject;
          });

        setModulesTableData(tableData);
      });
  }, [selectedCourseIdModule]);

  /*
  		For setting section data in dropdown of module form
  */
  useEffect(() => {
    if (moduleData.courseId) {
      getSectionByCourseId({ courseId: moduleData.courseId }).then((data) => {
        const section =
          data &&
          data.sections &&
          data.sections.map((section) => {
            return {
              sectionId: section.sectionId,
              sectionName: section.name,
              courseId: data.courseId
            };
          });
        setSectionByCourseData(section);
        setModuleData({
          ...moduleData,
          sectionId: section && section[0].sectionId,
          sectionName: section && section[0].sectionName
        });
      });
    }
  }, [moduleData.courseId]);

  /* 
  		Creating Section
  */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      sectionData.courseId === '' ||
      sectionData.sectionId === '' ||
      sectionData.sectionName === ''
    ) {
      enqueueSnackbar('Some Fields are empty', {
        variant: 'error'
      });
    } else {
      createSection(sectionData)
        .then((response) => {
          setSectionData({
            courseId: '',
            sectionId: '',
            sectionName: ''
          });
          enqueueSnackbar('Section Created Successfully', {
            variant: 'success'
          });
          setrefreshValue(refreshValue + 1);
        })
        .catch((error) => {
          enqueueSnackbar(error, {
            variant: 'error'
          });
        });
    }
  };

  /* 
  		Creating Module
  */
  const handleModuleSubmit = (event) => {
    event.preventDefault();
    if (
      moduleData.name === '' ||
      moduleData.iconImageUrl === '' ||
      moduleData.sequenceId === '' ||
      moduleData.weightage === '' ||
      moduleData.maxScore === ''
    ) {
      enqueueSnackbar('Some Fields are empty', {
        variant: 'error'
      });
    } else if (editModuleId) {
      editModule(moduleData)
        .then((response) => {
          setModuleData({
            name: '',
            sequenceId: '',
            weightage: '',
            maxScore: ''
          });
          enqueueSnackbar('Module created Successfully', {
            variant: 'success'
          });
          setrefreshValue(refreshValue + 1);
        })
        .catch((error) => {
          enqueueSnackbar(error, {
            variant: 'error'
          });
        });
    } else {
      createModule(moduleData)
        .then((response) => {
          setModuleData({
            name: '',
            sequenceId: '',
            weightage: '',
            maxScore: ''
          });
          enqueueSnackbar('Module created Successfully', {
            variant: 'success'
          });
          setrefreshValue(refreshValue + 1);
        })
        .catch((error) => {
          enqueueSnackbar(error, {
            variant: 'error'
          });
        });
    }
  };

  /* 
  		Setting courses for section/module dropdown
  */

  const setSectionDropdown = (id) => {
    setselectedCourseId(id);
  };

  const setModuleDropdown = (id) => {
    setSelectedCourseIdModule(id);
  };

  /* 
  		Edit Module Function
  */

  const editModuleTable = (data) => {
    const editData = allModules.filter((module) => module._id === data.id);
    if (editData[0]) {
      setEditModuleId(editData[0]._id);
      setModuleData({
        ...moduleData,
        courseId: editData[0].courseId,
        sectionId: editData[0].sectionId,
        sectionName: editData[0].sectionName,
        name: editData[0].name,
        iconImageUrl: editData[0].iconImageUrl,
        sequenceId: editData[0].sequenceId,
        disable: editData[0].disable,
        weightage: editData[0].weightage,
        maxScore: editData[0].maxScore
      });
    }
  };

  return (
    <Page title="Shoshin | Module">
      {refresh ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'GrayText.secondary' }}>
              All Sections
            </Typography>
            {/* Drop Down component */}
            <BlogPostsSort
              options={coursesDropdown && coursesDropdown}
              setSelected={setSectionDropdown}
            />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            {/* Table Component */}
            <CustomTable
              rowsPerPageOptions={[3, 10, 15]}
              tableHead={SECTION_TABLE_HEAD}
              tableBody={sectionTableData}
              searchRow={SECTION_TABLE_HEAD[2].id}
              // setEditRowId={}
              // setDeleteRowId={}
              selection={false}
            />
          </Stack>
          {/* Section creation */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              Create Sections
            </Typography>
          </Stack>
          <Card>
            <CardHeader title="Enter Details" />
            <CardContent>
              <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item>
                  <div>
                    <div>Course</div>
                    <select
                      type="text"
                      value={sectionData.courseId}
                      onChange={(event) => {
                        setSectionData({
                          ...sectionData,
                          courseId: event.target.value
                        });
                      }}
                    >
                      {coursesDropdown &&
                        coursesDropdown.map((course) => (
                          <option key={course.id} value={course.optionId}>
                            {course.value}
                          </option>
                        ))}
                    </select>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Section ID</div>
                    <input
                      type="text"
                      value={sectionData.sectionId}
                      onChange={(event) => {
                        setSectionData({
                          ...sectionData,
                          sectionId: event.target.value
                        });
                      }}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Section Name</div>
                    <input
                      type="text"
                      value={sectionData.sectionName}
                      onChange={(event) => {
                        setSectionData({
                          ...sectionData,
                          sectionName: event.target.value
                        });
                      }}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <Button variant="outlined" type="submit" onClick={(event) => handleSubmit(event)}>
                    Create Section
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Module Table */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={10}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'GrayText.secondary' }}>
              All Modules
            </Typography>
            <BlogPostsSort
              options={coursesDropdown && coursesDropdown}
              setSelected={setModuleDropdown}
            />
          </Stack>
          {/* Module Form */}

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            {/* Table Component */}
            <CustomTable
              rowsPerPageOptions={[3, 10, 15]}
              tableHead={MODULES_TABLE_HEAD}
              tableBody={modulesTableData}
              searchRow={MODULES_TABLE_HEAD[2].id}
              setEditRowId={editModuleTable}
              // setDeleteRowId={}
              selection={false}
            />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              Create Modules
            </Typography>
          </Stack>
          <Card>
            <CardHeader title="Enter Module Details" />
            <CardContent>
              <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item>
                  <div>
                    <div>Course</div>
                    <select
                      type="text"
                      value={moduleData.courseId}
                      onChange={(event) => {
                        setModuleData({
                          ...moduleData,
                          courseId: event.target.value
                        });
                      }}
                    >
                      {coursesDropdown &&
                        coursesDropdown.map((course) => (
                          <option key={course.id} value={course.optionId}>
                            {course.value}
                          </option>
                        ))}
                    </select>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Section</div>
                    <select
                      type="text"
                      value={moduleData.sectionId}
                      onChange={(event) =>
                        setModuleData({
                          ...moduleData,
                          sectionId: event.target.value,
                          sectionName:
                            event.target.options[event.target.options.selectedIndex].getAttribute(
                              'key2'
                            )
                        })
                      }
                    >
                      {sectionByCourseData &&
                        sectionByCourseData.map((section) => (
                          <option
                            key={section.sectionId}
                            key2={section.sectionName}
                            value={section.sectionId}
                          >
                            {section.sectionName}
                          </option>
                        ))}
                    </select>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Module Name</div>
                    <input
                      type="text"
                      value={moduleData.name}
                      onChange={(event) =>
                        setModuleData({
                          ...moduleData,
                          name: event.target.value
                        })
                      }
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Image Icon URL</div>
                    <input
                      type="text"
                      value={moduleData.iconImageUrl}
                      onChange={(event) =>
                        setModuleData({
                          ...moduleData,
                          iconImageUrl: event.target.value
                        })
                      }
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Sequence number</div>
                    <input
                      type="number"
                      value={moduleData.sequenceId}
                      onChange={(event) =>
                        setModuleData({
                          ...moduleData,
                          sequenceId: event.target.value
                        })
                      }
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Disable</div>
                    <select
                      type="input"
                      value={moduleData.disable}
                      onChange={(event) =>
                        setModuleData({
                          ...moduleData,
                          disable: event.target.value
                        })
                      }
                    >
                      {['true', 'false'].map((value, index) => (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>weightage</div>
                    <input
                      type="number"
                      value={moduleData.weightage}
                      onChange={(event) =>
                        setModuleData({
                          ...moduleData,
                          weightage: event.target.value
                        })
                      }
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <div>Max Score</div>
                    <input
                      type="number"
                      value={moduleData.maxScore}
                      onChange={(event) =>
                        setModuleData({
                          ...moduleData,
                          maxScore: event.target.value
                        })
                      }
                    />
                  </div>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={(event) => handleModuleSubmit(event)}
                  >
                    {editModuleId ? 'Update Module' : 'Create Module'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      )}
    </Page>
  );
}
