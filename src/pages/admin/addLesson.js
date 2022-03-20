import React, { useState, useEffect, useCallback } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LanguagePopover from '../../layouts/admin/LanguagePopover';
import { BlogPostsSort } from '../../components/_dashboard/blog';
import CustomTable from '../table';
import ContentEditor from './ContentEditor';
import S3 from './s3Upload';
import iconv from 'iconv-lite';

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
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

// components
import Page from '../../components/Page';
import { AppTrafficBySite } from '../../components/_dashboard/app';

// Services
import { getAdminCourses } from '../../services/admin/courses';
import { getAdminModuleById } from '../../services/admin/modules';

import {
  getAdminLessions,
  getLessionByCourseByModule,
  createAdminLession,
  uploadContentDataToS3,
  getContentDataFromS3
} from '../../services/admin/lessions';

//constants
import { LESSION_TABLE_HEAD } from '../../constants/admin';
import { LESSION_TYPE } from '../../constants/admin';
import { EDITOR_TYPE } from '../../constants/admin';

// ----------------------------------------------------------------------

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.darker,
  position: 'absolute',
  right: '42%',
  top: '50%'
}));

const MCQCard = (props) => {
  const { MCQData, setMCQData } = props;

  const [singleOption, setSingleOption] = useState('');
  const [singleAnswer, setSingleAnswer] = useState('');

  const addOptions = (props) => {
    setMCQData((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.options.push(singleOption);
      return copy;
    });
    setSingleOption('');
  };

  const deleteMCQOption = (index, value) => {
    setMCQData((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      const value = copy.options[index];
      copy.options = copy.options.filter((opt) => opt !== value);
      return copy;
    });
  };

  const addAnswers = (props) => {
    setMCQData((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.answers.push(singleAnswer);
      return copy;
    });
    setSingleAnswer('');
  };

  const deleteAnswers = (index, value) => {
    console.log('in delete answer index is --> ', index);
    setMCQData((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.answers = copy.answers.filter((ans) => ans !== value);
      return copy;
    });
  };

  console.log('MCQ data --> ', MCQData);

  return (
    <Container>
      <Grid container spacing={3} style={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={12} lg={12}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Question</div>
            <textarea
              value={MCQData.question}
              onChange={(e) =>
                setMCQData((prev) => ({
                  ...prev,
                  question: e.target.value
                }))
              }
              className="input"
              type={'text'}
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          {MCQData.options.map((value, index) => {
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
                <div>{value}</div>
                <div style={{ cursor: 'pointer' }}>
                  <CancelIcon onClick={() => deleteMCQOption(index, value)} />
                </div>
              </div>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="inputBox" style={{ textAlign: 'left', marginRight: '16px' }}>
              <div className="heading">Options</div>
              <input
                value={singleOption}
                onChange={(e) => setSingleOption(e.target.value)}
                className="input"
                type={'text'}
              />
            </div>
            <div style={{ marginTop: '16px', cursor: 'pointer' }}>
              <AddCircleOutlineOutlinedIcon onClick={() => addOptions()} />{' '}
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          {MCQData.answers.map((value, index) => {
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
                <div>{value}</div>
                <div style={{ cursor: 'pointer' }}>
                  <CancelIcon onClick={() => deleteAnswers(index, value)} />
                </div>
              </div>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="inputBox" style={{ textAlign: 'left', marginRight: '16px' }}>
              <div className="heading">answers</div>
              <input
                value={singleAnswer}
                onChange={(e) => setSingleAnswer(e.target.value)}
                className="input"
                type={'text'}
              />
            </div>
            <div style={{ marginTop: '16px', cursor: 'pointer' }}>
              <AddCircleOutlineOutlinedIcon onClick={() => addAnswers()} />{' '}
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const EditorPreferencesDesc = (props) => {
  const [descData, setDescData] = useState({ text: '', glowText: 1 });
  const { editorData, setEditorData } = props;
  console.log('description data', descData);

  const addEditorPreferencesDesc = (props) => {
    setEditorData((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.description.push(descData);
      return copy;
    });

    setDescData({ text: '', glowText: '' });
  };

  const deleteEditorPreferenceDesc = (index) => {
    setEditorData((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      copy.description = copy.description.filter((desc, ind) => ind !== index);
      return copy;
    });
  };

  return (
    <Container>
      <Grid container spacing={3} style={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={12} lg={12}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Title</div>
            <textarea
              value={editorData.title}
              onChange={(e) =>
                setEditorData((prev) => ({
                  ...prev,
                  title: e.target.value
                }))
              }
              className="input"
              type={'text'}
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          {editorData.description.map((value, index) => {
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
                <div>{value.text}</div>
                <div>{value.glowText}</div>
                <div style={{ cursor: 'pointer' }}>
                  <CancelIcon onClick={() => deleteEditorPreferenceDesc(index)} />
                </div>
              </div>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>
          <div className="inputBox" style={{ textAlign: 'left' }}>
            <div className="heading">Text</div>
            <textarea
              value={descData.text}
              onChange={(e) =>
                setDescData((prev) => ({
                  ...prev,
                  text: e.target.value
                }))
              }
              className="input"
              type={'text'}
              rows="4"
              cols="35"
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          lg={4}
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <div className="inputBox" style={{ textAlign: 'left', display: 'grid' }}>
            <div className="heading">Glow Text</div>
            <select
              className="input"
              name="disable"
              value={descData.glowText}
              onChange={(e) =>
                setDescData((prev) => ({
                  ...prev,
                  glowText: e.target.value
                }))
              }
            >
              {[1, 2, 3, 4].map((opt, index) => (
                <option key={index} value={opt}>
                  {' '}
                  {opt}{' '}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
            <div style={{ marginTop: '16px', cursor: 'pointer' }}>
              <AddCircleOutlineOutlinedIcon onClick={() => addEditorPreferencesDesc()} />{' '}
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default function AddLession(props) {
  const { enqueueSnackbar } = useSnackbar();

  // states

  const [lessionData, setLessionData] = useState({
    courseId: '',
    moduleId: '',
    moduleLevel: 'level1Modules',
    lessionName: '',
    lessionType: 'MCQ',
    editorPreferences: {},
    mcqPreferences: {},
    videoClassPreferences: {},
    disable: 'false',
    doubts: []
  });

  const editorDataObj = {
    title: '',
    description: [],
    codeSolutionS3Url: '',
    starterCodeS3Url: '',
    hintVideoUrlS3Url: '',
    testCaseFolderS3Url: ''
  };

  const [MCQData, setMCQData] = useState({
    question: '',
    answers: [],
    options: []
  });
  const [editorData, setEditorData] = useState(editorDataObj);
  const [coursesDropdown, setCoursesDropDown] = useState();
  const [modulesDropdown, setModulesDropdown] = useState();
  const [courseId, setCourseId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [lessionTableData, setLessionTableData] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshValue, setRefreshValue] = useState(0);
  const [modules, setModules] = useState([]);
  const [contentData, setContentData] = useState('');

  useEffect(() => {
    setRefresh(true);
    setModulesDropdown();
    setCoursesDropDown();
    setLessionData({
      courseId: '',
      moduleId: '',
      lessionName: '',
      lessionType: '',
      editorPreferences: {},
      disable: 'false'
    });
    getContentDataFromS3({}).then((file) => {
      //   const data = iconv.decode(file.data.Body.data, 'base64');
      console.log('DATA S3 = ', file.data);
    });
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

      const Ids = resp.map((course) => {
        return course.courseId;
      });
      setCourseIds(Ids);
      if (Ids && Ids[0]) {
        setLessionData({
          ...lessionData,
          courseId: Ids[0]
        });
      }
      //   setRefresh(false);
    });
  }, [refreshValue]);

  useEffect(() => {
    if (courseId) {
      getAdminModuleById({ courseId: courseId }).then((resp) => {
        const level1 = resp.level1Modules.map((res) => {
          const option = {
            id: res._id,
            value: res.name.toLowerCase(),
            label: res.name.toLowerCase(),
            optionId: res._id
          };
          return option;
        });
        const level2 = resp.level2Modules.map((res) => {
          const option = {
            id: res._id,
            value: res.name.toLowerCase(),
            label: res.name.toLowerCase(),
            optionId: res._id
          };
          return option;
        });
        const level3 = resp.level3Modules.map((res) => {
          const option = {
            id: res._id,
            value: res.name.toLowerCase(),
            label: res.name.toLowerCase(),
            optionId: res._id
          };
          return option;
        });
        setModulesDropdown(level1.concat(level2.concat(level3)));
      });
      setRefresh(false);
    }
  }, [courseId, setCourseId]);

  const setSelectedCourseId = (id) => {
    console.log('id of course is ' + id);
    setCourseId(id);
  };

  const setSelectedModuleId = (id) => {
    setModuleId(id);
  };

  useEffect(() => {
    if (courseId && moduleId) {
      console.log('useEffect courseid', courseId);
      getLessionByCourseByModule({ courseId: courseId, moduleId: moduleId }).then((resp) => {
        const tableData = resp.map((res) => {
          const data = {
            id: res._id,
            moreButton: true,
            lessionName: { value: res.lessionName },
            moduleId: { value: moduleId },
            courseId: { value: courseId },
            lessionType: { value: res.lessionType },
            level: { value: res.moduleLevel },
            disable: {
              value: res.disable ? 'Disabled' : 'Active',
              label: true,
              successLabel: ['Active']
            }
          };
          return data;
        });
        setLessionTableData(tableData);
      });
    }
  }, [moduleId, setModuleId, refreshValue]);

  useEffect(() => {
    if (lessionData.courseId) {
      getAdminModuleById({ courseId: lessionData.courseId }).then((resp) => {
        let level;
        if (lessionData.moduleLevel === 'level1Modules')
          level = resp.level1Modules.map((mod) => {
            const module = {
              id: mod._id,
              moduleName: mod.name
            };
            return module;
          });
        else if (lessionData.moduleLevel === 'level2Modules')
          level = resp.level2Modules.map((mod) => {
            const module = {
              id: mod._id,
              moduleName: mod.name
            };
            return module;
          });
        if (lessionData.moduleLevel === 'level3Modules')
          level = resp.level3Modules.map((mod) => {
            const module = {
              id: mod._id,
              moduleName: mod.name
            };
            return module;
          });
        setModules(level);
        setLessionData({
          ...lessionData,
          moduleId: level[0].id
        });
        setRefresh(false);
      });
    }
  }, [lessionData.courseId, editorData, lessionData.moduleLevel]);

  console.log('Lession data -->', lessionData);
  console.log('editor data --> ', editorData);

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (lessionData.lessionType === LESSION_TYPE[3] &&
        (editorData.title === '' || editorData.description === [])) ||
      (lessionData.lessionType === LESSION_TYPE[0] &&
        (MCQData.question === '' || MCQData.answers === [] || MCQData.options === [])) ||
      lessionData.lessionName === ''
    ) {
      enqueueSnackbar('Some fields are empty', {
        variant: 'error'
      });
    } else {
      if (lessionData.lessionType === LESSION_TYPE[3]) {
        setLessionData((prev) => {
          if (!prev) return prev;
          const copy = { ...prev };
          copy.editorPreferences.title = editorData.title;
          copy.editorPreferences.description = editorData.description;

          return copy;
        });
      }

      if (lessionData.lessionType === LESSION_TYPE[1]) {
        createAdminLession(lessionData).then((res) => {
          return uploadContentDataToS3({
            data: contentData,
            courseId: lessionData.courseId,
            moduleId: lessionData.moduleId,
            lessionId: res.id
          })
            .then(() => {
              setLessionData({
                courseId: '',
                moduleId: '',
                moduleLevel: 'level1Modules',
                lessionName: '',
                lessionType: 'MCQ',
                editorPreferences: {},
                mcqPreferences: {},
                videoClassPreferences: {},
                disable: 'false',
                doubts: []
              });
              setRefreshValue(refreshValue + 1);
              enqueueSnackbar('Lession Added Successfully', {
                variant: 'success'
              });
            })
            .catch((err) => {
              enqueueSnackbar(err, {
                variant: 'error'
              });
            });
        });
      }
      if (lessionData.lessionType !== LESSION_TYPE[1]) {
        createAdminLession(lessionData)
          .then((response) => {
            setLessionData({
              courseId: '',
              moduleId: '',
              moduleLevel: 'level1Modules',
              lessionName: '',
              lessionType: 'MCQ',
              editorPreferences: {},
              mcqPreferences: {},
              videoClassPreferences: {},
              disable: 'false',
              doubts: []
            });
            setEditorData({
              title: '',
              description: [],
              codeSolutionS3Url: '',
              starterCodeS3Url: '',
              hintVideoUrlS3Url: '',
              testCaseFolderS3Url: ''
            });
            setRefreshValue(refreshValue + 1);
            enqueueSnackbar('Lession Added Successfully', {
              variant: 'success'
            });
          })
          .catch((err) => {
            enqueueSnackbar(err, {
              variant: 'error'
            });
          });
        console.log('after submit lession --> ', lessionData);
      }
    }
  };

  const [lessionRowData, setLessionRowData] = useState({});
  const [openS3Modal, setOpenS3Modal] = useState(false);

  const uploadS3 = (data, e) => {
    const upload = lessionTableData.filter((less) => less.id === data.id);
    if (upload[0]) {
      setLessionRowData({
        ...upload[0]
      });
      console.log('log s3', upload[0]);
      setOpenS3Modal(true);
    }
  };

  console.log('s3 data', lessionRowData);

  return (
    <Page title="Shoshin | Lessions">
      {refresh ? (
        <Spinner />
      ) : (
        <Container>
          <S3
            lessionRowData={lessionRowData}
            setOpenS3Modal={setOpenS3Modal}
            openS3Modal={openS3Modal}
          />
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              All Lessions
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              minWidth="38%"
              maxWidth="50%"
            >
              <BlogPostsSort options={coursesDropdown} setSelected={setSelectedCourseId} />
              <BlogPostsSort options={modulesDropdown} setSelected={setSelectedModuleId} />
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <CustomTable
              rowsPerPageOptions={[3, 10, 15, 30, 60, 100]}
              tableHead={LESSION_TABLE_HEAD}
              tableBody={lessionTableData}
              searchRow={LESSION_TABLE_HEAD[0].id}
              setBucketRowId={uploadS3}
              //   setEditRowId={editModule}
              //   setDeleteRowId={disableModule}
              selection={false}
            />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="subtitle1" sx={{ flexShrink: 0, color: 'text.secondary' }}>
              Create Lessions
            </Typography>
          </Stack>
          <Grid item xs={12} md={6} lg={12}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Enter Details" />
              <CardContent>
                <Grid container spacing={3} style={{ textAlign: 'center' }}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Course Id</div>
                      <select
                        className="input"
                        name="courseId"
                        value={lessionData.courseId}
                        onChange={(e) =>
                          setLessionData({
                            ...lessionData,
                            courseId: e.target.value
                          })
                        }
                      >
                        {courseIds.map((opt, index) => (
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
                      <div className="heading">Module Level</div>
                      <select
                        className="input"
                        name="moduleLevel"
                        value={lessionData.moduleLevel}
                        onChange={(e) =>
                          setLessionData({ ...lessionData, moduleLevel: e.target.value })
                        }
                      >
                        {['level1Modules', 'level2Modules', 'level3Modules'].map((opt, index) => (
                          <option key={index} value={opt.id}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Module Name</div>
                      <select
                        className="input"
                        name="moduleName"
                        value={lessionData.moduleId}
                        onChange={(e) =>
                          setLessionData({ ...lessionData, moduleId: e.target.value })
                        }
                      >
                        {modules.map((opt, index) => (
                          <option key={index} value={opt.id}>
                            {opt.moduleName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Lession Name</div>
                      <input
                        className="input"
                        type="text"
                        value={lessionData.lessionName}
                        onChange={(e) =>
                          setLessionData({
                            ...lessionData,
                            lessionName: e.target.value
                          })
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className="inputBox" style={{ textAlign: 'left' }}>
                      <div className="heading">Lession Type</div>
                      <select
                        className="input"
                        name="lessionType"
                        value={lessionData.lessionType}
                        onChange={(e) =>
                          setLessionData({
                            ...lessionData,
                            lessionType: e.target.value
                          })
                        }
                      >
                        {LESSION_TYPE.map((opt, index) => (
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
                      <div className="heading">Disable</div>
                      <select
                        className="input"
                        name="disable"
                        value={lessionData.disable}
                        onChange={(e) =>
                          setLessionData({
                            ...lessionData,
                            disable: e.target.value
                          })
                        }
                      >
                        {['true', 'false'].map((opt, index) => (
                          <option key={index} value={opt}>
                            {' '}
                            {opt}{' '}
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
                      Submit
                      {/* {editModuleId ? 'Update' : 'Submit'} */}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {lessionData.lessionType === 'EDITOR' ? (
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Enter Editor Preferences Details" />
                <CardContent>
                  <EditorPreferencesDesc editorData={editorData} setEditorData={setEditorData} />
                </CardContent>
              </Card>
            ) : (
              ''
            )}
            {lessionData.lessionType === 'MCQ' ? (
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Enter MCQs Details" />
                <CardContent>
                  <MCQCard MCQData={MCQData} setMCQData={setMCQData} />
                </CardContent>
              </Card>
            ) : (
              ''
            )}
            {lessionData.lessionType === 'CONTENT' ? (
              <div>
                <Card sx={{ mb: 3 }}>
                  <CardHeader title="Enter MCQs Details" />
                  <CardContent>
                    <ContentEditor setContentData={setContentData} contentData={contentData} />
                  </CardContent>
                </Card>
              </div>
            ) : (
              ''
            )}
          </Grid>
          {/* <div>
            <div
              style={{
                left: '0px',
                width: '100%',
                height: '0px',
                position: 'relative',
                paddingBottom: '56.25%',
                maxWidth: '1550px'
              }}
            ></div> */}

          {/* <p>Please try out the features provided in this full featured example.</p>
            <h2>Got questions or need help?</h2>
            <ul>
              <li>
                Our{' '}
                <a class="mceNonEditable" href="../../">
                  documentation
                </a>{' '}
                is a great resource for learning how to configure TinyMCE.
              </li>
              <li>
                Have a specific question? Try the{' '}
                <a
                  href="https://stackoverflow.com/questions/tagged/tinymce"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <code>tinymce</code> tag at Stack Overflow
                </a>
                .
              </li>
              <li>
                We also offer enterprise grade support as part of{' '}
                <a href="../../../pricing">TinyMCE premium subscriptions</a>.
              </li>
            </ul>
            <h2>A simple table to play with</h2>

            <h2>Found a bug?</h2>
            <p>
              If you think you have found a bug please create an issue on the{' '}
              <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to
              the developers.
            </p>
            <h2>Finally ...</h2>
            <p>
              Don't forget to check out our other product{' '}
              <a href="http://www.plupload.com" target="_blank" rel="noopener noreferrer">
                Plupload
              </a>
              , your ultimate upload solution featuring HTML5 upload support.
            </p>
            <p>
              Thanks for supporting TinyMCE! We hope it helps you and your users create great
              content.
              <br />
              All the best from the TinyMCE team.
            </p>
          </div>
          <embed
            type="text/html"
            src="https://wiki.kl-infra.com/share/523c4a45-511f-4041-aa68-3bb1e28b11ea"
            width="1200"
            height="800"
          ></embed> */}
        </Container>
      )}
    </Page>
  );
}
