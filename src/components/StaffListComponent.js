import React, { Component } from 'react';
import { Card, CardText, CardImg, Input, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form';
import { STAFFS } from '../shared/staff'
import './style.css'
import { Loading } from './LoadingComponent'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
 
export const newStaff = {
    name: '',
    doB: '',
    salaryScale: null,
    startDate: '',
    department: null,
    annualLeave: null,
    overTime: null,
    salary: null,
    image: '/assets/images/alberto.png',
}

class StaffList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            isModalOpen: false,
            doB: '',
            startDate: '',
            staffs: STAFFS                
        }
        this.handleInputSearch = this.handleInputSearch.bind(this)
        this.renderSearch = this.renderSearch.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleInputDate = this.handleInputDate.bind(this)
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen})
    }

    handleSubmit(values) {

        newStaff.id = this.state.staffs.length 
        newStaff.name = values.name
        newStaff.doB = this.state.doB
        newStaff.salaryScale = values.salaryScale
        newStaff.startDate = this.state.startDate
        newStaff.department = values.department
        newStaff.annualLeave = Number(values.annualLeave)
        newStaff.overTime = Number(values.overTime)
        newStaff.salary = Math.trunc(values.salaryScale * 3000000 + values.overTime * 200000)
        newStaff.image = '/assets/images/alberto.png'
        
        console.log(newStaff)
        this.state.staffs.push(newStaff)

        localStorage.setItem('newStaff', JSON.stringify(this.state.staffs))
        this.toggleModal();
        return newStaff
    }

    handleInputSearch() {
        this.setState({ 
            search: this.search.value
            })
    }
    handleInputDate(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        });
    }

    renderSearch(staffs) {
        const listStaffsSearch = staffs.filter(staff => staff.name.toLowerCase().includes(this.state.search))
        return listStaffsSearch.map(staff =>{
            return (
                <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-3">
                    <Card>
                        <Link to={`/staffs/${staff.id}`} className="link-item">
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardText className="text-center">{staff.name}</CardText>
                        </Link>
                        <Button color="danger" className="btn-custom"><i className="fa fa-trash" aria-hidden="true"></i></Button>
                    </Card>
                </div>
            )
        })
    }

    render() {
        const listStaffs = this.props.staffs.map(staff =>{
            return (
                <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-3">
                    <Card>
                        <Link to={`/staffs/${staff.id}`} className="link-item">
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardText className="text-center">{staff.name}</CardText>
                        </Link>
                        <Button color="danger" className="btn-custom"><i className="fa fa-trash" aria-hidden="true"></i></Button>
                    </Card>
                </div>
            )
        })
        if (this.props.staffsLoading) {
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.staffsErrMess) {
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.staffsErrMess}</h4>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container bg-custom">
                    <div className="row pt-2">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <h3>Menu</h3>
                                </div>
                                <div className="col-12 col-md-2">
                                    <Button onClick={this.toggleModal} color="dark">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </Button>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-9 col-md-8">
                                            <Input type="text" width="30%" id="search" name="search" 
                                            placeholder="Nh???p t??n nh??n vi??n" 
                                            innerRef={(input) => this.search = input} />
                                        </div>
                                        <div className="col-3 col-md-4">
                                            <Button color="primary" type="submit" onClick={this.handleInputSearch}>T??m</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {this.state.search ? this.renderSearch(this.props.staffs) : listStaffs}
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Th??m nh??n vi??n
                    </ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="p-3">
                            <Row className="form-group">
                                <Label htmlFor="name" md={5}>T??n</Label>
                                <Col md={7}>
                                    <Control.text model=".name" name="name" placeholder="Nh???p t??n" id="name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Y??u c???u nh???p',
                                            minLength: 'Y??u c???u nhi???u h??n 2 k?? t???',
                                            maxLength: 'Y??u c???u ??t h??n 30 k?? t???'
                                        }}
    
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={5}>Ng??y sinh</Label>
                                <Col md={7}>
                                    <Control type="date" model=".doB" name="doB" placeholder="Nh???p t??n" id="doB" className="form-control"
                                        value={this.state.doB}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Y??u c???u nh???p'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={5}>Ng??y v??o c??ng ty</Label>
                                <Col md={7}>
                                    <Control type="date" model=".startDate" name="startDate" placeholder="Nh???p t??n" id="startDate" className="form-control"
                                        value={this.state.startDate}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Y??u c???u nh???p'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={5}>Ph??ng ban</Label>
                                <Col md={7}>
                                    <Control.select model=".department" name="department" placeholder="Nh???p t??n" id="department" className="form-control">
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={5}>H??? s??? l????ng</Label>
                                <Col md={7}>
                                    <Control.text model=".salaryScale" name="salaryScale" placeholder="Nh???p t??n" id="salaryScale" className="form-control"
                                        defaultValue={1}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={5}>S??? ng??y ngh??? c??n l???i</Label>
                                <Col md={7}>
                                    <Control.text model=".annualLeave" name="annualLeave" placeholder="Nh???p t??n" id="annualLeave" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={5}>S??? ng??y ???? l??m th??m</Label>
                                <Col md={7}>
                                    <Control.text model=".overTime" name="overTime" placeholder="Nh???p t??n" id="overTime" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Th??m</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            )
        }
    } 
}

export default StaffList;