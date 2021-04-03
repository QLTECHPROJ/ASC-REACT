import React from "react"
import axios from "axios"
import {Container,Image, Row,Col,Card} from 'react-bootstrap'
import { Link, StaticQuery, graphql } from 'gatsby'
import queryString from 'query-string'
class Campbooking extends React.Component{
	constructor(props) {
		super(props);
	}
	state = {
        pagedata: [],
		showInfo: 0,
		query_code:"",
		code:"",
		shown: "d-none"
    };
	componentDidMount() {
		var cat = this.props.category;
		var url = "https://shop.australiansportscamps.com.au/wp-json/newasc/v1/cat-products/"+cat;
		axios.get(url).then(e => {
			this.setState({pagedata: e.data.ResponseData})
			this.setState({showInfo: 1})
		})
		
		const value = queryString.parse(this.props.location.search);
		const ccode = query.get('coupon-code');
		if(ccode != null){
			if(ccode != ""){
				this.setState({query_code:"?coupon-code="+ccode})
				this.setState({code:ccode})
				this.setState({shown: "d-block"});
			}
			else{
				this.setState({query_code:""})
				this.setState({code:""})
				this.setState({shown: "d-none"});
			}
		}
		else{
				this.setState({code:""})
				this.setState({query_code:""})
				this.setState({shown: "d-none"});
		}
		
		
    }

	render (){
		return(
			<>
			<div className="laoder2" style={{ display: this.state.showInfo == 0 ? "block" : "none" }} >
				<div id="preloader" aria-busy="true" aria-label="Loading, please wait." role="progressbar">
					<img alt="" className="icon" src="https://shop.australiansportscamps.com.au/demo.svg" />
				</div>
			</div>
			
			{(this.state.pagedata != "") ? (
				<>
					{this.state.pagedata.map((prop,i) => {return (
						<Col xl={4} lg={4} md={6} sm={9} xs={12} className="main-book-card">
							<Card className="book-card">
								<div className="card-img">
									<div dangerouslySetInnerHTML={{ __html: prop.Html}} />
								</div>
								<Card.Body>
									<Card.Title as="h5">
										{prop.Name}
									</Card.Title>
									<Card.Text>
										{prop.Camp_Date}
									</Card.Text>
									<Card.Text>
										{prop.Camp_Venue}
									</Card.Text>
									<ul>
										<li className="main-price">${prop.price}</li>
									</ul>
									<Link className="nav-link uppercase btn-sm btn-orange text-center" to={"https://shop.australiansportscamps.com.au/book/"+prop.Slug+'/'+query_code}>More info / Book Now</Link>
								</Card.Body>
							</Card>
						</Col>
					)})}
				</>
			) : ("")}	
			</>
		)
	}	

}

export default Campbooking