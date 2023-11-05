/*eslint-disable*/
import { useEffect , useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  createUser,
  getAllUsers,
  getUserbycode,
  removeUser,
  updateUser,
} from "../actions/actionCreater";
import {FormGroup, Label, Input, FormFeedback, Row, Col, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../actions/userActions";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";
import Loader from "../helper/Loader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './User.css'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import Swal from 'sweetalert2';
import AltImage from './Image/emptyImage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
const cityOptions = [

  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Surat', label: 'Surat' },
  { value: 'Indore', label: 'Indore' },

]
const stateOptions = [

  { value: 'Maharastra', label: 'Maharastra' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },

];

const columns = [
  { id: "id", name: "Id" },
  { id: "name", name: "Name" },
  { id: "email", name: "Email" },
  { id: "city", name: "City" },
  { id: "state", name: "State" },
  { id: "date", name: "Date" },
  { id: "age", name: "Age" },
  { id: "address", name: "Address" },
  { id: "profile", name: "Profile" },
  { id: "Color", name: "Color" },
  { id: "status", name: "Status" },
  { id: "action", name: "Action" },
];
// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
// const MAX_FILE_SIZE = 2 * 1024 * 1024;

const schema = yup
  .object({
    name: yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Only alphabets and white spaces are allowed')
      .max(15, 'Name must be at most 15 characters')
      .required('Name is required'),
    email: yup
      .string()
      .email("This must be a valid email")
      .required("Email is required"),
    password: yup
      .string().required('Password is required')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one alphabet, one digit, and one special character'
      )
      .min(6, 'Password must be at least six characters long'),

    address: yup.string().max(500, 'Address must be at most 500 characters')
      .required('Address is required'),
    profileImage: yup.mixed()
      // .test('fileSize', 'File is too large, only 2MB allowed', (value) => {
      // return value && value.size <= MAX_FILE_SIZE;
      // })
      // .test('fileFormat', 'Unsupported file format', (value) => {
      // return value && SUPPORTED_FORMATS.includes(value.type);
      // })
      .required('Image is required'),

  })
  .required();
const User = (props) => {
  const {
    handleSubmit,
    setValue,

    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const variants = ["h1", "h3", "body1", "caption"];

  function TypographyDemo(props) {
    const { loading = false } = props;

    return (
      <div>
        {variants.map((variant) => (
          <Typography component="div" key={variant} variant={variant}>
            {loading ? <Skeleton /> : variant}
          </Typography>
        ))}
      </div>
    );
  }

  TypographyDemo.propTypes = {
    loading: PropTypes.bool,
  };
  const dispatch = useDispatch();
  const [id, idchange] = useState(0);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(false);
  const [open, openchange] = useState(false);
  const [rowperpage, rowperpagechange] = useState(5);
  const [page, pagechange] = useState(0);
  const [isedit, iseditchange] = useState(false);
  const [title, titlechange] = useState("");
  const editobj = useSelector((state) => state.user.userObj);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7f2929');
const getAll =()=>{


  if (Object.keys(editobj).length > 0) {
    idchange(editobj.id);
    setValue("name", editobj.name);
    setValue("email", editobj.email);
    setValue("password", editobj.password);
    setCity(editobj.city);
    setState(editobj.state);
    setValue("address", editobj.address);
    setDate(editobj.date);
    setAge(editobj.age);
    setProfileImage(editobj.profileImage)
    setSelectedColor(editobj.favoriteColor)
    setStatus(editobj.status);
  } else {
    clearstate();
  }


}
  useEffect(() => {
    getAll()
  }, [editobj]);




  const handleAgeChange = (newValue) => {
    setAge(newValue);
  };
  const handleProfile = (e) => {

    setProfileImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    })

    
  }
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value); // Update the selected color when it changes
  };
  const stateHandleChange = (event) => {
    setState(event.target.value);
  };
  const cityHandleChange = (event) => {
    setCity(event.target.value);
  };
  const handlePageChange = (event, newpage) => {
    pagechange(newpage);
  };

  const handleRowperPageChange = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  const handleDateChange = (e) => {
    console.log('Selected date:', e.target.value);

    setDate(e.target.value)
    // You can perform actions based on the selected date here
  };
  const functionAdd = () => {
    iseditchange(false);
    titlechange("Add user");
    openpopup();
  };
  const closePopup = () => {
    openchange(false);
  };
  const openpopup = () => {
    openchange(true);
    clearstate();
    dispatch(OpenPopup());
  };

  const onSubmit = (data) => {
    const _obj = {
      id,
      name: data.name,
      email: data.email,
      password: data.password,
      city: city,
      state: state,
      address: data.address,
      date: date,
      age: age,
      profileImage: profileImage.raw && profileImage.raw.name,
      favoriteColor: selectedColor,
      status: status,
    };

    if (isedit) {
      dispatch(updateUser(_obj));
    } else {
      dispatch(createUser(_obj));
    }
    closePopup();
  };

  const handleEdit = (code) => {

    iseditchange(true);
    titlechange("Edit user");
    openchange(true);
    dispatch(getUserbycode(code));
  };

  const handleRemove = (code) => {
    return Swal.fire({
      title: 'Are You Sure?',
      text: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }
  

  
  
  ).then(function (result) {
if(result.value === true){

   dispatch(removeUser(code))
   Swal.fire({
    icon: 'success',
    title: 'Deleted!',
    text: 'Your record has been deleted.'
});

}

  })
  }
    
    


  const clearstate = () => {
    idchange(0);
    setState("");
    setCity("");
    setStatus("");
    setSelectedColor("");
    setValue("name", '');
    setValue("email", '');
    setValue("password", '');
    setValue("city", '');
    setValue("state", '');
    setValue("address", '');
    setValue("date", '');
    setValue("age", '');
    setValue("profileImage", '');
    setSelectedColor('')
    setValue("status", '');
    setProfileImage('')

  };
  useEffect(() => {
    props.loadUser();
  }, []);
  return props.userState.isloading ? (
    <div>
      <Loader></Loader>
    </div>
  ) : props.userState.errormessage ? (
    <div>
      <h2>{props.userState.errormessage}</h2>
    </div>
  ) : (
    <div>
      <Paper sx={{ margin: "1%" }}>
        <div style={{ margin: "1%" }}>
          <Button onClick={functionAdd} variant="contained">
            Add New (+)
          </Button>
        </div>
        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "midnightblue" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ color: "white" }}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.userState.userList &&
                  props.userState.userList
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.city}</TableCell>
                          <TableCell>{row.state}</TableCell>
                          <TableCell>{row.address}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.age}</TableCell>
                          <TableCell>{row.profileImage}</TableCell>
                          <TableCell><div className="table-cell" style={{ backgroundColor: row.favoriteColor, borderRadius: "10%" }}>{row.favoriteColor}</div></TableCell>
                          <TableCell>{row.status === true ? "Active" : "InActive"}</TableCell>
                          <TableCell>
                            <div className="btn-design">
                              <Button
                                onClick={(e) => {
                                  handleEdit(row.id);
                                }}
                                variant="contained"
                                color="primary"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={(e) => {
                                  handleRemove(row.id);
                                }}
                                variant="contained"
                                color="error"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            rowsPerPage={rowperpage}
            page={page}
            count={props.userState.userList.length}
            component={"div"}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowperPageChange}
          ></TablePagination>
        </div>
      </Paper>
      <Modal isOpen={open} toggle={closePopup} >
        <ModalHeader toggle={closePopup}>{title}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
            </FormGroup>
            <Row >
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input type="name" name="name" id="name" placeholder="Name"                   {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="field_level_error">{errors.name.message}</span>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input type="email" name="email" id="email" placeholder="Email" {...field} />
                    )}
                  />
                  {errors.email && (
                    <span className="field_level_error">
                      {errors.email.message}
                    </span>
                  )}
                </FormGroup>

              </Col>
              <Col md={6}>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (

                      <Input type="password" name="password" id="password" placeholder="Password" {...field} />
                    )}
                  />
                  {errors.password && (
                    <span className="field_level_error">
                      {errors.password.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
             
              <Col md={6}>
                <FormGroup>
                  <Label for="Select">State</Label>
                  <Input type="select" name="select" id="Select" value={state}
                    onChange={stateHandleChange}>
                    <option>Select a State</option>

                    {
                      stateOptions.map((item) => ((

                        <option>{item.label}</option>

                      )))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
  <FormGroup>
    <Label for="select">City</Label>
    <Input type="select" name="select" id="select"
      value={city}
      onChange={cityHandleChange}>
        <option>Select a city</option>
      {cityOptions.map((item) => ((
        <option>{item.label}</option>
      )))}
    </Input>
  </FormGroup>
</Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="date" name="date" id="date" placeholder="Date" value={date} onChange={handleDateChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6} >
                <FormGroup>
                  <Label for="date" >Age</Label>

                  <InputRange
                    maxValue={100}
                    minValue={0}
                    value={age}
                    onChange={handleAgeChange}
                  />

                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>

                  <Label for="address">Address</Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input type="textarea" name="text" id="address" {...field} />
                    )}
                  />
                  {errors.address && (
                    <span className="field_level_error">
                      {errors.address.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="color">Favorite  Color</Label>
                  <Input type="color" name="color" id="color" placeholder="color placeholder" value={selectedColor} // Set the value of the color input
                    onChange={handleColorChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="profileImage">
                    Profile
                  </Label>
                  <Input
                    id="profileImage"
                    accept="image/*"
                    name="profileImage"
                    type="file"
                    onChange={(e) => handleProfile(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup switch>
                  <Input
                    type="switch"
                    checked={status}
                    onClick={() => {
                      setStatus(!status);

                    }}
                  />
                  <Label check>{status === true ? "Active" : "InActive"} </Label>
                </FormGroup>
              </Col>
              <Col md={6}>
                {profileImage && profileImage.preview ? (
                  <img style={{
                    width: "inherit", height: "80px", borderRadius: "50%",
                  }}

                    src={profileImage && profileImage.preview}
                  />
                ) : (
                  <> <img
                    src={profileImage ? profileImage : AltImage}
                    alt="img"
                    width="inherit"
                    height="80px"

                  /> </>
                )}
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Button  variant="contained" type="submit">
                    Submit
                  </Button>
                </FormGroup>

              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      {/* </DialogContent> */}
      {/* </Dialog> */}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    userState: state.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    loadUser: () => dispatch(getAllUsers()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(User);