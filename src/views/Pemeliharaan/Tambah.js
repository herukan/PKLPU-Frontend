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
  InputGroupText,
  Label,ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Row,TabContent, TabPane,Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const divStyle = {
  margin: '20px',
};
const pStyle = {
  fontSize: '15px',
  textAlign: 'center'
};


class Forms extends Component {
  togglegroup(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.onJenisChange = this.onJenisChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.handleChangeLain = this.handleChangeLain.bind(this);
    this.onChangeService = this.onChangeService.bind(this);
    this.resetform = this.resetform.bind(this);
    
    this.state = {
      activeTab: '1',
      name: '',
      shareholders: [{ name: '', harga: '' , plat: '' , jenis: '' }],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      kendaraan: [],
      platpil: [],
      Lain: false,
      plat:'',
      jenis:'',
      odometer:'',
      keterangan:'',
      jenis_bb:'',
      harga_bb:'',
      jumlah_bb:'',
      tipe_service:'',
      harga_service:'',
      tgl_mulai:'',
      tgl_selesai:'',
      suku_cadang:'',
      harga_suku:'',
      total:'',
      optionsState:''
    };
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

      axios.get('http://localhost:8000/api/kendaraan/plat')
      .then(res => {
        const kendaraan = res.data;
        this.setState({ kendaraan });
      })
      }

      renderSwitch() {
        if(this.state.Lain==true){
          return <Input type="text" onChange={this.handleChangeLain} name="tipe_service"  id="tipe_service" placeholder="Jenis Service Lain" />;
        }
      }

      handleChangeLain(e){
        this.setState({
          tipe_service: e.target.value
        })
      }


      onChangeService(e) {
        if (e.target.value == 'Lain' ){
          this.setState({
            Lain: true
          })
        }else{
          this.setState({
            [e.target.name]: e.target.value,total:this.state.harga_bb*this.state.jumlah_bb,
            Lain: false
          })
        }
    }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,total:this.state.harga_bb*this.state.jumlah_bb,
      Lain: false
    })
}

  onJenisChange(e) {
    
   axios.get('http://localhost:8000/api/kendaraan/jenis/'+e.target.value)
      .then(res => {
        const platpil = res.data;
        this.setState({ platpil});
      })

      this.setState({jenis: e.target.value})
  }

  toggleTABKU(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  resetform(e){

    this.setState({ 
      plat:'',
      jenis:'',
      odometer:'',
      keterangan:'',
      jenis_bb:'',
      harga_bb:'',
      jumlah_bb:'',
      tipe_service:'',
      harga_service:'',
      tgl_mulai:'',
      tgl_selesai:'',
      suku_cadang:'',
      harga_suku:'',
      total:'', });

  }

  handleSubmit(e){
    e.preventDefault();

    const requestBody = {
      plat: this.state.plat,
      jenis : this.state.jenis,
      odometer: this.state.odometer,
      keterangan: this.state.keterangan,
      jenis_bb: this.state.jenis_bb,
      harga_bb: this.state.harga_bb,
      jumlah_bb: this.state.jumlah_bb,
      tipe_service: this.state.tipe_service,
      harga_service:this.state.harga_service,
      tgl_mulai:this.state.tgl_mulai,
      tgl_selesai: this.state.tgl_selesai,
      suku_cadang: this.state.suku_cadang,
      harga_suku: this.state.harga_suku,
    }
  
    axios.post('http://localhost:8000/api/pemeliharaan/',requestBody)
    .then(res => {
    })

    this.notify("Data Berhasil Ditambahkan!")

  }

  handlealert = (evt) => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${shareholders[1].jenis} with ${shareholders[1].plat} shareholders ${shareholders[1].harga} and ${shareholders[1].name} `);
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <ToastContainer />
            <Col xs="12" sm="6" md="12">
            <Card className="border-info">
              <CardHeader>
              <h4>Tambah Data Pemeliharaan</h4>
              </CardHeader>
              <CardBody>
              <Col sm="8">
                      

              <FormGroup >
<Label htmlFor="jenisalat">Jenis</Label>
<InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-dashboard"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={(value) => this.onJenisChange(value)} name="jen"  id="jen">
                        { this.state.kendaraan.map(kendaraan => <option value={kendaraan.jenis}>{kendaraan.jenis}</option>)}
                      </Input>
                      </InputGroup>
</FormGroup>

              <FormGroup>
<Label htmlFor="jenisalat">Plat Nomor</Label>
<InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(value) => this.onChange(value)} type="select" name="plat"  id="plat">
                        { this.state.platpil.map(platpil => <option value={platpil.plat}>{platpil.plat}</option>)}
                      </Input>
                      </InputGroup>
</FormGroup>

<FormGroup>
<Label htmlFor="odometer">Odometer </Label>
<Input type="text" onChange={(value) => this.onChange(value)} id="odometer" name="odometer"  placeholder="Km." />
</FormGroup>

<FormGroup>
                  <Label htmlFor="catatan">keterangan</Label>
                   <Input type="textarea" onChange={(value) => this.onChange(value)} name="keterangan" id="keterangan" rows="6"
                             placeholder="Keterangan Pemeliharaan" />
                </FormGroup>

</Col>
<Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTABKU('1'); }}
                >
                  <i className="icon-basket-loaded"></i> <span className={this.state.activeTab === '1' ? '' : 'd-none'}> Bahan Bakar </span>{'\u00A0'}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggleTABKU('2'); }}
                >
                  <i className="icon-wrench"></i> <span
                  className={this.state.activeTab === '2' ? '' : 'd-none'}> Service </span>{'\u00A0'}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggleTABKU('3'); }}
                >
                  <i className="icon-speedometer"></i> <span className={this.state.activeTab === '3' ? '' : 'd-none'}> Suku Cadang </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">

              {/* ISI TAB 1  */}
              <FormGroup>
<Label htmlFor="jenis_bb">Jenis Bahan Bakar</Label>
<Input onChange={(value) => this.onChange(value)} type="select" name="jenis_bb"  id="jenis_bb">
<option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Ethanol">Ethanol</option>
                        <option value="Premium">Premium</option>
                        <option value="Pertalite">Pertalite</option>
                        <option value="Pertamax">Pertamax</option>
                        <option value="Pertamax Plus">Pertamax Plus</option>
                        <option value="LPG">LPG</option>
                      </Input>
</FormGroup>

<FormGroup>
<Label htmlFor="harga_bb">Harga/liter</Label>
<Input onChange={(value) => this.onChange(value)} type="text" name="harga_bb" id="harga_bb"  placeholder="Rp." />
</FormGroup>

<FormGroup>
<Label htmlFor="jumlah_bb">Jumlah Liter</Label>
<Input type="text" onChange={(value) => this.onChange(value)} id="jumlah_bb"   name="jumlah_bb" placeholder="l." />
</FormGroup>

<FormGroup>
<Label htmlFor="totalharga">Total Harga</Label>
<Input type="text" value={(this.state.harga_bb*this.state.jumlah_bb)} id="totalharga"  disabled placeholder="Rp." />
</FormGroup>

              </TabPane>
              <TabPane tabId="2">

              <FormGroup>
<Label htmlFor="tipe_service">Tipe Service  </Label>
<Input type="select" onChange={(value) => this.onChangeService(value)} name="tipe_service"  id="tipe_service">
<option value="AC">AC</option>
                        <option value="Air Filter">Air Filter</option>
                        <option value="Battery">Battery</option>
                        <option value="Belts">Belts</option>
                        <option value="Body/Chassis">Body/Chassis</option>
                        <option value="Brake Fluids">Brake Fluids</option>
                        <option value="Brake Pads">Brake Pads</option>
                        <option value="Brake Replacement">Brake Replacement</option>
                        <option value="Cabin Air Filter">Cabin Air Filter</option>
                        <option value="Cluth Fluid">Cluth Fluid</option>
                        <option value="Clutch System">Clutch System</option>
                        <option value="Cooling System">Cooling System</option>
                        <option value="Engine Repair">Engine Repair</option>
                        <option value="Exhaust System">Exhaust System</option>
                        <option value="Fuel Pump">Fuel Pump</option>
                        <option value="Glass/Mirror">Glass/Mirror</option>
                        <option value="Heating System">Heating System</option>
                        <option value="Horn">Horn</option>
                        <option value="Inspection">Inspection</option>
                        <option value="Labor Cost">Labor Cost</option>
                        <option value="Lights">Lights</option>
                        <option value="Tires">Tires</option>
                        <option value="Oil Change">Oil Change</option>
                        <option value="Oil Filter">Oil Filter</option>
                        <option value="Radiator">Radiator</option>
                        <option value="Seat Belts3">Seat Belts</option>
                        <option value="Steering System">Steering System</option>
                        <option value="Suspension System">Suspension System</option>
                        <option value="Technical Control">Technical Control</option>
                        <option value="Tire Presure">Tire Presure</option>
                        <option value="Transmission Fluid">Transmission Fluid</option>
                        <option value="Windshield Wiper">Windshield Wiper</option>
                        <option value="Lain">Pilihan Lain</option>
                      </Input>
</FormGroup>

<FormGroup> 
 {this.renderSwitch()}
</FormGroup>

<FormGroup>
<Label htmlFor="harga_service">Harga Service </Label>
<Input onChange={(value) => this.onChange(value)} type="text" name="harga_service" id="harga_service"  placeholder="Rp." />
</FormGroup>


                <FormGroup>
                  <Label htmlFor="tgl_mulai">Masa Service</Label>
                  <Input type="date" onChange={(value) => this.onChange(value)} id="tgl_mulai" name="tgl_mulai" placeholder="date" />
                  <FormText color="muted">Tanggal Mulai</FormText>
                </FormGroup>

                   <FormGroup>
                  <Input type="date" onChange={(value) => this.onChange(value)} id="tgl_selesai" name="tgl_selesai" placeholder="date" />
                  <FormText color="muted">Tanggal Selesai</FormText>
                </FormGroup>

              </TabPane>
              <TabPane tabId="3">
              <FormGroup>
                  <Label htmlFor="suku_cadang">Jenis Suku Cadang</Label>
                   <Input type="text" onChange={(value) => this.onChange(value)} name="suku_cadang" id="suku_cadang" rows="6"
                             placeholder="Suku Cadang" />
                </FormGroup>

<FormGroup>
<Label htmlFor="harga_suku">Harga Suku Cadang </Label>
<Input type="text"  onChange={(value) => this.onChange(value)} id="harga_suku" name="harga_suku" placeholder="Rp." />
</FormGroup>

    < Button onClick={this.handleSubmit} block outline color="primary"  >SIMPAN</Button>
              </TabPane>
            </TabContent>
              </CardBody>
            </Card>
          </Col>
          
               
        </Row>
      </div>
    );
  }
}

export default Forms;
