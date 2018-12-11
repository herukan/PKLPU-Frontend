import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,ButtonGroup,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row, Pagination, PaginationItem, PaginationLink,Table, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

import axios from 'axios';

import ReactTable from "react-table";
import "react-table/react-table.css";
import $ from "jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      nama:'',
      nip:'',
      email:'',
      password:'',
      fadeIn: true,
      timeout: 300,
      info: false,
      productName: '', 
      productPrice: '',
      searchq:'',
      persons: [],
      dataku:[],
      infoku:[],
      data: [],
          loading: false,
          pages: -1,
          page: null,
          pageSize:10,
          sorted:0,
          filtered: '',
    };
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
}

handleDelete(index){
  // e.preventDefault();
  const self = this
  axios({
    method: 'delete',
    url: 'http://localhost:8000/api/pemeliharaan/'+index,
  })
 
  const data = self.state.data.filter(prod => prod.id !== index)
  self.setState({data})

}

notifydel = (string) => {
  toast.error(string, {
    position: toast.POSITION.BOTTOM_CENTER,
    position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
  });
};

notify = (string) => {
  toast.success(string, {
    position: toast.POSITION.BOTTOM_CENTER,
    position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
  });
};

handleSubmit(e){

e.preventDefault();
var formData = new FormData(); 
formData.append("password", this.state.password);
formData.append("email", this.state.email);
formData.append("name", this.state.nama);
formData.append("nip", this.state.nip);

axios
  .post("http://localhost:8000/api/user/register", formData)
  .then(response => {
    console.log(response);
    return response;
  })
  .then(json => {
    if (json.data.success) {

      // alert(`Registration Successful!`);
      this.notify("Registrasi Pengguna Berhasil!")
      let userData = {
        name: json.data.data.name,
        id: json.data.data.id,
        email: json.data.data.email,
        auth_token: json.data.data.auth_token,
        timestamp: new Date().toString()
      };
      let appState = {
        isLoggedIn: true,
        user: userData
      };
      // save app state with user date in local storage
      localStorage["appState"] = JSON.stringify(appState);
      this.setState({
        isLoggedIn: appState.isLoggedIn,
        user: appState.user
      });
    } else {
      // alert(`Registration Failed!`);
      this.notifydel("Registrasi Pengguna Gagal!")
      $("#email-login-btn")
        .removeAttr("disabled")
        .html("Register");
    }

  })
  .catch(error => {
    alert("An Error Occured!" + error);
    console.log(`${formData} ${error}`);
    $("#email-login-btn")
      .removeAttr("disabled")
      .html("Register");
  });

}


  componentDidMount() {
    axios.get('http://localhost:8000/api/users/list')
      .then(res => {
        console.log(" ini didmount"+res.data)
        const persons = res.data;
        this.setState({ persons });
      })
  }

  componentSelect(id) {
    var sel = ''
    sel = id
    axios.get('http://localhost:8000/api/siswa/'+sel)
      .then(res => {
        console.log(" ini didmount"+res.data)
        const data = res.data;
        this.setState({ data });
      })

      console.log(this.state.persons)
  }

  handleChange1(e){
    this.setState({
      productName: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      productPrice: e.target.value
    })
  }

  handleSearch(e){
    if (e.target.value == ''){
      this.setState({ data : this.state.data });
    }else {
      this.componentSelect(e.target.value)
    }
    

    this.setState({
      searchq: e.target.value
    })
  }
  

  handleDelete(index){
    // e.preventDefault();
    const self = this
    axios({
      method: 'delete',
      url: 'http://localhost:8000/api/users/list/'+index,
    })
   
    const persons = self.state.persons.data.filter(prod => prod.id !== index)
    self.setState({persons})

  }


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  toggleInfo(id) {

    var sel = ''
    sel = id
    axios.get('http://localhost:8000/api/siswa/'+sel)
      .then(res => {
        console.log(" ini didmount"+res.data)
        const infoku = res.data;
        this.setState({ infoku });
      })
      

    this.setState({
      info: !this.state.info,
    });
  }


  render() {
    const { data } = this.state;
    const { persons } = this.state;
    const { searchq } = this.state;

    var bodyFormData = new FormData();

    return (
      <div className="animated fadeIn">
        <Row>
        <ToastContainer />
          <Col xs="4">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  <i className="fa fa-edit"></i>Tambah Pengguna
                  <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-setting"><i className="icon-settings"></i></Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    <Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                  <FormGroup>
                    <InputGroup>
                      <Input type="text" onChange={(value) => this.onChange(value)} id="nama" name="nama" placeholder="Nama Lengkap" autoComplete="name"/>
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <Input type="text" onChange={(value) => this.onChange(value)} id="nip" name="nip" placeholder="NIP" autoComplete="name"/>
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <Input type="email" onChange={(value) => this.onChange(value)}  id="email" name="email" placeholder="Email" autoComplete="email"/>
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <Input type="password" id="password" onChange={(value) => this.onChange(value)} name="password" placeholder="Password" autoComplete="current-password"/>
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button type="submit" size="sm" onClick={this.handleSubmit} color="primary">Submit</Button>
                  </FormGroup>
                  </CardBody>
                </Collapse>
              </Card>
            </Fade>
          </Col>

            <Col xs="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Kendaraan
              </CardHeader>
              <CardBody>
              <ReactTable
                       data={persons.data}
                       columns={[
                        {
                          Header: "ID",
                          accessor: "id"
                        },
                             {
                               Header: "Nama Lengkap",
                               accessor: "name"
                             },
                             {
                               Header: "NIP",
                               accessor: "nip"
                              },
                              {
                                Header: "Email",
                                accessor: "email"
                               },
                               {
                                Header: 'Aksi',
                                accessor: "id",
                                width: 70,
                                Cell: row => (
                                    <div>
                                      <ButtonGroup size="sm">
                                      <Button  color="danger" className="cui-trash icons font-1xl  " onClick={this.handleDelete.bind(this,row.original.id)}></Button>
                                        {/* <Button color="primary" className="cui-note icons font-1xl  " onClick={this.toggleEdit.bind(this,row.original,row.original.id)} ></Button> */}
                                       </ButtonGroup>
                                    </div>
                                )
                             }
                            ]}
                            defaultPageSize={5}
                            pageSizeOptions={[5, 10, 20, 25, 50]}

                            // pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                            // loading={this.state.loading}
                            // defaultPageSize={10}
                            // pageSizeOptions={[5, 10, 20, 25, 50]}
                            // manual // informs React Table that you'll be handling sorting and pagination server-side
                            // onFetchData={(state, instance) => {
                            //   bodyFormData = new FormData();
                            //   bodyFormData.set('length', state.pageSize);
                            //   bodyFormData.set('start', state.page);
                            //   bodyFormData.set('kolom', state.sorted);
                            //   bodyFormData.set('order.0.dir', 'ASC');
                            //   bodyFormData.set('search', state.filtered);
                            //   console.log("ini state tablenya "+state.pageSize+" page : "+state.page+" sorted : "+state.sorted+" filtered :"+state.filtered)
                            //   // show the loading overlay
                            //   this.setState({loading: true})
                            //   // fetch your data
                                
                            //   axios.post('http://localhost:8000/api/page',bodyFormData)
                            //     .then((res) => {
                            //       var pag = Math.ceil(res.data.filtered/res.data.limit);
                            //       // console.log("PAG "+pag)
                            //       this.setState({
                            //         data: res.data,
                            //         pages: 20,
                            //         loading: false
                            //       })
                            //     })
                            // }
                          
                          // }
                     
                     />
              </CardBody>
            </Card>
          </Col>

        </Row>

                            {/* MODAL */}
        <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleInfo}>Modal title</ModalHeader>
                  <ModalBody>
                    <ul>
                    { this.state.infoku.map(infoku => <li>{infoku.id} is {infoku.nama}</li>)}
      </ul>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleInfo}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggleInfo}>Cancel</Button>
                  </ModalFooter>
                </Modal>


      </div>
    );
  }
}

export default Forms;
