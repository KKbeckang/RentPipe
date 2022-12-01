import React from 'react';
import Button from 'react-bootstrap/Button'
import { getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../Listingitem/Listingitem.jsx';
import { db } from '../../firebase';
import queries from '../../query';
import '../Style/style.css';

const Rent = () => {

	const [rentListings, setRentListings] = useState(null);
	

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
			
				const querySnapRent = await getDocs(queries.rentListingQuery);
				

				//Calling the clean function for all the data
			
				const rentListing = cleanData(querySnapRent);
			

				
				setRentListings(rentListing);
				
			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, []);
	return (
		<>
        <br/>
        <h1>Rental Property Listing</h1>
        <br/>
            <div class="form-groupOffers">    
        <div class="container">
            <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control input-lg" placeholder="Where do you wanna go?"/>  
            </div>
            <div class="col-md-2">
                <input type="date" class="form-control input-lg" name="start" placeholder="Check In"/>   
            </div>
            <div class="col-md-2">
                <input type="date" class="form-control input-lg" name="end" placeholder="Check Out"/>            
            </div>
            <div class="col-md-2">
            <Button variant='success' href="#" role="button">Search</Button>
            </div>
            </div>
        </div>
    </div>
    <br/>
    <br/>

			{rentListings && rentListings.length > 0 && (
					<ListingItem data={rentListings} from="HOMEPAGE" />
			)}

			
		</>
	);
};

export default Rent;