import {
	collection,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
  } from "firebase/firestore";
  import { db } from "./firebase";
  const listingsRef = collection(db, "listings");

  const saleListingQuery = query(
    listingsRef,
    where("type", "==", "sale"),
    orderBy("timestamp", "desc"),
   
  );

  const rentListingQuery = query(
    listingsRef,
    where("type", "==", "rent"),
    orderBy("timestamp", "desc"),
    
  );

  const offerListingQuery = query(
    listingsRef,
    where("offer", "==", true),
    orderBy("timestamp", "desc"),
    
  );

  const saleListingHome = query(
    listingsRef,
    where("type", "==", "sale"),
    orderBy("timestamp", "desc"),
    limit(4)
  );

  const rentListingHome = query(
    listingsRef,
    where("type", "==", "rent"),
    orderBy("timestamp", "desc"),
    limit(4)
  );

  const offerListingHome = query(
    listingsRef,
    where("offer", "==", true),
    orderBy("timestamp", "desc"),
    limit(4)
  );


  const queries = {
    saleListingQuery,
    rentListingQuery,
    offerListingQuery,
    saleListingHome,
    rentListingHome,
    offerListingHome
    
}

export default queries