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
import {useNavigate} from "react-router-dom";

const Rent = () => {
	const navigate = useNavigate()
	const [zipcode,setzipcode]= useState(null)
	const [searchTerm, setSearchTerm] = useState(null)
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

	const onSubmit = (e) =>{
		e.preventDefault();
		console.log(searchTerm,zipcode)
		navigate(`/search/${searchTerm}/${zipcode}`)
	}




	return (
		<>
        <br/>
        <h1>Rental Property Listing</h1>
        <br/>
		<div class="container">
            <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control input-lg" onChange={(e)=>{setzipcode(e.target.value)}} placeholder="Enter ZipCode..."/>  
            </div>
            <div class="col-md-4">
			<select class="form-control " name="languages" id="lang" onChange={(e)=>{setSearchTerm(e.target.value)}}>
        <option value={null}>Select Sale or rent </option>
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
      </select>
                
            </div>
            <div class="col-md-2">
            <Button variant='success' role="button" onClick={onSubmit}>Search</Button>
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