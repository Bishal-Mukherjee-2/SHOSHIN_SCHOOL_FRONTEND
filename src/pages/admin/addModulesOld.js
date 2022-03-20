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
import { getAdminCourses } from '../../services/admin/courses';
import {
  pushDashboardModule,
  getAdminModuleById,
  editAdminModule,
  disableAdminModule
} from '../../services/admin/modules';

//constants
import { MODULES_TABLE_HEAD } from '../../constants/admin';

// ----------------------------------------------------------------------

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.darker,
  position: 'absolute',
  right: '42%',
  top: '50%'
}));

export default function AddModules(props) {
  const [moduleData, setModuleData] = useState({
    courseId: '',
    level: '',
    name: '',
    icon: '',
    disable: 'false'
  });

  const [coursesDropdown, setCoursesDropDown] = useState();
  const [refresh, setRefresh] = useState(false);
  const [refreshValue, setRefreshValue] = useState(0);
  const [courseId, setCourseId] = useState();
  const [modulesData, setModulesData] = useState();
  const [modulesTableData, setModulesTableData] = useState();
  const [editModuleId, setEditModuleId] = useState();

  console.log('modules and tableData', modulesData, modulesTableData);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      moduleData.courseId === '' ||
      moduleData.level === '' ||
      moduleData.name === '' ||
      moduleData.icon === ''
    ) {
      enqueueSnackbar('Some fields are empty', {
        variant: 'error'
      });
    } else {
      if (editModuleId) {
        setRefreshValue(refreshValue + 1);
        editAdminModule(courseId, moduleData.level, editModuleId, moduleData)
          .then((resp) => {
            enqueueSnackbar('Module Updated Successfully', {
              variant: 'success'
            });
            setEditModuleId();
            setModuleData({
              courseId: '',
              level: '',
              name: '',
              icon: '',
              disable: 'false'
            });
          })
          .catch((err) => {
            enqueueSnackbar(err, {
              variant: 'error'
            });
          });
      } else {
        setRefreshValue(refreshValue + 1);
        pushDashboardModule(moduleData.courseId, moduleData, moduleData.level)
          .then((response) => {
            enqueueSnackbar('Module Added Successfully', {
              variant: 'success'
            });
            setModuleData({
              courseId: '',
              level: '',
              name: '',
              icon: '',
              disable: 'false'
            });
          })
          .catch((err) => {
            enqueueSnackbar(err, {
              variant: 'error'
            });
          });
      }
    }
  };

  useEffect(() => {
    if (courseId) {
      console.log('useEffect courseid', courseId);
      getAdminModuleById({ courseId: courseId }).then((resp) => {
        const level1 = resp.level1Modules.map((mod) => {
          const module = {
            id: mod._id,
            moreButton: true,
            moduleName: { value: mod.name },
            lessions: { value: mod.lessions.length },
            level: { value: 1 },
            icon: { value: mod.icon },
            disable: {
              value: mod.disable ? 'Disabled' : 'Active',
              label: true,
              successLabel: ['Active']
            }
          };
          return module;
        });

        const level2 = resp.level2Modules.map((mod) => {
          const module = {
            id: mod._id,
            moreButton: true,
            moduleName: { value: mod.name },
            lessions: { value: mod.lessions.length },
            level: { value: 2 },
            icon: { value: mod.icon },
            disable: {
              value: mod.disable ? 'Disabled' : 'Active',
              label: true,
              successLabel: ['Active']
            }
          };
          return module;
        });

        const level3 = resp.level3Modules.map((mod) => {
          const module = {
            id: mod._id,
            moreButton: true,
            moduleName: { value: mod.name },
            lessions: { value: mod.lessions.length },
            level: { value: 3 },
            icon: { value: mod.icon },
            disable: {
              value: mod.disable ? 'Disabled' : 'Active',
              label: true,
              successLabel: ['Active']
            }
          };
          return module;
        });

        const allModules = level1.concat(level2.concat(level3));

        setModulesTableData(allModules);

        setModulesData(resp);
        setRefresh(false);
      });
    }
  }, [courseId, setCourseId, refreshValue]);

  useEffect(() => {
    setRefresh(true);
    getAdminCourses().then((resp) => {
      const dropdown = resp.map((res) => {
        const option = {
          id: res._id,
          value: res.heading.toLowerCase(),
          label: res.heading.toLowerCase(),
          optionId: res.courseId
        };
        console.log(option);
        return option;
      });

      dropdown && dropdown[0] && setCourseId(dropdown[0].optionId);
      setCoursesDropDown(dropdown);

      console.log(resp);
    });
  }, [refreshValue]);
  console.log('yashc', coursesDropdown);

  const setSelectedCourseId = (id) => {
    console.log('id of course is ' + id);
    setCourseId(id);
  };

  const editModule = (data) => {
    const edit = modulesTableData.filter((mod) => mod.id === data.id);
    if (edit[0]) {
      setEditModuleId(edit[0].id);
      setModuleData({
        courseId: courseId,
        level: edit[0].level.value,
        name: edit[0].moduleName.value,
        icon: edit[0].icon.value,
        disable: edit[0].disable.value === 'Active' ? false : true
      });
      console.log('edit this', edit[0]);
    }
  };

  const disableModule = (data) => {
    const disable = modulesTableData.filter((mod) => mod.id === data.id);
    if (disable[0]) {
      setRefreshValue(refreshValue + 1);
      disableAdminModule(courseId, disable[0].level.value, disable[0].id)
        .then((resp) => {
          enqueueSnackbar('Module Disabled Successfully', {
            variant: 'success'
          });
        })
        .catch((err) => {
          enqueueSnackbar(err, {
            variant: 'error'
          });
        });
    }
  };

  return (
    <Page title="Shoshin | Modules">
      {refresh ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              All Modules
            </Typography>
            <BlogPostsSort options={coursesDropdown} setSelected={setSelectedCourseId} />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <CustomTable
              rowsPerPageOptions={[3, 10, 15, 30, 60, 100]}
              tableHead={MODULES_TABLE_HEAD}
              tableBody={modulesTableData}
              searchRow={MODULES_TABLE_HEAD[0].id}
              setEditRowId={editModule}
              setDeleteRowId={disableModule}
              selection={false}
            />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              Create Modules
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
                      <div className="heading">Course Id</div>
                      <input
                        className="input"
                        type="text"
                        value={moduleData.courseId}
                        onChange={(e) =>
                          setModuleData({
                            ...moduleData,
                            courseId: e.target.value
                          })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Level</div>
                      <input
                        className="input"
                        type="text"
                        value={moduleData.level}
                        onChange={(e) =>
                          setModuleData({
                            ...moduleData,
                            level: e.target.value
                          })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Icon</div>
                      <input
                        className="input"
                        type="text"
                        value={moduleData.icon}
                        onChange={(e) =>
                          setModuleData({
                            ...moduleData,
                            icon: e.target.value
                          })
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
                        value={moduleData.name}
                        onChange={(e) =>
                          setModuleData({
                            ...moduleData,
                            name: e.target.value
                          })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
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
                      {editModuleId ? 'Update' : 'Submit'}
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
