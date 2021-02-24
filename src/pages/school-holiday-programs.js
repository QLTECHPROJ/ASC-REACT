import React, {Component} from 'react';
import {Container,Breadcrumb,Col,Row,Card,Image} from 'react-bootstrap'
import Layout from "../components/layout"
import { Link } from 'gatsby'
import Footer from "../components/common/Footer"
import BottomForm from "../components/common/BottomForm"
import Campbanner from "../components/common/Campbanner"
import SHP from "../components/common/school-holiday-programs"
import card1 from '../images/card1.png'
import cardhover from '../images/card-hover-img.png'
import axios from 'axios';

class City extends Component {
	
	state = {
		PageData: [],
		result: 0,
		showInfo: 0
	}
	
	componentDidMount() {
		axios({
			url: 'https://shop.australiansportscamps.com.au/wp-json/newasc/v1/camp_partner',
			method: 'get'}).then(res => {

				
			this.setState({PageData: res.data.ResponseData})
			this.setState({result: 1})
			this.setState({showInfo: 1})
		})
	}
	
	render() {
		return (
			  <Layout>
				<>
				<div className="laoder" style={{ display: this.state.showInfo == 0 ? "block" : "none" }} >
					<div id="preloader" aria-busy="true" aria-label="Loading, please wait." role="progressbar">
						<img alt="" className="icon" src="https://shop.australiansportscamps.com.au/demo.svg" />
					</div>
				</div>
				<section className="Banner-Section">
					<Container>
						<div className="Banner-Section-data">
						<Breadcrumb>
							<Breadcrumb.Item className="">
								<Link className="nav-link p-0" to="/">Home</Link>
								</Breadcrumb.Item>
							<Breadcrumb.Item active href=""className="">Sport</Breadcrumb.Item>
						</Breadcrumb>
						<h2 className="heading-banner">School Holiday Program</h2>
						</div>
					</Container>
				</section>
				<Campbanner/>
				<section className="Sport-section-3">
					<Container>
						<Row>
							{(this.state.result === 1) ? (
									<>
									{this.state.PageData.map((cmp) => 
										 <Col xl={4} lg={4} md={7} sm={9} xs={10} className="main-styled-card">
										{cmp.map((camp) => 
											 <Card  className="listed-card mb-0">
												<div className="card-img">
													<div className="inner-card ">
														<Image src={cardhover} fluid alt="cardhover"/>
													</div>
													<Image variant="top" src={camp.image} fluid alt="card"/>
												</div>
												<Card.Body>
													<Link to={"/city/"+camp.slug}>{camp.title}</Link>
												</Card.Body>
											</Card>
										)}
										</Col>		
									)} 
									</>
								) : ("")}
						
							
						</Row>	
					</Container>	
				</section>
				
				 
				  <BottomForm/>
				  <Footer/>
				</>
			  </Layout>
		)
	}
}
export default City