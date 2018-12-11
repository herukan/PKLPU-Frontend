import React, { Component } from "react";
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
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  TabContent,
  TabPane
} from "reactstrap";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    this.toggleFade = this.toggleFade.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onJenisChange = this.onJenisChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      activeTab: 0,
      name: "",
      shareholders: [{ name: "", harga: "", plat: "", jenis: "" }],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      nama: "",
      instansi: "",
      alamat: "",
      perihal: "",
      harga: "",
      tgl_mulai: "",
      tgl_kembali: "",
      jenis: "",
      plat: "",
      Lain: false,
      status: "Tersedia",
      kendaraan: [],
      platpil: [],
      peminjam: [],
      datapeminjam: []
    };
  }

  notifydel = string => {
    toast.error(string, {
      position: toast.POSITION.BOTTOM_CENTER,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  notify = string => {
    toast.success(string, {
      position: toast.POSITION.BOTTOM_CENTER,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  componentDidMount() {
    axios.get("http://localhost:8000/api/kendaraan/plat").then(res => {
      const kendaraan = res.data;
      this.setState({ kendaraan });
    });

    axios.get("http://localhost:8000/api/peminjam/").then(res => {
      const peminjam = res.data;
      this.setState({ peminjam });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeInstansi(e) {
    this.setState({ instansi: e.target.value });
  }

  onChangeAlamat(e) {
    this.setState({ alamat: e.target.value });
  }

  onJenisChange(e) {
    axios
      .get("http://localhost:8000/api/kendaraan/jenis/" + e.target.value)
      .then(res => {
        const platpil = res.data;
        this.setState({ platpil });
      });
    this.setState({ jenis: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const requestBody = {
      nama: this.state.nama,
      instansi: this.state.instansi,
      alamat: this.state.alamat,
      perihal: this.state.perihal,
      tgl_mulai: this.state.tgl_mulai,
      tgl_kembali: this.state.tgl_kembali,
      jenis: this.state.jenis,
      plat: this.state.plat,
      harga: this.state.harga,
      status: this.state.status
    };

    axios
      .post("http://localhost:8000/api/peminjaman/", requestBody)
      .then(res => {});

    this.notify("Data Berhasil Ditambahkan!");
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleShareholderNameChangeHarga = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, harga: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleShareholderNameChangeplat = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, plat: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleShareholderNameChangejenis = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, jenis: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  // handleSubmit = (evt) => {
  //   const { name, shareholders } = this.state;
  //   alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  // }

  handlealert = evt => {
    const { name, shareholders } = this.state;
    alert(
      `Incorporated: ${shareholders[1].jenis} with ${
        shareholders[1].plat
      } shareholders ${shareholders[1].harga} and ${shareholders[1].name} `
    );
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
    this.setState({
      shareholders: this.state.shareholders.concat([{ harga: "" }])
    });
    this.setState({
      shareholders: this.state.shareholders.concat([{ plat: "" }])
    });
    this.setState({
      shareholders: this.state.shareholders.concat([{ jenis: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onPeminjamChange(e) {
    if (e.target.value == "Lain") {
      this.setState({
        Lain: true
      });
    } else {
      axios
        .get("http://localhost:8000/api/peminjam/" + e.target.value)
        .then(res => {
          const datapeminjam = res.data;
          this.setState({
            datapeminjam,
            alamat: res.data[0].alamat,
            instansi: res.data[0].instansi
          });
        });
      this.setState({ nama: e.target.value });
    }
  }
  
  renderSwitch() {
    if (this.state.Lain == true) {
      return (
        <Input
          type="text"
          name="nama"
          onChange={this.onChange}
          id="nama"
          placeholder="Masukan Peminjam Baru"
        />
      );
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <ToastContainer />
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                <strong>Tambah Peminjaman</strong>
                <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      <ListGroupItem
                        onClick={() => this.togglegroup(0)}
                        action
                        active={this.state.activeTab === 0}
                      >
                        Identitas
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => this.togglegroup(1)}
                        action
                        active={this.state.activeTab === 1}
                      >
                        Perihal
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => this.togglegroup(2)}
                        action
                        active={this.state.activeTab === 2}
                      >
                        Uraian
                      </ListGroupItem>
                      {/* <ListGroupItem onClick={() => this.togglegroup(3)} action active={this.state.activeTab === 3} >Settings</ListGroupItem> */}
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0}>
                        <FormGroup>
                          <Label htmlFor="nama">Peminjam</Label>
                          {/* <Input type="text" id="nama" name="nama" onChange={(value) => this.onChange(value)} placeholder="Nama Peminjam" /> */}
                          <Input
                            type="select"
                            onChange={value => this.onPeminjamChange(value)}
                            name="nama"
                            id="nama"
                          >
                            {this.state.peminjam.map(peminjam => (
                              <option value={peminjam.nama}>
                                {peminjam.nama}
                              </option>
                            ))}
                               <option value="Lain">Peminjam Baru</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>{this.renderSwitch()}</FormGroup>

                        <FormGroup>
                          <Label htmlFor="instansi">Instansi</Label>
                          <Input
                            type="text"
                            id="instansi"
                            name="instansi"
                            onChange={value => this.onChange(value)}
                            value={this.state.instansi}
                            placeholder="Instansi atau jabatan terkait"
                          />
                          {/* <Input type="text" onChange={(value) => this.onChange(value)} id="instansi" name="instansi" placeholder="Instansi atau jabatan terkait" /> */}
                          {/* <Input onChange={(value) => this.onChangeInstansi(value)} type="select" name="instansi"  id="instansi">
                        { this.state.datapeminjam.map(datapeminjam => <option value={datapeminjam.instansi}>{datapeminjam.instansi}</option>)}
                      </Input>                 */}
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="alamat">Alamat</Label>
                          {/* <Input type="textarea" onChange={(value) => this.onChange(value)} name="alamat" id="alamat" rows="6" placeholder="Alamat" /> */}
                          <Input
                            type="text"
                            id="alamat"
                            name="alamat"
                            onChange={value => this.onChange(value)}
                            value={this.state.alamat}
                            placeholder="Alamat"
                          />
                        </FormGroup>
                        <p>
                          Selanjutnya akan disebut <b>PIHAK KEDUA</b> (penyewa
                          alat).
                        </p>
                      </TabPane>
                      <TabPane tabId={1}>
                        <p>
                          Dengan ini kedua belah pihak sepakat mengadakan
                          perjanjian sewa menyewa peralatan antara{" "}
                          <b>PIHAK KESATU</b> selaku pemilik alat dan{" "}
                          <b>PIHAK KEDUA</b> selaku peminjam alat untuk perihal{" "}
                        </p>
                        <FormGroup>
                          <Label htmlFor="perihal">Perihal</Label>
                          <Input
                            type="textarea"
                            onChange={value => this.onChange(value)}
                            name="perihal"
                            id="perihal"
                            rows="6"
                            placeholder="Perihal peminjaman"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="tgl_mulai">Masa Penyewaan</Label>
                          <Input
                            type="date"
                            id="tgl_mulai"
                            onChange={value => this.onChange(value)}
                            name="tgl_mulai"
                            placeholder="date"
                          />
                          <FormText color="muted">Tanggal mulai sewa</FormText>
                        </FormGroup>

                        <FormGroup>
                          <Input
                            type="date"
                            id="tgl_kembali"
                            onChange={value => this.onChange(value)}
                            name="tgl_kembali"
                            placeholder="date"
                          />
                          <FormText color="muted">
                            Tanggal pengembalian
                          </FormText>
                        </FormGroup>
                      </TabPane>
                      <TabPane tabId={2}>
                        <h5>Uraian Jenis Alat yang dipinjam</h5>

                        {/* ISI ADD FORM */}
                        {/* {this.state.shareholders.map((shareholder, idx) => ( */}
                        <div className="shareholder">
                          <Fade
                            timeout={this.state.timeout}
                            in={this.state.fadeIn}
                          >
                            <Card>
                              <CardHeader>
                                Aset Kendaraan
                                <div className="card-header-actions">
                                  <a
                                    className="card-header-action btn btn-minimize"
                                    data-target="#collapseExample"
                                    onClick={this.toggle}
                                  >
                                    <i className="icon-arrow-up" />
                                  </a>
                                  {/* <a className="card-header-action btn btn-close" onClick={this.handleRemoveShareholder(idx)}><i className="icon-trash"></i></a> */}
                                </div>
                              </CardHeader>
                              <Collapse
                                isOpen={this.state.collapse}
                                id="collapseExample"
                              >
                                <CardBody>
                                  <FormGroup>
                                    <Label htmlFor="jenis">Jenis</Label>
                                    <Input
                                      type="select"
                                      name="jenis"
                                      onChange={value =>
                                        this.onJenisChange(value)
                                      }
                                      id="jenis"
                                    >
                                      <option value="">
                                        Pilih Jenis Kendaraan
                                      </option>
                                      {this.state.kendaraan.map(kendaraan => (
                                        <option value={kendaraan.jenis}>
                                          {kendaraan.jenis}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>

                                  <FormGroup>
                                    <Label htmlFor="plat">Plat Alat</Label>
                                    <Input
                                      type="select"
                                      name="plat"
                                      onChange={value => this.onChange(value)}
                                      id="plat"
                                    >
                                      <option value="0">
                                        Pilih Plat Tersedia
                                      </option>
                                      {this.state.platpil.map(platpil => (
                                        <option value={platpil.plat}>
                                          {platpil.plat}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>

                                  <FormGroup>
                                    <Label htmlFor="harga">Harga Sewa</Label>
                                    <Input
                                      type="text"
                                      id="harga"
                                      name="harga"
                                      placeholder="Rp."
                                      onChange={value => this.onChange(value)}
                                    />
                                  </FormGroup>

                                  {/* <FormGroup>
   <Input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />         
   </FormGroup> */}
                                </CardBody>
                              </Collapse>
                            </Card>
                          </Fade>
                        </div>

                        {/* <Button block outline color="success" onClick={this.handlealert} >Tes</Button> */}
                        {/* <Button block outline color="primary" type="button" onClick={this.handleAddShareholder} className="small">Tambah Aset</Button> */}
                        <Button
                          block
                          outline
                          color="success"
                          onClick={this.handleSubmit}
                        >
                          SUBMIT
                        </Button>
                      </TabPane>
                      {/* <TabPane tabId={3}>
                        <p>Irure enim occaecat labore sit qui aliquip reprehenderit amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi officia magna
                          sit occaecat laboris sunt dolor. Nisi eu minim cillum occaecat aute est cupidatat aliqua labore
                          aute occaecat ea aliquip sunt amet. Aute mollit dolor ut exercitation irure commodo non amet consectetur quis amet culpa. Quis ullamco
                          nisi amet qui aute irure eu. Magna labore dolor quis ex labore id nostrud deserunt dolor
                          eiusmod eu pariatur culpa mollit in irure.</p>
                      </TabPane> */}
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Forms;
