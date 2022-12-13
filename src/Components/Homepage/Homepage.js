import React from 'react';
import BackgroundCSL from './Carousel';
import { getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ListingItem from '../Listingitem/Listingitem.jsx';
//import Slider from "../components/Slider";
import { db } from '../../firebase';
import queries from '../../query';
import '../Style/style.css';
import arrow from "../../Assets/right-arrow.png"



const Homepage = () => {
	const [offerListings, setOfferListings] = useState(null);
	const [rentListings, setRentListings] = useState(null);
	const [saleListings, setSaleListings] = useState(null);
	const navigate = useNavigate()
	const cleanData = (array) => {
		const listings = [];
		array.forEach((doc) => {
			return listings.push({
				id: doc.id,
				data: doc.data(),
			});
		});
		return listings;
	};

	useEffect(() => {
		async function fetchListings() {
			try {
				// execute the query
				const querySnapSale = await getDocs(queries.saleListingHome);
				const querySnapRent = await getDocs(queries.rentListingHome);
				const querySnapOffer = await getDocs(queries.offerListingHome);

				//Calling the clean function for all the data
				const saleListing = cleanData(querySnapSale);
				const rentListing = cleanData(querySnapRent);
				const offerListing = cleanData(querySnapOffer);

				setOfferListings(offerListing);
				setRentListings(rentListing);
				setSaleListings(saleListing);
			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, []);

	return (
		<>
			<BackgroundCSL />
			{/*Slider  */}

			{offerListings && offerListings.length > 0 && (
				<div className="bgcolor">
					<div className="heading">
						
						<h2> Recent offers </h2>
						<Link to="/offers" style={{ textDecoration: 'none' }}>
							<p className="ptag" onClick={()=>{navigate('/offers')}}>Show more offers<img alt ="arrow" width="25" height="25" src={arrow}/> </p>
						</Link>
					</div>
					<ListingItem data={offerListings} from="HOMEPAGE" />
				</div>
			)}

			{rentListings && rentListings.length > 0 && (
				<div className="bgcolor">
					<div className="heading">
						<h2>Places for rent</h2>
						<Link to="/category/rent" style={{ textDecoration: 'none' }}>
							<p className="ptag">Show more places for rent<img alt ="arrow" width="25" height="25" src={arrow}/></p>
						</Link>
					</div>
					<ListingItem data={rentListings} from="HOMEPAGE" />
				</div>
			)}
			{saleListings && saleListings.length > 0 && (
				<div className="bgcolor">
					<div className="heading">
						<h2>Places for sale</h2>
						<Link to="/category/sale" style={{ textDecoration: 'none' }}>
							<p className="ptag">Show more places for sale<img  alt ="arrow" width="25" height="25" src={arrow}/></p>
						</Link>
					</div>
					<ListingItem data={saleListings} from="HOMEPAGE" />
				</div>
			)}
		</>
	);
};

export default Homepage;
