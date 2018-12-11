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
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,ButtonGroup,
  Label,
  Row,Pagination, PaginationItem, PaginationLink,Table, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

import axios from 'axios';
import { AppSwitch } from '@coreui/react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pStyle = {
  fontSize: '15px',
  textAlign: 'left',
  width: '200px',
  margin: '5px'
};
class Manifest extends Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.handleChangepeminjam = this.handleChangepeminjam.bind(this);
    this.handleChangeinstansi = this.handleChangeinstansi.bind(this);
    this.handleChangealamat = this.handleChangealamat.bind(this);
    this.handleChangeperihal = this.handleChangeperihal.bind(this);
    this.handleChangemulaisewa = this.handleChangemulaisewa.bind(this);
    this.handleChangekembali = this.handleChangekembali.bind(this);
    this.handleChangehargasewa = this.handleChangehargasewa.bind(this);

    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toogleModal = this.toogleModal.bind(this);
    this.tooglestatus = this.tooglestatus.bind(this);
    this.tooglestatus2 = this.tooglestatus2.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      nam:'',
      ins:'',
      ala:'',
      per:'',
      mul:'',
      sel:'',
      har:'',
      timeout: 300,
      info: false,
      productName: '', 
      productPrice: '',
      searchq:'',
      persons: [],
      dataku:[],
      infoku:[],
      data: [],
      detail:[],
      plat:[],
      platjenis:[],
          loading: false,
          pages: -1,
    };
    this.toggleInfo = this.toggleInfo.bind(this);
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

  componentDidMount() {
    axios.get('http://localhost:8000/api/peminjaman/')
      .then(res => {
        console.log(" ini didmount"+res.data)
        const data = res.data;
        this.setState({ data, 
        dataku : data});
      })

      axios.get('http://localhost:8000/api/kendaraan/plat')
      .then(res => {
        console.log(" ini didmount"+res.data)
        const plat = res.data;
        this.setState({plat});
      })

      console.log(this.state.data)
  }

  componentSelect(id) {
    var sel = ''
    sel = id
    axios.get('http://localhost:8000/api/peminjaman/'+sel)
      .then(res => {
        console.log(" ini didmount"+res.data)
        const data = res.data;
        this.setState({ data });
      })

      console.log(this.state.persons)
  }

  handleChangepeminjam(e){
    this.setState({
      nam : e.target.value
    })

  }

  handleChangeinstansi(e){
    this.setState({
      ins : e.target.value
    })
  }

  handleChangealamat(e){
    this.setState({
      ala : e.target.value
    })
  }
  handleChangeperihal(e){
    this.setState({
      per : e.target.value
    })
  }
  
  handleChangemulaisewa(e){
    this.setState({
      mul : e.target.value
    })
  }

  handleChangehargasewa(e){
    this.setState({
      har : e.target.value
    })
  }

  handleChangekembali(e){
    this.setState({
      sel : e.target.value
    })
  }

  handleChange2(e){
    this.setState({
      har : e.target.value
    })
  }

  handleSearch(e){
    if (e.target.value == ''){
      axios.get('http://localhost:8000/api/peminjaman/')
      .then(res => {
        console.log(" ini didmount"+res.data)
        const data = res.data;
        this.setState({ data, 
        dataku : data});
      })

      // this.setState({ data : this.state.dataku });
    }else {
      this.componentSelect(e.target.value)
    }
    

    this.setState({
      searchq: e.target.value
    })
  }
  


  handleSubmit(e){

    e.preventDefault();

    const requestBody = {
      nama: this.state.nam,
      instansi: this.state.ins,
      alamat: this.state.ala,
      jenis: this.state.infoku[0].jenis,
      plat: this.state.infoku[0].plat,
      perihal: this.state.per,
      tgl_mulai: this.state.mul,
      tgl_kembali: this.state.sel,
      harga: this.state.har,
      status: this.state.infoku[0].status,
 }
  
  const config = {
    body: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  axios.put('http://localhost:8000/api/peminjaman/'+this.state.infoku[0].id, requestBody, config)
  .then(res => {
    console.log(" ini didmount"+res.data)
    // const data = res.data;
    // this.setState({ data, 
    // dataku : data});
  })

  this.notify("Edit Data Berhasil!")

  }

  handleDelete(index){
    // e.preventDefault();
    const self = this
    axios({
      method: 'delete',
      url: 'http://localhost:8000/api/peminjaman/'+index,
    })
   
    const data = self.state.data.filter(prod => prod.id !== index)
    self.setState({data})

    this.notifydel("Data Berhasil Dihapus!")

  }

  toggleInfo(data,id) {
    var sel = ''
    sel = id
    axios.get('http://localhost:8000/api/peminjaman/'+sel)
      .then(res => {
        console.log(" ini didmount"+res.data)
        const infoku = res.data;
        this.setState({ infoku: res.data,
                        info: !this.state.info,
                          detail: data,
                          nam: res.data[0].nama,
    ins:res.data[0].instansi,
    ala:res.data[0].alamat,
    per:res.data[0].perihal,
    mul:res.data[0].tgl_mulai,
    sel:res.data[0].tgl_kembali,
    har:res.data[0].harga,
                        });
      })
  }

  toogleModal(){
    this.setState({info: !this.state.info});
  }

  tooglestatus(id) {
      const requestBody = {
        id: id.id,
        nama: id.nama,
        instansi: id.instansi,
        alamat: id.alamat,
        perihal: id.perihal,
        tgl_mulai: id.tgl_mulai,
        tgl_kembali: id.tgl_kembali,
        jenis: id.jenis,
        plat: id.plat,
        harga: id.harga,
        status: 'Dipinjam',
   }
    
    const config = {
      body: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.put('http://localhost:8000/api/peminjaman/'+id.id, requestBody, config)
    .then(res => {
      console.log(" ini didmount"+res.data)
      // const data = res.data;
      // this.setState({ data, 
      // dataku : data});
    })

    const requestBody2 = {
      status: 'Dipinjam',
 }
  
  const config2 = {
    body: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  axios.put('http://localhost:8000/api/kendaraan/'+id.plat, requestBody2, config2)
  .then(res => {
    console.log(" ini didmount"+res.data)
    // const data = res.data;
    // this.setState({ data, 
    // dataku : data});
  })

  }

  tooglestatus2(id) {
    const requestBody = {
      id: id.id,
      nama: id.nama,
      instansi: id.instansi,
      alamat: id.alamat,
      perihal: id.perihal,
      tgl_mulai: id.tgl_mulai,
      tgl_kembali: id.tgl_kembali,
      jenis: id.jenis,
      plat: id.plat,
      harga: id.harga,
      status: 'Tersedia',
 }
  const config = {
    body: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  axios.put('http://localhost:8000/api/peminjaman/'+id.id, requestBody, config)
  .then(res => {
    console.log(" ini didmount"+res.data)
    // const data = res.data;
    // this.setState({ data, 
    // dataku : data});
  })

  const requestBody2 = {
    status: 'Tersedia',
}

const config2 = {
  body: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

axios.put('http://localhost:8000/api/kendaraan/'+id.plat, requestBody2, config2)
.then(res => {
  console.log(" ini didmount"+res.data)
  // const data = res.data;
  // this.setState({ data, 
  // dataku : data});
})

}


  // toggleInfo() {
  //   this.setState({
  //     info: !this.state.info,
  //   });
  // }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  renderSwitch(param,id) {
    switch(param) {
      case 'Tersedia':
        return <AppSwitch className={'mx-1'} color={'success'}  onChange={this.tooglestatus.bind(this,id)} label checked />;
      default:
        return <AppSwitch className={'mx-1'}  onChange={this.tooglestatus2.bind(this,id)} color={'success'} label />;;
    }
  }

  
  renderOption(param) {
    var bodyFormData = new FormData();
    bodyFormData.set('jenis', param);
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/kendaraan/jenis',
      data: bodyFormData
    })
    .then(res => {
      console.log("INI PLATJENIS"+res.data)
      this.state.platjenis.push(res.data)
      const platjenis = res.data;
      this.setState({ platjenis : this.state.platjenis});
    }); 

    if (param =='Mobil'){
     return (<Input type="select" name="jenisalat" id="jenisalat">
     <option value="0">Please select</option>
      <option selected="selected"  value="1">Mobil</option>
      <option value="2">Motor</option>
      <option value="3">Truk</option>
      <option value="3">Eskavator</option>
      <option value="3">Stomp</option>
   </Input>
   );
    }else if(param =='Motor'){
      return (<Input type="select" name="jenisalat" id="jenisalat">
      <option value="0">Please select</option>
       <option value="1">Mobil</option>
       <option selected="selected" value="2">Motor</option>
       <option value="3">Truk</option>
       <option value="3">Eskavator</option>
       <option value="3">Stomp</option>
    </Input>
    );

    }else if(param =='Truk'){
      return (
      <Input type="select" name="jenisalat" id="jenisalat">
      <option value="0">Please select</option>
       <option value="1">Mobil</option>
       <option value="2">Motor</option>
       <option selected="selected" value="3">Truk</option>
       <option value="3">Eskavator</option>
       <option value="3">Stomp</option>
      </Input>
    );

    }else if(param =='Eskavator'){
      return (<Input type="select" name="jenisalat" id="jenisalat">
      <option value="0">Please select</option>
       <option  value="1">Mobil</option>
       <option value="2">Motor</option>
       <option value="3">Truk</option>
       <option selected="selected" value="3">Eskavator</option>
       <option value="3">Stomp</option>
    </Input>
    );

    }else{
      return (<Input type="select" name="jenisalat" id="jenisalat">
      <option value="0">Please select</option>
       <option value="1">Mobil</option>
       <option value="2">Motor</option>
       <option value="3">Truk</option>
       <option value="3">Eskavator</option>
       <option selected="selected" value="3">Stomp</option>
    </Input>
    );

    }
  }


  render() {
    const { data } = this.state;
    const { persons } = this.state;
    const { searchq } = this.state;
    const { platjenis } = this.state;
    var bodyFormData = new FormData();

    return (
      <div className="animated fadeIn">
        <Row>
        <ToastContainer />
          <Col xs="12" sm="12">
          <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Manifes Peminjaman
              </CardHeader>
              <CardBody>
               <input type="text" style={pStyle} className="form-control col-md-6" placeholder="Pencarian" onChange={this.handleSearch.bind(this)}/>
              <ReactTable
                       data={data}
                       columns={[
                        {
                          Header: "Nama",
                          accessor: "nama"
                        },
                             {
                               Header: "Instansi",
                               accessor: "instansi"
                             },
                              {
                                Header: "Alamat",
                                accessor: "alamat"
                               },
                               {
                                Header: "Perihal",
                                accessor: "perihal"
                               },
                               {
                                Header: "Tanggal Pinjam",
                                accessor: "tgl_mulai",
                                width: 70
                               },
                               {
                                Header: "Tanggal Kembali",
                                accessor: "tgl_kembali",
                                width: 70
                               },
                               {
                                Header: "Jenis",
                                accessor: "jenis",
                                width: 60
                               },
                               {
                                Header: "Plat",
                                accessor: "plat",
                                width: 75
                               },
                               {
                                Header: "Harga",
                                accessor: "harga",
                                width: 65
                               },
                               {
                                Header: "Status",
                                accessor: "status",
                                width: 63,
                                Cell: row => (
                                  // console.log("INI OROGINAL PLAT "+row.original.plat+" "+row.original.id),
                                    <div>
                                     {this.renderSwitch(row.original.status,row.original)}
                                    </div>
                                )
                               },
                               {
                                Header: 'Aksi',
                                accessor: "id",
                                width: 60,
                                Cell: row => (
                                  // console.log("INI OROGINAL PLAT "+row.original.plat+" "+row.original.id),
                                    <div>
                                      <ButtonGroup size="sm">
                                      <Button  color="danger" className="cui-trash icons font-1xl  " onClick={this.handleDelete.bind(this,row.original.id)}></Button>
                                        <Button  color="primary" className="cui-note icons font-1xl  " onClick={this.toggleInfo.bind(this,row.original,row.original.id)} ></Button>
                                       </ButtonGroup>
                                    </div>
                                )
                             }
                            ]}
                            // pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                            // loading={this.state.loading}
                            defaultPageSize={10}
                            pageSizeOptions={[5, 10, 20, 25, 50]}
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
                                
                            //   axios.post('http://localhost:8000/api/pemeliharaanpage/',bodyFormData)
                            //     .then((res) => {
                            //       var pag = Math.ceil(res.data.filtered/res.data.limit);
                            //       // console.log("PAG "+pag)
                            //       this.setState({
                            //         dataku : res.data,
                            //         data: res.data.pages,
                            //         pages: 10,
                            //         loading: false
                            //       })
                            //     })
                            // }}
                     
                     />
              </CardBody>
            </Card>
          </Col>
        </Row>

        { this.state.infoku.map(infoku =>
                <Modal isOpen={this.state.info} toggle={this.toogleModal}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toogleModal}>Edit Peminjaman</ModalHeader>
                  <ModalBody>
                  <form onSubmit={this.handleSubmit}>
                  <FormGroup>
                  <Label htmlFor="peminjam">Peminjam</Label>
                  <Input type="text" id="peminjam" onChange={this.handleChangepeminjam} value={this.state.nam} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="instansi">Instansi</Label>
                  <Input type="text" id="instansi" onChange={this.handleChangeinstansi} value={this.state.ins} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="alamat">Alamat</Label>
                   <Input type="textarea" name="alamat" onChange={this.handleChangealamat} value={this.state.ala} id="alamat" rows="6"
                              />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="perihal">Perihal</Label>
                   <Input type="textarea" name="perihal" onChange={this.handleChangeperihal} value={this.state.per} id="perihal" rows="6"
                            />
                </FormGroup>
                
                {/* value={infoku.tgl_mulai}
                value={infoku.tgl_kembali} */}
                <FormGroup>
                  <Label htmlFor="tanggalsewa">Masa Penyewaan</Label>
                  <Input type="date" id="tanggalsewa"  onChange={this.handleChangemulaisewa} name="tanggalsewa" value={this.state.mul} />
                  <FormText color="muted">Tanggal mulai sewa</FormText>
                </FormGroup>

                   <FormGroup>
                  <Input type="date" id="tanggalkembali"  onChange={this.handleChangekembali} name="tanggalkembali" value={this.state.sel} />
                  <FormText color="muted">Tanggal pengembalian</FormText>

                </FormGroup>

                {/* <FormGroup>
                        <Label htmlFor="jenisalat">Jenis</Label>
                        {this.renderOption(infoku.jenis)} 
                </FormGroup>

              <FormGroup>
<Label htmlFor="plat">Plat Alat</Label>
<Input type="select" name="plat" id="plat"  >
{ this.state.platjenis.map(platjenis => <option value={platjenis.plat}>{platjenis.plat}</option> )}
                      </Input>
</FormGroup> */}

<FormGroup>
<Label htmlFor="harga">Harga Sewa</Label>
<Input type="text" id="harga" value={this.state.har} onChange={this.handleChangehargasewa}/>
</FormGroup>

</form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toogleModal}>Batal</Button>
                  </ModalFooter>
               
                </Modal>
                )}
      </div>
    );
  }
}

export default Manifest;
