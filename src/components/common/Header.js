import React, { Component  } from 'react';
import {  Image,ListGroup,Navbar,Container } from 'react-bootstrap'
import { Link,StaticQuery, graphql } from 'gatsby'
import logo from '../../images/logo.png'
import navimage from '../../images/nav-image.png'
import icon1 from '../../images/icon1.png'
import cart from '../../images/cart.png'
import CityMenu from './CityMenu'
import SocialMenu from './SocialMenu'
import Menubanner from './Menubanner'
import SportMenu from './SportMenu'
import PartnerMenu from './PartnerMenu'
import "../../components/style.css"
import axios from 'axios';
import Cookies from 'universal-cookie';
 

class Header extends Component {
    
    state = {
        isTop: true,
		cart: ''
      };
    
      componentDidMount() {
        document.addEventListener('scroll', () => {
          const isTop = window.scrollY < 200;
          if (isTop !== this.state.isTop) {
              this.setState({ isTop })
          }
        });
		
		
      } 
	
	
	  
    render() {
		const cookies = new Cookies();
        return (
            <>
            
    <header>
        <div className="social-header">
            <div className="container d-flex d-small-block justify-content-between">
                <div className="first-li align-items-center d-flex">
                    <ListGroup horizontal as="ul">
                        <SocialMenu />
                        <ListGroup.Item as="li" className="d-md-none d-flex">
                            <a href="tel:1300914368" className="nav-link p-0" to="/">
                                <i className="fa fa-phone"></i>
                            </a>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="second-li align-items-center d-sm-flex d-none">
                    <ListGroup horizontal as="ul" className="d-md-flex d-none">
                        <ListGroup.Item as="li">
                        <a className="nav-link p-0" href="tel:1300914368"><i className="fa fa-phone"/></a><a className="nav-link p-0" href="tel:1300914368"> CALL US: 1300 914 368</a>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            |
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                        <Link to="https://shop.australiansportscamps.com.au/my-account/">LOGIN</Link>
                        <span>OR</span>
                        <Link to="https://shop.australiansportscamps.com.au/register/">REGISTER</Link>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup horizontal as="ul" className="d-md-none d-flex">
                        <ListGroup.Item as="li">
                        <Link to="https://shop.australiansportscamps.com.au/my-account/">LOGIN</Link>
                        <span>OR</span>
                        <Link to="https://shop.australiansportscamps.com.au/register/">REGISTER</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </div>
        <div className={this.state.isTop ? 'main-header' : 'main-header sticky'}>
            <Container>
            <Navbar expand="xl" className="bg-none">
                <Navbar.Brand>
                    <Link aria-current="page" className="navbar-brand" to="/">
                        <Image src={logo} className="img-fluid" alt="" width="120px"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarSupportedContent" className="justify-content-end">
                <div className="justify-content-end" id="">
                        <ul className="navbar-nav ">
                            
							<StaticQuery
					query={graphql`
						query MyQuery {
							wordpressMenusMenusItems(slug: {eq: "gatsby-header-menu"}) {
								id
								items {
									title
									child_items {
										title
										url
									}
									url
								}
							}
						}
					`}
			render={data => (
				<>
				{
					data &&
					data.wordpressMenusMenusItems &&
					data.wordpressMenusMenusItems.items &&
					data.wordpressMenusMenusItems.items.map(
						(prop,i) => {	
							return (
								<>
								{(prop.child_items ? (
									<div>
										<li className="nav-item dropdown uppercase"><Link className="nav-link dropdown-toggle" data-toggle="dropdown"
												to={prop.title} aria-expanded="false">{prop.title}</Link>
											<ul className="dropdown-menu common-menu">
												{prop && prop.child_items && prop.child_items.map((child, i) => {
													return (
														<>
														{(child.title == 'Home' ? (<li  key={i} ><Link className="dropdown-item"   to={"/"}>{child.title}</Link></li>) : (<li  key={i} ><Link className="dropdown-item"   to={"/"+child.url.toLowerCase().replace("http://", '')}>{child.title}</Link></li>) )}
														</>
													)
												})}
											</ul>
										</li>
									</div>
								
								) : 
								(
									<>
										{(prop.title == 'Camps' ? (
											<div>
												<li className="nav-item dropdown position-static"><a className="nav-link dropdown-toggle main-menu-toggle"
														href="" onClick={e => e.preventDefault()} id="navbarDropdown" role="button"
														data-toggle="dropdown">Camps</a>
													<ul className="dropdown-menu main-menu">
														<div className="w-100 d-flex main-box d-xl-block">
															<div className="first-box">
																
																	
																	
																		<SportMenu />
																	
																
																
																<div className="inner-menu">
																	<div className="mb-3 menu-heading">
																		<a className="" href="javascript:;">Cities</a>
																	</div>
																	<ListGroup as="ul">
																		<CityMenu />
																		
																	</ListGroup>
																</div>
																
																	<PartnerMenu />
																
															
															</div>
															<Menubanner />
														</div>
													</ul>
												</li>
											</div>
										) : 
										(
											<>{(prop.title == 'Shop' ? (
												<div>
													<li className="nav-item">
														<Link className="nav-link" to={"/product"}>{prop.title}</Link>
													</li>
												</div>
											
											) : (
												<>
													{(prop.title == 'Home' ? 
													(
														<div>
															<li className="nav-item">
															<Link className="nav-link" to={"/"}>{prop.title}</Link>
															</li>
														</div>
													) : (
														<div>
															<li className="nav-item">
																<Link className="nav-link" to={"/"+prop.title.toLowerCase().replace(/\s+/g, '-')}>{prop.title}</Link>
															</li>
														</div>
													))}
												</>
											
												
											
											))}
											</>
											
											
											
										))}
									
									</>
									
								))}
								</>
							)
						})
				}
				</>
			)}
		  />
                            
							
							
                            
                            <div>
                                <li className="nav-item">
                                    <Link className="nav-link uppercase btn-sm btn-orange" to="/book-a-camp">book a camp</Link>
                                </li>
                            </div>

                            <div>
                                <li className="nav-item pr-0">
                                    <Link className="nav-link uppercase " to="https://shop.australiansportscamps.com.au/cart/"><Image src={cart} className="img-fluid" alt="" width=""/>
									<span className="badge badge-blue">{cookies.get('CART')}</span>
									</Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </Container>
        </div>
        </header>
            </>
        );
    }
}

export default Header;