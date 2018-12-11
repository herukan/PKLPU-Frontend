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
  ButtonGroup,
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
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import axios from "axios";

import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const qualityType = {
  0: "good",
  1: "bad",
  2: "unknown"
};

const pStyle = {
  fontSize: "15px",
  textAlign: "left",
  width: "200px"
};

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

function dateFormatter(cell, row) {
  return `${("0" + cell.getDate()).slice(-2)}/${(
    "0" +
    (cell.getMonth() + 1)
  ).slice(-2)}/${cell.getFullYear()}`;
}

const satisfaction = [0, 1, 2, 3, 4, 5];

class MPemeliharaan extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      info: false,
      searchq: "",
      persons: [],
      dataku: [],
      infoku: [],
      data: [],
      loading: false,
      pages: -1,
      odometer: "",
      keterangan: "",
      jenis_bb: "",
      harga_bb: "",
      jumlah_bb: "",
      tipe_service: "",
      harga_service: "",
      tgl_mulai: "",
      tgl_selesai: "",
      suku_cadang: "",
      harga_suku: ""
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

  togglegroup(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleTABKU(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/pemeliharaan/").then(res => {
      console.log(" ini didmount" + res.data);
      const data = res.data;
      this.setState({ data, dataku: data });
    });

    console.log(this.state.data);
  }

  componentSelect(id) {
    var sel = "";
    sel = id;
    axios.get("http://localhost:8000/api/pemeliharaan/" + sel).then(res => {
      console.log(" ini didmount" + res.data);
      const data = res.data;
      this.setState({ data });
    });

    console.log(this.state.persons);
  }

  handleChange1(e) {
    this.setState({
      productName: e.target.value
    });
  }
  handleChange2(e) {
    this.setState({
      productPrice: e.target.value
    });
  }

  handleSearch(e) {
    if (e.target.value == "") {
      axios.get("http://localhost:8000/api/pemeliharaan/").then(res => {
        console.log(" ini didmount" + res.data);
        const data = res.data;
        this.setState({ data, dataku: data });
      });

      // this.setState({ data : this.state.dataku });
    } else {
      this.componentSelect(e.target.value);
    }

    this.setState({
      searchq: e.target.value
    });
  }

  handleEdit(e) {
    e.preventDefault();

    const requestBody = {
      plat: this.state.infoku[0].plat,
      jenis: this.state.infoku[0].jenis,
      odometer: this.state.odometer,
      keterangan: this.state.keterangan,
      jenis_bb: this.state.jenis_bb,
      harga_bb: this.state.harga_bb,
      jumlah_bb: this.state.jumlah_bb,
      tipe_service: this.state.tipe_service,
      harga_service: this.state.harga_service,
      tgl_mulai: this.state.tgl_mulai,
      tgl_selesai: this.state.tgl_selesai,
      suku_cadang: this.state.suku_cadang,
      harga_suku: this.state.harga_suku
    };

    const config = {
      body: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axios
      .put(
        "http://localhost:8000/api/pemeliharaan/" + this.state.infoku[0].id,
        requestBody,
        config
      )
      .then(res => {
        console.log(" ini didmount" + res.data);
        // const data = res.data;
        // this.setState({ data,
        // dataku : data});
      });

    this.setState({
      info: !this.state.info
    });

    this.notify("Edit Data Berhasil!");
  }

  handleSubmit(e) {
    e.preventDefault();
    const products = {
      nama: this.state.productName,
      alamat: this.state.productPrice
    };

    const self = this;

    var bodyFormData = new FormData();
    bodyFormData.set("nama", products.nama);
    bodyFormData.set("alamat", products.alamat);

    axios({
      method: "post",
      url: "http://localhost:8000/api/pemeliharaan/",
      data: bodyFormData
    }).then(function(res) {
      console.log(res.data);
      self.state.persons.push(res.data);
      self.state.data.push(res.data);
      self.setState({
        data: self.state.data,
        persons: self.state.persons
      });
    });
  }

  handleDelete(index) {
    // e.preventDefault();
    const self = this;
    axios({
      method: "delete",
      url: "http://localhost:8000/api/pemeliharaan/" + index
    });

    const data = self.state.data.filter(prod => prod.id !== index);
    self.setState({ data });

    this.notifydel("Data Terhapus!");
  }

  toggleInfo(id) {
    var sel = "";
    sel = id;
    axios.get("http://localhost:8000/api/pemeliharaan/" + sel).then(res => {
      console.log(" ini didmount" + res.data);
      const infoku = res.data;
      this.setState({ infoku });
    });

    this.setState({
      info: !this.state.info
    });
  }

  handlerClickCleanFiltered() {
    this.refs.name1.cleanFiltered();
    this.refs.name2.cleanFiltered();
    this.refs.quality.cleanFiltered();
    this.refs.price.cleanFiltered();
    this.refs.satisfaction.cleanFiltered();
    this.refs.inStockDate.cleanFiltered();
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleEdit(data, id) {
    var sel = "";
    sel = id;
    axios.get("http://localhost:8000/api/pemeliharaan/" + sel).then(res => {
      console.log(" ini didmount" + res.data);
      const infoku = res.data;
      this.setState({
        infoku: res.data,
        info: !this.state.info,
        detail: data,
        odometer: res.data[0].odometer,
        keterangan: res.data[0].keterangan,
        jenis_bb: res.data[0].jenis_bb,
        harga_bb: res.data[0].harga_bb,
        jumlah_bb: res.data[0].jumlah_bb,
        tipe_service: res.data[0].tipe_service,
        harga_service: res.data[0].harga_service,
        tgl_mulai: res.data[0].tgl_mulai,
        tgl_selesai: res.data[0].tgl_selesai,
        suku_cadang: res.data[0].suku_cadang,
        harga_suku: res.data[0].harga_suku
      });
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
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
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Kendaraan
              </CardHeader>
              <CardBody>
                {/* <Button style={pStyle} block outline color="primary"  > SIMPAN </Button> */}

                <input
                  type="text"
                  style={pStyle}
                  className="form-control col-md-6"
                  placeholder="Pencarian"
                  onChange={this.handleSearch.bind(this)}
                />
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: "Plat",
                      accessor: "plat",
                      width: 85
                    },
                    {
                      Header: "Jenis",
                      accessor: "jenis",
                      width: 70
                    },
                    {
                      Header: "Odometer",
                      accessor: "odometer",
                      width: 60
                    },
                    {
                      Header: "Jenis Bahan Bakar",
                      accessor: "jenis_bb",
                      width: 70
                    },
                    {
                      Header: "Harga Bahan Bakar",
                      accessor: "harga_bb",
                      width: 90
                    },
                    {
                      Header: "Jumlah Bahan Bakar",
                      accessor: "jumlah_bb",
                      width: 50
                    },
                    {
                      Header: "Tipe Service",
                      accessor: "tipe_service",
                      width: 80
                    },
                    {
                      Header: "Harga Service",
                      accessor: "harga_service",
                      width: 90
                    },
                    {
                      Header: "Mulai Service",
                      accessor: "tgl_mulai",
                      width: 100
                    },
                    {
                      Header: "Selesai Service",
                      accessor: "tgl_selesai",
                      width: 100
                    },
                    {
                      Header: "Suku Cadang",
                      accessor: "suku_cadang",
                      width: 80
                    },
                    {
                      Header: "Harga Suku Cadang",
                      accessor: "harga_suku",
                      width: 70
                    },
                    {
                      Header: "Aksi",
                      accessor: "id",
                      width: 70,
                      Cell: row => (
                        <div>
                          <ButtonGroup size="sm">
                            <Button
                              color="danger"
                              className="cui-trash icons font-1xl  "
                              onClick={this.handleDelete.bind(
                                this,
                                row.original.id
                              )}
                            />
                            <Button
                              color="primary"
                              className="cui-note icons font-1xl  "
                              onClick={this.toggleEdit.bind(
                                this,
                                row.original,
                                row.original.id
                              )}
                            />
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
        <Modal
          isOpen={this.state.info}
          toggle={this.toggleInfo}
          className={"modal-warning " + this.props.className}
        >
          <ModalHeader toggle={this.toggleInfo}>Modal title</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="odometer">Odometer</Label>
              <Input
                type="text"
                value={this.state.odometer}
                onChange={value => this.onChange(value)}
                name="odometer"
                id="odometer"
                placeholder="Odometer (KM)"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="alamat">keterangan</Label>
              <Input
                type="textarea"
                value={this.state.keterangan}
                onChange={value => this.onChange(value)}
                name="keterangan"
                id="keterangan"
                rows="6"
                placeholder="keterangan"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="jumlah_bb">Jumlah Bahan Bakar</Label>
              <Input
                type="text"
                value={this.state.jumlah_bb}
                onChange={value => this.onChange(value)}
                name="jumlah_bb"
                id="jumlah_bb"
                rows="6"
                placeholder="Jumlah Bahan Bakar"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="jenis_bb">Jenis Bahan Bakar</Label>
              <Input
                type="select"
                value={this.state.jenis_bb}
                onChange={value => this.onChange(value)}
                name="jenis_bb"
                id="jenis_bb"
              >
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
              <Label htmlFor="harga_bb">Harga Bahan Bakar</Label>
              <Input
                type="text"
                value={this.state.harga_bb}
                onChange={value => this.onChange(value)}
                name="harga_bb"
                id="harga_bb"
                rows="6"
                placeholder="Harga Bahan Bakar (Rp)"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="tipe_service">Tipe Service </Label>
              <Input
                type="select"
                value={this.state.tipe_service}
                onChange={value => this.onChange(value)}
                name="tipe_service"
                id="tipe_service"
              >
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
              </Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="harga_service">Harga Service</Label>
              <Input
                type="text"
                value={this.state.harga_service}
                onChange={value => this.onChange(value)}
                name="harga_service"
                id="harga_service"
                rows="6"
                placeholder="Harga Service (Rp)"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="tgl_mulai">Masa Service</Label>
              <Input
                type="date"
                value={this.state.tgl_mulai}
                onChange={value => this.onChange(value)}
                id="tgl_mulai"
                name="tgl_mulai"
                placeholder="date"
              />
              <FormText color="muted">Tanggal mulai</FormText>
            </FormGroup>

            <FormGroup>
              <Input
                type="date"
                value={this.state.tgl_selesai}
                onChange={value => this.onChange(value)}
                id="tgl_selesai"
                name="tgl_selesai"
                placeholder="date"
              />
              <FormText color="muted">Tanggal Selesai</FormText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="suku_cadang">Jenis Suku Cadang</Label>
              <Input
                type="text"
                value={this.state.suku_cadang}
                onChange={value => this.onChange(value)}
                name="suku_cadang"
                id="suku_cadang"
                rows="6"
                placeholder="Suku Cadang"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="harga_suku">Harga Suku Cadang</Label>
              <Input
                type="text"
                value={this.state.harga_suku}
                onChange={value => this.onChange(value)}
                name="harga_suku"
                id="harga_suku"
                rows="6"
                placeholder="Harga Suku Cadang (Rp)"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleEdit}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleInfo}>
              Batal
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MPemeliharaan;
