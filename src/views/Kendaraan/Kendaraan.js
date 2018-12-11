import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col,ListGroup,
   Collapse, ListGroupItem, Button,Fade,CardFooter, 
   Pagination, PaginationItem, 
   FormGroup, Label,Input,  FormText,
   PaginationLink, TabContent, TabPane,Nav, NavItem, NavLink,
   Row, Table, Modal, ModalBody, ModalFooter, ModalHeader,ButtonGroup, } from 'reactstrap';

   import axios from 'axios';

import ReactTable from "react-table";
import "react-table/react-table.css";
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pStyle = {
  fontSize: '15px',
  textAlign: 'left',
  width: '200px',
  margin: '5px'
};

class Tables extends Component {

  constructor(props) {
    super(props);

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.refreshdata = this.refreshdata.bind(this);
    
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.handleChangeLain = this.handleChangeLain.bind(this);
    this.toggletab = this.toggletab.bind(this);
    this.state = {
      success: false,
      activeTab: 1,
      collapse: true,
      accordion: [false, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      info: false,
      Lain: false,
      tombol:'Tutup',
      plat: '', 
      jenis: '',
      searchq:'',
      kendaraan:[],
      persons: [],
      dataku:[],
      infoku:[],
      data: [],
          loading: false,
          pages: -1,
          pagesize : '',
                              pageku : '',
                              sorted : '',
                              filter : ''
    };
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
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


  renderSwitch() {

    if(this.state.Lain==true){
      return <Input type="text" name="jenis" onChange={this.handleChangeLain} id="jenis" placeholder="Jenis Kendaraan Lain" />;
    }
  }
  
  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggle() {
    if(this.state.tombol == 'Tutup'){
      this.setState({ collapse: !this.state.collapse,tombol:'Buka' });
    }else{
      this.setState({ collapse: !this.state.collapse,tombol:'Tutup' });
    }
    
  }

  toggletab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/kendaraan/')
      .then(res => {
        const dataku = res.data;
        this.setState({ dataku });
      })

      axios.get('http://localhost:8000/api/kendaraan/')
      .then(res => {
        const dataku = res.data;
        this.setState({ dataku });
      })

      axios.get('http://localhost:8000/api/kendaraan/plat')
      .then(res => {
        const kendaraan = res.data;
        this.setState({ kendaraan });
      })

      console.log(this.state.persons)
  }

  componentSelect(id) {
    var sel = ''
    sel = id
    axios.get('http://localhost:8000/api/kendaraan/'+sel)
      .then(res => {
        console.log(" ini didmount"+res.data)
        const data = res.data;
        this.setState({ data });
      })

      console.log(this.state.persons)
  }

  refreshdata(){

    var bodyFormData = new FormData();
                              bodyFormData.set('length', 10);
                              bodyFormData.set('start', 1);
                              bodyFormData.set('kolom', 0);
    this.setState({
      loading: true,
    })

    axios.post('http://localhost:8000/api/kendaraanpage/',bodyFormData)
                                .then((res) => {
                                  var pag = Math.ceil(res.data.filtered/res.data.limit);
                                  // console.log("PAG "+pag)
                                  this.setState({
                                    dataku : res.data,
                                    data: res.data,
                                    pages: 20,
                                    loading: false
                                  })
                                })

  }

  handleChange1(e){
    this.setState({
      plat: e.target.value
    })
  }

  handleChangeLain(e){
    this.setState({
      jenis: e.target.value
    })
  }
  
  handleChange2(e){
    if (e.target.value == 'Lain'){
      this.setState({
        Lain: true
      })
    }else{
      this.setState({
        jenis: e.target.value,
        Lain: false
      })
    }
  }

  handleSearch(e){

    if (e.target.value == ''){
      // this.setState({ data : this.state.dataku });
      var bodyFormData = new FormData();
                              bodyFormData.set('length', this.state.pageSize);
                              bodyFormData.set('start', this.state.page);
                              bodyFormData.set('kolom', this.state.sorted);
                              bodyFormData.set('order.0.dir', 'ASC');
                              bodyFormData.set('search', this.state.filtered);    
                              axios.post('http://localhost:8000/api/kendaraanpage/',bodyFormData)
                                .then((res) => {
                                  var pag = Math.ceil(res.data.filtered/res.data.limit);
                                  // console.log("PAG "+pag)
                                  this.setState({
                                    dataku : res.data,
                                    data: res.data,
                                    pages: 20,
                                    loading: false
                                  })
                                })

    }else {
      this.componentSelect(e.target.value)
    }
   
    this.setState({
      searchq: e.target.value
    })
    
  }
  
  handleSubmit(e){
    e.preventDefault();
    const products = {
      plat: this.state.plat,
      jenis: this.state.jenis,
      status: 'Tersedia'
    }
    const self = this
    var bodyFormData = new FormData();
    bodyFormData.set('plat', products.plat);
    bodyFormData.set('jenis', products.jenis);
    bodyFormData.set('status', products.status);

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/kendaraan/',
      data: bodyFormData
    })
    .then(function (res) {
      self.state.data.push(res.data)
      self.setState({
        data : self.state.data
      });
    })
    
    axios.get('http://localhost:8000/api/kendaraan/plat')
    .then(res => {
      const kendaraan = res.data;
      this.setState({ kendaraan });
    })

    this.setState({
      success: !this.state.success,
    });

    this.notify("Kendaraan Berhasil Ditambahkan!")
  }

  handleDelete(index){
    // e.preventDefault();
    const self = this
    axios({
      method: 'delete',
      url: 'http://localhost:8000/api/kendaraan/'+index,
    })
    const data = self.state.data.filter(prod => prod.id !== index)
    self.setState({data})

    axios.get('http://localhost:8000/api/kendaraan/plat')
    .then(res => {
      const kendaraan = res.data;
      this.setState({ kendaraan });
    })
   this.notifydel("Data Berhasil Dihapus!") 
  }

  toggleInfo(id) {
    var sel = ''
    sel = id
    axios.get('http://localhost:8000/api/pemeliharaan/plat/'+sel)
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

    const { dataku } = this.state;
    const { data } = this.state;
    const { persons } = this.state;
    const { searchq } = this.state;

    var bodyFormData = new FormData();

    return (
      <div className="animated fadeIn">
        <Row>
        <ToastContainer />
          <Col xs="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Kendaraan
              </CardHeader>
              <CardBody>
              <ButtonGroup >
              <input type="text" style={pStyle} className="form-control col-md-6" placeholder="Pencarian" onChange={this.handleSearch.bind(this)}/>
              <Button  color="default" className="cui-cloud-download icons font-1xl" onClick={this.refreshdata} ></Button>
                </ButtonGroup>

               <ReactTable
                       data={data}
                       columns={[
                             {
                               Header: "Plat",
                               accessor: "plat"
                             },
                             {
                               Header: "Jenis",
                               accessor: "jenis"
                              },
                              {
                                Header: "Status",
                                accessor: "status"
                               },
                               {
                                Header: 'Aksi',
                                accessor: "id",
                                Cell: row => (
                                    <div>
                                      <ButtonGroup size="sm">
                                        <Button  color="danger" className="cui-trash icons font-1xl  " onClick={this.handleDelete.bind(this,row.original.id)}></Button>
                                        <Button  color="info" className="cui-graph icons font-1xl  " onClick={this.toggleInfo.bind(this,row.original.plat)} ></Button>
                                       </ButtonGroup>
                                    </div>
                                )
                             }
                            ]}
                            pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                            loading={this.state.loading}
                            defaultPageSize={10}
                            pageSizeOptions={[5, 10, 20, 25, 50]}
                            manual // informs React Table that you'll be handling sorting and pagination server-side
                            onFetchData={(state, instance) => {
                              bodyFormData = new FormData();
                              bodyFormData.set('length', state.pageSize);
                              bodyFormData.set('start', state.page);
                              bodyFormData.set('kolom', state.sorted);
                              bodyFormData.set('order.0.dir', 'ASC');
                              bodyFormData.set('search', state.filtered);
                              console.log("ini state tablenya "+state.pageSize+" page : "+state.page+" sorted : "+state.sorted+" filtered :"+state.filtered)
                              // show the loading overlay
                              this.setState({loading: true,
                              pagesize : state.pageSize,
                              pageku : state.page,
                              sorted : state.sorted,
                              filter : state.filtered
                              })
                              // fetch your data
                                
                              axios.post('http://localhost:8000/api/kendaraanpage/',bodyFormData)
                                .then((res) => {
                                  var pag = Math.ceil(res.data.filtered/res.data.limit);
                                  // console.log("PAG "+pag)
                                  this.setState({
                                    dataku : res.data,
                                    data: res.data,
                                    pages: 20,
                                    loading: false
                                  })
                                })
                            }}
                     
                     />
              </CardBody>
            </Card>
          </Col>

     <Col sm="12" xl="4">
     <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Jenis Kendaraan</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/collapse/" rel="noreferrer noopener" target="_blank" className="card-header-action">
              
                  </a>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <CardBody>
                <ListGroup>
{ this.state.kendaraan.map(kendaraan => <ListGroupItem className="justify-content-between">{kendaraan.jenis}<Badge className="float-right" pill
color="warning">{kendaraan.total}</Badge></ListGroupItem>)}
                </ListGroup>
                </CardBody>
              </Collapse>
              <CardFooter>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.state.tombol}</Button>
                <Button color="success" onClick={this.toggleSuccess} style={{ marginBottom: '1rem',left: '5rem' }}>Tambah</Button>
                {/* <h5>Current state: {this.state.status}</h5> */}
              </CardFooter>
            </Card>
          
          </Col>        

 {/* MODAL */}
 <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleInfo}>Modal title</ModalHeader>
                  <ModalBody>
                   
      <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                    { this.state.infoku.map(infoku => <ListGroupItem onClick={() => this.toggletab(infoku.id)} action active={this.state.activeTab === infoku.id} >{infoku.tgl_mulai}</ListGroupItem> )}
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                    { this.state.infoku.map(infoku => <TabPane tabId={infoku.id} >
                   
                   {/* START ACCORDION */}

                      <div id="accordion">
                      <div className="bd-example">
              <dl className="row">
                <dt className="col-sm-3">Odometer :</dt>
                <dd className="col-sm-9">{infoku.odometer} Km</dd>
                <dt className="col-sm-3">Keterangan : </dt>
                <dd className="col-sm-9">
                  <p>{infoku.keterangan}</p>
                </dd>
              </dl>
            </div>
                  <Card>
                    <CardHeader id="headingOne">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                        <h5 className="m-0 p-0">Bahan Bakar</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                      <FormGroup>
<Label htmlFor="jenis_bb">Jenis Bahan Bakar</Label>
<Input type="text" value={infoku.jenis_bb} name="harga_bb" id="harga_bb"  placeholder="Rp." />
</FormGroup>

<FormGroup>
<Label htmlFor="harga_bb">Harga/liter</Label>
<Input type="text" value={infoku.harga_bb} name="harga_bb" id="harga_bb"  placeholder="Rp." />
</FormGroup>

<FormGroup>
<Label htmlFor="jumlah_bb">Jumlah Liter</Label>
<Input type="text" value={infoku.jumlah_bb} id="jumlah_bb" name="jumlah_bb" placeholder="l." />
</FormGroup>

<FormGroup>
<Label htmlFor="totalharga">Total Harga</Label>
<Input type="text"id="totalharga"  value={(infoku.jumlah_bb*infoku.harga_bb)} placeholder="Rp." />
</FormGroup>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingTwo">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0">Service</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                      <CardBody>

                      <FormGroup>
<Label htmlFor="tipe_service">Tipe Service  </Label>
<Input type="text" value={infoku.tipe_service} name="harga_bb" id="harga_bb"  placeholder="Rp." />
</FormGroup>

<FormGroup>
<Label htmlFor="harga_service">Harga Service </Label>
<Input value={infoku.harga_service} type="text" name="harga_service" id="harga_service"  placeholder="Rp." />
</FormGroup>


                <FormGroup>
                  <Label htmlFor="tgl_mulai">Masa Service</Label>
                  <Input type="date" value={infoku.tgl_mulai} id="tgl_mulai" name="tgl_mulai" placeholder="date" />
                  <FormText color="muted">Tanggal Mulai</FormText>
                </FormGroup>

                   <FormGroup>
                  <Input type="date" value={infoku.tgl_selesai} id="tgl_selesai" name="tgl_selesai" placeholder="date" />
                  <FormText color="muted">Tanggal Selesai</FormText>
                </FormGroup>

                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingThree">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                        <h5 className="m-0 p-0">Suku Cadang</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                        
                      <FormGroup>
                  <Label htmlFor="suku_cadang">Jenis Suku Cadang</Label>
                   <Input type="text" value={infoku.suku_cadang} name="suku_cadang" id="suku_cadang" rows="6"
                             placeholder="Suku Cadang" />
                  </FormGroup>

<FormGroup>
<Label htmlFor="harga_suku">Harga Suku Cadang </Label>
<Input type="text"  value={infoku.harga_suku} id="harga_suku" name="harga_suku" placeholder="Rp." />
</FormGroup>

                        </CardBody>
                    </Collapse>
                  </Card>
                </div>

                {/* END OF ACCORDION */}
                      </TabPane> )}
                      
                    </TabContent>
                  </Col>
                </Row>
                

                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleInfo}>Keluar</Button>{' '}
                  </ModalFooter>
                </Modal>

                {/* MODAL TAMBAH KENDARAAN */}


                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Tambah Kendaraan</ModalHeader>
                  <ModalBody>
                  <form onSubmit={this.handleSubmit}>
                  <FormGroup>
                  <Label htmlFor="Plat">Plat</Label>
                  <Input type="text" id="Plat" onChange={this.handleChange1} placeholder="Plat Kendaraan" />
                </FormGroup>
                <FormGroup>
                        <Label htmlFor="Jenis">Jenis</Label>
                        <Input type="select" name="jenis" onChange={this.handleChange2} id="jenis">
      <option selected="selected"  value="Mobil">Mobil</option>
      <option value="Motor">Motor</option>
      <option value="Truk">Truk</option>
      <option value="Eskavator">Eskavator</option> value={this.state.suku_cadang}
      <option value="Stomp">Stomp</option>
      <option value="Lain">Pilihan Lain</option>
   </Input>
                </FormGroup>

<FormGroup> 
 {this.renderSwitch()}
</FormGroup>
               
                
              {/* <button className="btn btn-primary">Add Item</button> */}
         
</form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.handleSubmit}>Simpan</Button>{' '}
                    <Button color="secondary" onClick={this.toggleSuccess}>Batal</Button>
                  </ModalFooter>
                </Modal>
        </Row>
      </div>

    );
  }
}

export default Tables;
