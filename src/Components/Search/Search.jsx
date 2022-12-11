import React from 'react';
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect } from 'react';
import { useState } from 'react';
import ListingItem from '../Listingitem/Listingitem.jsx';
import '../Style/style.css';
import { useParams, useNavigate,Link } from "react-router-dom";
import {
	collection,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
  } from "firebase/firestore";
  import { db } from "../../firebase";
  const listingsRef = collection(db, "listings");



const Search = () => {
	const navigate = useNavigate()
    const {type,id} = useParams();

	const [zipcode,setzipcode]= useState("")
	const [searchTerm, setSearchTerm] = useState(null)
	
    const rentListingQuery = query(
        listingsRef,
		where("type", "==", type),
        where("zipcode", "==", id),
        orderBy("timestamp", "desc"),
        
      );

	const [saleListings, setSaleListings] = useState(null);

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

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Search Property Listing using ZipCode 
		</Tooltip>
	  );

	useEffect(() => {
		async function fetchListings() {
			try {
                
				// execute the query
				const querySnapSale = await getDocs(rentListingQuery);
				

				//Calling the clean function for all the data
				const saleListing = cleanData(querySnapSale);
			

				
				setSaleListings(saleListing);
			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, [type,id]);

	

	const onSubmit = (e) =>{
		e.preventDefault();
		if(!zipcode)alert("Enter ZipCode to be searched")
		else if(!searchTerm )alert("Specify Sale or Rent in the second feild")
		else navigate(`/search/${searchTerm}/${zipcode}`)
	}





	return (
		<>
        <br/>
        <h1>{type.toLocaleUpperCase()} Property Listing for "{id}"</h1>
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
			<OverlayTrigger
   placement="right"
   delay={{ show: 250, hide: 400 }}
   overlay={renderTooltip}
    >
            <Button variant='success' role="button" onClick={onSubmit}>Search</Button>
			</OverlayTrigger>
            </div>
            </div>
        </div>


    <br/>
    <br/>

			{saleListings && saleListings.length > 0 && (
					<ListingItem data={saleListings} from="HOMEPAGE" />
			)}

			
		</>
	);
};

export default Search;